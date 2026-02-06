import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/inspirations/[id] - 获取单个灵感详情
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 获取灵感详情
    const inspiration = await prisma.inspiration.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
        tags: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // 如果找不到灵感，返回404
    if (!inspiration) {
      return Response.json(
        { success: false, error: '灵感不存在' },
        { status: 404 }
      );
    }

    // 增加浏览量（仅对公开灵感）
    if (inspiration.isPublic) {
      await prisma.inspiration.update({
        where: {
          id: params.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }

    return Response.json({
      success: true,
      data: inspiration,
    });
  } catch (error) {
    console.error('获取灵感详情失败:', error);
    return Response.json(
      { success: false, error: '获取灵感详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/inspirations/[id] - 更新灵感
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

  try {
    const body = await request.json();
    
    // 检查灵感是否存在且属于当前用户
    const existingInspiration = await prisma.inspiration.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingInspiration) {
      return Response.json(
        { success: false, error: '灵感不存在' },
        { status: 404 }
      );
    }

    if (existingInspiration.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return Response.json(
        { success: false, error: '无权限修改此灵感' },
        { status: 403 }
      );
    }

    // 更新灵感
    const inspiration = await prisma.inspiration.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        link: body.link,
        author: body.author,
        prompt: body.prompt,
        categoryId: body.categoryId,
        isPublic: body.isPublic,
        tags: {
          set: body.tagIds?.map((id: string) => ({ id })) || [],
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
    console.error('更新灵感失败:', error);
    return Response.json(
      { success: false, error: '更新灵感失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/inspirations/[id] - 删除灵感
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

  try {
    // 检查灵感是否存在且属于当前用户
    const existingInspiration = await prisma.inspiration.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingInspiration) {
      return Response.json(
        { success: false, error: '灵感不存在' },
        { status: 404 }
      );
    }

    if (existingInspiration.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return Response.json(
        { success: false, error: '无权限删除此灵感' },
        { status: 403 }
      );
    }

    // 删除灵感
    await prisma.inspiration.delete({
      where: {
        id: params.id,
      },
    });

    return Response.json({
      success: true,
      message: '灵感删除成功',
    });
  } catch (error) {
    console.error('删除灵感失败:', error);
    return Response.json(
      { success: false, error: '删除灵感失败' },
      { status: 500 }
    );
  }
}