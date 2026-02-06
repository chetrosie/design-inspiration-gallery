import { syncNotionDatabaseToLocal } from '@/lib/notion';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/notion/sync - 同步Notion数据库到本地
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // 检查用户是否已登录
  if (!session) {
    return Response.json(
      { success: false, error: '未授权访问' },
      { status: 401 }
    );
  }

  // 检查用户是否有权限同步（仅管理员）
  if (session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限同步Notion数据库' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const databaseId = body.databaseId || process.env.NOTION_DATABASE_ID;
    
    if (!databaseId) {
      return Response.json(
        { success: false, error: '未提供Notion数据库ID' },
        { status: 400 }
      );
    }

    // 同步Notion数据库到本地
    const inspirations = await syncNotionDatabaseToLocal(databaseId);
    
    return Response.json({
      success: true,
      data: inspirations,
      message: `成功同步 ${inspirations.length} 个灵感`,
    });
  } catch (error: any) {
    console.error('同步Notion数据库失败:', error);
    return Response.json(
      { success: false, error: error.message || '同步Notion数据库失败' },
      { status: 500 }
    );
  }
}