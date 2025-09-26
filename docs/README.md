# 📁 文档和资源说明

## 文件夹结构

### 📄 PDFs 目录 (`docs/pdfs/`)
存放所有PDF文档，包括：
- `CV_Eddy.pdf` - Eddy的简历
- `doxing_via_the_lens.pdf` - 研究论文PDF

### 📝 说明文档
- `头像设置说明.txt` - 头像图片使用说明

## 使用说明

### 添加新PDF
1. 将PDF文件放置在 `docs/pdfs/` 目录下
2. 如需在网站中引用，更新HTML中的链接路径为 `docs/pdfs/文件名.pdf`

### 图片资源
- 网站相关图片请放置在 `images/assets/` 目录
- 论文相关图片请放置在 `images/publications/` 目录

## 文件路径引用

在HTML中引用PDF文件时，请使用相对路径：
```html
<a href="docs/pdfs/CV_Eddy.pdf" target="_blank">简历</a>
``` 