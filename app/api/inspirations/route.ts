import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/inspirations - 获取灵感列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');

  try {
    // 构建查询条件
    const where: any = {
      isPublic: true,
    };

    if (category) {
      const categoryObj = await prisma.category.findUnique({
        where: { slug: category },
      });
      
      if (categoryObj) {
        where.categoryId = categoryObj.id;
      }
    }

    if (tag) {
      const tagObj = await prisma.tag.findUnique({
        where: { slug: tag },
      });
      
      if (tagObj) {
        where.tags = {
          some: {
            id: tagObj.id,
          },
        };
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { prompt: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 获取灵感列表
    const inspirations = await prisma.inspiration.findMany({
      where,
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // 获取总数
    const total = await prisma.inspiration.count({ where });

    return Response.json({
      success: true,
      data: inspirations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('获取灵感列表失败:', error);
    return Response.json(
      { success: false, error: '获取灵感列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/inspirations - 创建新灵感
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录
  if (!session) {
    return Response.json(
      { success: false, error: '未授权访问' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    
    // 创建新灵感
    const inspiration = await prisma.inspiration.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        link: body.link,
        author: body.author,
        prompt: body.prompt,
        categoryId: body.categoryId,
        userId: session.user.id,
        isPublic: body.isPublic ?? true,
        tags: {
          connect: body.tagIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return Response.json({
      success: true,
      data: inspiration,
    });
  } catch (error) {
    console.error('创建灵感失败:', error);
    return Response.json(
      { success: false, error: '创建灵感失败' },
      { status: 500 }
    );
  }
}