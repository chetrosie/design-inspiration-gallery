import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { syncNotionData } from '@/lib/notion-sync';

// POST /api/sync/notion - 手动触发Notion同步
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
  if (!session.user || session.user.role !== 'ADMIN') {
    return Response.json(
      { success: false, error: '无权限执行同步操作' },
      { status: 403 }
    );
  }

  try {
    // 执行同步
    const result = await syncNotionData();
    
    return Response.json({
      success: result.success,
      message: result.success 
        ? `同步成功，共处理 ${result.count} 条记录` 
        : `同步失败: ${result.error}`,
      data: result,
    });
  } catch (error) {
    console.error('同步失败:', error);
    return Response.json(
      { success: false, error: '同步过程中发生错误' },
      { status: 500 }
    );
  }
}