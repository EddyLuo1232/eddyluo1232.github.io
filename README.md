# Eddy Luo's Portfolio Website - React Version

这是Eddy Luo个人学术网站的React版本，完全保留了原网站的所有功能、效果和设计风格。

## ✨ 功能特性

- 🌓 **暗黑/明亮模式切换** - 支持自动检测系统偏好和手动切换
- 🌍 **双语支持** - 完整的中英文国际化
- 📱 **完全响应式** - 适配所有设备尺寸
- 🎨 **流畅动画** - 使用Framer Motion实现丰富的交互动画
- 🖼️ **头像切换** - 点击头像在真实照片和动漫头像间切换
- 📧 **邮箱复制** - 点击邮箱链接自动复制到剪贴板
- 🚀 **平滑滚动** - 导航栏智能定位和平滑滚动
- 📊 **访客统计** - 集成Clustrmaps访客地图

## 🛠️ 技术栈

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Styling**: CSS Modules + Emotion
- **State Management**: React Context
- **Icons**: Font Awesome
- **Fonts**: Inter + PingFang SC

## 📦 项目结构

```
src/
├── components/          # React组件
│   ├── Navigation/     # 导航栏组件
│   ├── Hero/          # 英雄区组件
│   ├── Quote/         # 名言区组件
│   ├── About/         # 关于页面组件
│   ├── News/          # 新闻动态组件
│   ├── Publications/  # 论文发表组件
│   ├── Stats/         # 访客统计组件
│   ├── Footer/        # 页脚组件
│   └── DarkModeToggle/ # 暗黑模式切换组件
├── contexts/           # React Context
│   ├── ThemeContext.tsx    # 主题状态管理
│   └── LanguageContext.tsx # 语言状态管理
├── data/              # 数据层
│   └── index.ts       # 所有网站内容数据
├── hooks/             # 自定义Hooks
│   └── useScrollSpy.ts # 滚动监听Hook
├── styles/            # 样式文件
│   └── global.css     # 全局样式
└── types/             # TypeScript类型定义
    └── index.ts       # 类型定义
```

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🎯 核心功能实现

### 主题切换
- 支持明亮/暗黑/自动三种模式
- 自动模式根据时间（18:00-06:00）自动切换
- 兼容系统主题偏好设置
- 状态持久化存储

### 国际化
- 完整的中英文双语支持
- Context API管理语言状态
- 所有内容数据结构化存储
- 字体优化（中文使用PingFang SC）

### 动画效果
- 页面加载动画
- 滚动触发动画
- 悬停交互效果
- 平滑的状态切换

### 响应式设计
- 移动端优先设计
- 断点：1024px、768px、480px
- 汉堡包菜单（移动端）
- 触摸友好的交互

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 🔧 自定义配置

### 修改个人信息
编辑 `src/data/index.ts` 文件中的相关数据：

```typescript
export const personalInfo = {
  name: 'Your Name',
  // ... 其他信息
};
```

### 添加新论文
在 `src/data/index.ts` 中的 `publications` 数组添加新项目：

```typescript
{
  id: 'your-paper-id',
  badge: 'Conference Name',
  // ... 其他信息
}
```

### 修改主题颜色
编辑相关的CSS文件，主要颜色变量：
- 主色调：`#2563eb`
- 暗色主题：`#1a1a1a`
- 文本颜色：`#333` / `#f5f5f5`

## 📈 性能优化

- ✅ Tree Shaking (Vite自动处理)
- ✅ 代码分割
- ✅ 图片优化
- ✅ 懒加载
- ✅ 缓存策略
- ✅ 体积优化

## 🚀 部署

### 部署到GitHub Pages
```bash
npm run build
# 将dist文件夹内容部署到GitHub Pages
```

### 部署到Vercel
```bash
# 连接GitHub仓库到Vercel
# Vercel会自动检测Vite项目并部署
```

### 部署到Netlify
```bash
npm run build
# 上传dist文件夹到Netlify
```

## 📄 License

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

- Email: luo.1455@uga.edu
- GitHub: https://github.com/EddyLuo1232

---

**注意**: 这是原HTML网站的完整React移植版本，保留了所有原有功能和视觉效果。