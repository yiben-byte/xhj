// Vercel API 路由 - 管理有效路径
import { addValidPath, getCurrentValidPath } from './validate.js';

export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    // 添加新的有效路径
    const { path, duration } = req.body;
    
    if (!path) {
      return res.status(400).json({ error: '路径不能为空' });
    }
    
    addValidPath(path, duration);
    
    return res.status(200).json({
      success: true,
      message: '路径已添加',
      path: path,
      expireTime: new Date(Date.now() + (duration || 3 * 60 * 60 * 1000)).toISOString()
    });
  }
  
  if (req.method === 'GET') {
    // 获取当前有效路径
    const currentPath = getCurrentValidPath();
    
    return res.status(200).json({
      success: true,
      currentPath: currentPath,
      hasValidPath: !!currentPath
    });
  }
  
  return res.status(405).json({ error: '方法不被允许' });
}