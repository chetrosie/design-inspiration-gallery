import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/categories - 获取所有分类
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    let categories;

    if (includeCount) {
      // 获取分类及其灵感数量
      categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { inspirations: true },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
    } else {
      // 只获取分类基本信息
      categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    }

    return Response.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('获取分类失败:', error);
    return Response.json(
      { success: false, error: '获取分类失败' },
      { status: 500 }
    );
  }
}

// POST /api/categories - 创建新分类
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录
  if (!session) {
    return Response.json(
      { success: false, error: '未授权访问' },
      { status: 401 }
    );
  }

  // 检查用户是否有权限创建分类（仅管理员）
  if (session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限创建分类' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    
    // 创建新分类
    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description,
      },
    });

    return Response.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('创建分类失败:', error);
    return Response.json(
      { success: false, error: '创建分类失败' },
      { status: 500 }
    );
  }
}