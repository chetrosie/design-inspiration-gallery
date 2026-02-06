import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// 初始化Notion客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 获取数据库中的所有页面
export async function getDatabaseItems(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Created time',
          direction: 'descending',
        },
      ],
    });

    return response.results as PageObjectResponse[];
  } catch (error) {
    console.error('获取Notion数据库失败:', error);
    throw error;
  }
}

// 将Notion页面转换为灵感对象
export function convertNotionPageToInspiration(page: PageObjectResponse) {
  const properties = page.properties;
  
  // 提取标题
  const titleProperty = properties.Title || properties.Name;
  const title = titleProperty?.type === 'title' 
    ? titleProperty.title.map(t => t.plain_text).join('')
    : '';

  // 提取描述
  const descriptionProperty = properties.Description;
  const description = descriptionProperty?.type === 'rich_text'
    ? descriptionProperty.rich_text.map(t => t.plain_text).join('')
    : '';

  // 提取图片URL
  const imageProperty = properties.Image || properties.Cover;
  const imageUrl = imageProperty?.type === 'files'
    ? imageProperty.files[0]?.file?.url || imageProperty.files[0]?.external?.url
    : '';

  // 提取链接
  const linkProperty = properties.Link || properties.URL;
  const link = linkProperty?.type === 'url' ? linkProperty.url : '';

  // 提取作者
  const authorProperty = properties.Author;
  const author = authorProperty?.type === 'rich_text'
    ? authorProperty.rich_text.map(t => t.plain_text).join('')
    : '';

  // 提取Prompt
  const promptProperty = properties.Prompt;
  const prompt = promptProperty?.type === 'rich_text'
    ? promptProperty.rich_text.map(t => t.plain_text).join('')
    : '';

  // 提取分类
  const categoryProperty = properties.Category;
  const category = categoryProperty?.type === 'select' 
    ? categoryProperty.select?.name 
    : '';

  // 提取标签
  const tagsProperty = properties.Tags;
  const tags = tagsProperty?.type === 'multi_select'
    ? tagsProperty.multi_select.map(tag => tag.name)
    : [];

  return {
    id: page.id,
    title,
    description,
    imageUrl: imageUrl || '/placeholder-image.jpg',
    link,
    author,
    prompt,
    category,
    tags,
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
  };
}

// 同步Notion数据库到本地数据库
export async function syncNotionDatabaseToLocal(databaseId: string) {
  try {
    const pages = await getDatabaseItems(databaseId);
    
    // 这里应该实现将Notion数据同步到本地数据库的逻辑
    // 由于这是一个示例，我们只返回转换后的数据
    
    const inspirations = pages.map(page => convertNotionPageToInspiration(page as PageObjectResponse));
    
    return inspirations;
  } catch (error) {
    console.error('同步Notion数据库失败:', error);
    throw error;
  }
}