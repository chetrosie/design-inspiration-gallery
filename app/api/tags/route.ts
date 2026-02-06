import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

// GET /api/tags - 获取所有标签
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeCount = searchParams.get('includeCount') === 'true';

    let tags;

    if (includeCount) {
      // 获取标签及其灵感数量
      tags = await prisma.tag.findMany({
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
      // 只获取标签基本信息
      tags = await prisma.tag.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    }

    return Response.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error('获取标签失败:', error);
    return Response.json(
      { success: false, error: '获取标签失败' },
      { status: 500 }
    );
  }
}

// POST /api/tags - 创建新标签
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录
  if (!session) {
    return Response.json(
      { success: false, error: '未授权访问' },
      { status: 401 }
    );
  }

  // 检查用户是否有权限创建标签（仅管理员）
  if (!session.user || session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限创建标签' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    
    // 创建新标签
    const tag = await prisma.tag.create({
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
    console.error('创建标签失败:', error);
    return Response.json(
      { success: false, error: '创建标签失败' },
      { status: 500 }
    );
  }
}