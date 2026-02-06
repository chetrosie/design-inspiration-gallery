import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/tags/[id] - 获取单个标签详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: params.id,
      },
      include: {
        inspirations: {
          where: {
            isPublic: true,
          },
          include: {
            category: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // 如果找不到标签，返回404
    if (!tag) {
      return Response.json(
        { success: false, error: '标签不存在' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: tag,
    });
  } catch (error) {
    console.error('获取标签详情失败:', error);
    return Response.json(
      { success: false, error: '获取标签详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/tags/[id] - 更新标签
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

  // 检查用户是否有权限更新标签（仅管理员）
  if (!session.user || session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限更新标签' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    
    // 更新标签
    const tag = await prisma.tag.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
    });

    return Response.json({
      success: true,
      data: tag,
    });
  } catch (error) {
    console.error('更新标签失败:', error);
    return Response.json(
      { success: false, error: '更新标签失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/tags/[id] - 删除标签
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

  // 检查用户是否有权限删除标签（仅管理员）
  if (!session.user || session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限删除标签' },
      { status: 403 }
    );
  }

  try {
    // 删除标签
    await prisma.tag.delete({
      where: {
        id: params.id,
      },
    });

    return Response.json({
      success: true,
      message: '标签删除成功',
    });
  } catch (error) {
    console.error('删除标签失败:', error);
    return Response.json(
      { success: false, error: '删除标签失败' },
      { status: 500 }
    );
  }
}