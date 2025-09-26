# 🚀 部署指南

## 📋 代码逻辑检查 ✅

### 核心功能验证
- ✅ **根域名无效**：`/` 路径显示"访问被拒绝"
- ✅ **路径验证**：只有API添加的路径才有效
- ✅ **自动过期**：3小时后路径自动失效
- ✅ **API管理**：支持添加和查询有效路径
- ✅ **安全控制**：同一时间只有一个路径有效

### 文件结构
```
项目根目录/
├── index.html          # 主页面（购买链接+iframe）
├── vercel.json         # Vercel配置（路由规则）
├── api/
│   ├── validate.js     # URL验证逻辑
│   └── manage.js       # 路径管理API
└── README.md           # 项目说明
```

## 🎯 部署流程

### 第1步：创建GitHub仓库
1. 登录 https://github.com
2. 点击 "New repository"
3. 仓库名：`xhj`
4. 设为公开（Public）
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 第2步：上传文件
1. 点击 "uploading an existing file"
2. 拖拽以下文件到页面：
   - `index.html`
   - `vercel.json`
   - `api/` 文件夹（包含 validate.js 和 manage.js）
3. 填写提交信息："Initial commit"
4. 点击 "Commit changes"

### 第3步：连接Vercel
1. 访问 https://vercel.com
2. 点击 "Sign up with GitHub"
3. 授权GitHub账号
4. 点击 "New Project"
5. 选择仓库：`xhj`
6. 点击 "Deploy"

### 第4步：验证部署
部署完成后测试：
- ❌ `https://xhj.vercel.app` → 显示"访问被拒绝"
- ❌ `https://xhj.vercel.app/invalid` → 显示"URL已失效"
- ✅ 需要API添加有效路径才能访问

## 🔧 使用说明

### 添加有效路径
```bash
curl -X POST https://xhj.vercel.app/api/manage \
  -H "Content-Type: application/json" \
  -d '{"path": "AbC123XyZ789", "duration": 10800000}'
```

### 查询当前有效路径
```bash
curl https://xhj.vercel.app/api/manage
```

## 🎉 部署完成

部署成功后您将获得：
- **基础域名**：`https://xhj.vercel.app`
- **根域名**：❌ 无效（安全控制）
- **随机路径**：✅ 通过API管理
- **自动过期**：3小时后自动失效

## 📱 访问效果

### 根域名访问
```
https://xhj.vercel.app
→ 显示：🚫 根域名访问被拒绝
```

### 无效路径访问
```
https://xhj.vercel.app/invalid
→ 显示：❌ URL已失效
```

### 有效路径访问
```
https://xhj.vercel.app/AbC123XyZ789
→ 显示：✅ 正常页面（购买链接+iframe）
```

## 🛡️ 安全特性

- ✅ 根域名完全禁用
- ✅ 路径有效期控制
- ✅ 自动过期清理
- ✅ 同一时间只有一个路径有效
- ✅ API路径管理
- ✅ 移动端优化