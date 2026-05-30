# Aeria Shop 主题

[English](README.md) | 中文

基于 **Next.js** 静态导出的数字产品电商主题，视觉规范来自 `design/aeriashop/DESIGN.md`。

## 目录说明

- `content/goods/` — 商品 Markdown 与图片（开发/构建时同步到 `public/goods/`）
- `content/docs/` — 文档 Markdown（`index.md` 对应 `/docs/` 首页）
- `public/` — 静态资源与 `shop.json`、`licenses.json`

## 本地开发

```bash
cd themes/aeriashop
npm install
npm run dev
```

## 构建

```bash
npm run build
```

在 **siteshopdev** 根目录多站点构建（base 为 `/aeriashop`）：

```bat
bin\build-themes.bat aeriashop
```

输出目录：`siteshop/aeriashop/`

## 社交图标

从 siteshopdev 的 `public/images/icon/` 同步 SVG 到 `public/images/icon/`。
