# Shadowrocket 动态URL系统

## 项目说明
这是一个动态URL管理系统，实现：
- ❌ 根域名访问被拒绝
- ✅ 同一时间只有一个随机路径有效
- ✅ 每3小时自动生成新URL
- ✅ 旧URL自动失效

## 文件结构
```
├── index.html          # 主页面
├── vercel.json         # Vercel配置
├── api/
│   ├── validate.js     # URL验证API
│   └── manage.js       # 路径管理API
└── README.md           # 项目说明
```

## 部署到Vercel

### 第一步：准备GitHub仓库
1. 登录 https://github.com
2. 创建新仓库：`xhj`
3. 设为公开（Public）
4. 上传所有文件到仓库

### 第二步：连接Vercel
1. 访问 https://vercel.com
2. 点击 "Sign up with GitHub"
3. 授权GitHub账号
4. 点击 "New Project"
5. 选择仓库：`xhj`
6. 点击 "Deploy"

### 第三步：获取网址
部署完成后获得：
- **基础域名**：`https://xhj.vercel.app`
- **根域名**：❌ 无效（显示访问被拒绝）
- **随机路径**：✅ 有效（如：`/AbC123XyZ789`）

## 工作原理

### URL验证流程
1. **根域名访问** → 显示"访问被拒绝"
2. **无效路径** → 显示"URL已失效"
3. **有效路径** → 显示正常页面

### API接口
- `POST /api/manage` - 添加新的有效路径
- `GET /api/manage` - 获取当前有效路径
- 自动过期清理机制

### 安全特性
- 根域名完全禁用
- 路径有效期3小时
- 自动清理过期路径
- 同一时间只有一个路径有效

## 技术特点
- 动态URL生成
- 自动过期机制
- API路径管理
- 安全访问控制
- 移动端优化