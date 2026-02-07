import { Client } from '@notionhq/client';
import { prisma } from '@/lib/db';

// 初始化Notion客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 同步Notion数据库到本地数据库
export async function syncNotionDatabaseToLocal(databaseId: string) {
  try {
    // 查询Notion数据库
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // 处理每个页面
    for (const page of response.results) {
      if (!('properties' in page)) continue;

      // 提取属性
      const properties = page.properties as Record<string, any>;

      // 提取标题
      const titleProperty = properties.Title || properties.Name;
      const title =
        titleProperty?.type === 'title'
          ? titleProperty.title.map((t: any) => t.plain_text).join('')
          : 'Untitled';

      // 提取描述
      const descriptionProperty = properties.Description;
      const description =
        descriptionProperty?.type === 'rich_text'
          ? descriptionProperty.rich_text.map((t: any) => t.plain_text).join('')
          : '';

      // 提取图片URL
      const imageProperty = properties.Image || properties.Cover;
      let imageUrl = '/placeholder-image.jpg';
      if (imageProperty?.type === 'files' && Array.isArray(imageProperty.files) && imageProperty.files.length > 0) {
        const firstFile = imageProperty.files[0] as any;
        imageUrl = firstFile?.file?.url || firstFile?.external?.url || '/placeholder-image.jpg';
      }

      // 提取链接
      const linkProperty = properties.Link || properties.URL;
      const link = linkProperty?.type === 'url' ? linkProperty.url : '';

      // 提取作者
      const authorProperty = properties.Author;
      const author =
        authorProperty?.type === 'rich_text'
          ? authorProperty.rich_text.map((t: any) => t.plain_text).join('')
          : '';

      // 提取Prompt
      const promptProperty = properties.Prompt;
      const prompt =
        promptProperty?.type === 'rich_text'
          ? promptProperty.rich_text.map((t: any) => t.plain_text).join('')
          : '';

      // 提取分类
      const categoryProperty = properties.Category;
      let categoryId: string | null = null;

      if (categoryProperty?.type === 'select' && categoryProperty.select) {
        // 查找或创建分类
        const categoryName = categoryProperty.select.name;
        let category = await prisma.category.findUnique({
          where: { name: categoryName },
        });

        if (!category) {
          category = await prisma.category.create({
            data: {
              name: categoryName,
              slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            },
          });
        }

        categoryId = category.id;
      }

      // 检查是否已存在相同的灵感（通过Notion ID）
      const existingInspiration = await prisma.inspiration.findUnique({
        where: { notionId: page.id },
      });

      if (existingInspiration) {
        // 更新现有灵感
        await prisma.inspiration.update({
          where: { id: existingInspiration.id },
          data: {
            title,
            description,
            imageUrl,
            link,
            author,
            prompt,
            categoryId,
          },
        });
      } else {
        // 创建新灵感
        await prisma.inspiration.create({
          data: {
            title,
            description,
            imageUrl,
            link,
            author,
            prompt,
            categoryId,
            notionId: page.id,
            isPublic: true,
          },
        });
      }
    }

    return { success: true, count: response.results.length };
  } catch (error: unknown) {
    console.error('同步Notion数据库失败:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

// 手动触发同步的API端点
export async function syncNotionData() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    return { success: false, error: 'NOTION_DATABASE_ID未配置' };
  }

  if (!process.env.NOTION_TOKEN) {
    return { success: false, error: 'NOTION_TOKEN未配置' };
  }

  return await syncNotionDatabaseToLocal(databaseId);
}
