// Vercel API 路由 - 验证URL有效性
// 使用内存存储有效路径（生产环境建议使用数据库）
let validPaths = new Map(); // 存储路径和过期时间

// 清理过期路径
function cleanExpiredPaths() {
  const now = Date.now();
  for (const [path, expireTime] of validPaths.entries()) {
    if (now > expireTime) {
      validPaths.delete(path);
    }
  }
}

// 添加有效路径
function addValidPath(path, duration = 3 * 60 * 60 * 1000) { // 默认3小时
  const expireTime = Date.now() + duration;
  validPaths.set(path, expireTime);
  console.log(`✅ 添加有效路径: ${path}, 过期时间: ${new Date(expireTime).toLocaleString()}`);
}

// 检查路径是否有效
function isValidPath(path) {
  cleanExpiredPaths();
  return validPaths.has(path);
}

// 获取当前有效路径
function getCurrentValidPath() {
  cleanExpiredPaths();
  for (const [path, expireTime] of validPaths.entries()) {
    return path; // 返回第一个有效路径
  }
  return null;
}

export default function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const path = pathname.replace('/', '');
  
  // 清理过期路径
  cleanExpiredPaths();
  
  // 如果是根路径，显示无效页面
  if (path === '') {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>访问被拒绝</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: 0 auto;
          }
          h1 {
            color: #dc3545;
            margin-bottom: 20px;
          }
          p {
            color: #666;
            margin-bottom: 20px;
          }
          .info {
            background: #e9ecef;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚫 根域名访问被拒绝</h1>
          <p>根域名不可直接访问，请使用有效的随机路径。</p>
          <div class="info">
            <strong>说明：</strong><br>
            • 根域名已被禁用<br>
            • 只有随机生成的路径才有效<br>
            • 每个路径有效期为3小时<br>
            • 过期后自动失效
          </div>
        </div>
      </body>
      </html>
    `);
  }
  
  // 检查路径是否有效
  if (isValidPath(path)) {
    // 有效路径，显示页面
    console.log(`✅ 有效路径访问: ${path}`);
    return res.redirect(302, '/index.html');
  } else {
    // 无效路径，显示过期页面
    console.log(`❌ 无效路径访问: ${path}`);
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>URL已失效</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: 0 auto;
          }
          h1 {
            color: #dc3545;
            margin-bottom: 20px;
          }
          p {
            color: #666;
            margin-bottom: 20px;
          }
          .info {
            background: #e9ecef;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
          }
          .current-path {
            background: #d4edda;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ URL已失效</h1>
          <p>当前URL已过期，请获取新的访问地址。</p>
          <div class="info">
            <strong>访问的路径：</strong><br>
            <span class="current-path">/${path}</span>
          </div>
          <div class="info">
            <strong>说明：</strong><br>
            • 每个随机路径有效期为3小时<br>
            • 过期后自动失效<br>
            • 需要获取新的有效路径
          </div>
        </div>
      </body>
      </html>
    `);
  }
}

// 导出函数供外部调用
export { addValidPath, isValidPath, getCurrentValidPath };
