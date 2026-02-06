import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/categories/[id] - 获取单个分类详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: params.id,
      },
      include: {
        inspirations: {
          where: {
            isPublic: true,
          },
          include: {
            tags: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // 如果找不到分类，返回404
    if (!category) {
      return Response.json(
        { success: false, error: '分类不存在' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('获取分类详情失败:', error);
    return Response.json(
      { success: false, error: '获取分类详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - 更新分类
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录
  if (!session) {
    return Response.json(
      { success: false, error: '未授权访问' },
      { status: 401 }
    );
  }

  // 检查用户是否有权限更新分类（仅管理员）
  if (session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限更新分类' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    
    // 更新分类
    const category = await prisma.category.update({
      where: {
        id: params.id,
      },
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
    console.error('更新分类失败:', error);
    return Response.json(
      { success: false, error: '更新分类失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - 删除分类
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录
  if (!session) {
    return Response.json(
      { success: false, error: '未授权访问' },
      { status: 401 }
    );
  }

  // 检查用户是否有权限删除分类（仅管理员）
  if (session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限删除分类' },
      { status: 403 }
    );
  }

  try {
    // 删除分类
    await prisma.category.delete({
      where: {
        id: params.id,
      },
    });

    return Response.json({
      success: true,
      message: '分类删除成功',
    });
  } catch (error) {
    console.error('删除分类失败:', error);
    return Response.json(
      { success: false, error: '删除分类失败' },
      { status: 500 }
    );
  }
}