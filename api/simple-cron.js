// 简单的定时任务API
export default async function handler(req, res) {
  // 生成随机路径
  const randomPath = Math.random().toString(36).substring(2, 22);
  
  try {
    // 调用manage API添加新路径
    const response = await fetch(`https://${req.headers.host}/api/manage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: randomPath,
        duration: 3 * 60 * 60 * 1000
      })
    });
    
    if (response.ok) {
      console.log(`✅ 自动生成新路径: ${randomPath}`);
      return res.status(200).json({
        success: true,
        newPath: randomPath,
        newUrl: `https://xhj-share.vercel.app/${randomPath}`
      });
    } else {
      throw new Error('API调用失败');
    }
  } catch (error) {
    console.error('❌ 自动生成失败:', error);
    return res.status(500).json({ error: '生成失败' });
  }
}
