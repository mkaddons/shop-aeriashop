# Aeria Shop Theme

English | [中文](README.zh.md)

Digital product storefront built with **Next.js** static export, styled from `design/aeriashop/DESIGN.md` (Material You, Tailwind).

## Structure

- `content/goods/` — Product markdown and images (assets sync to `public/goods/` on dev/build)
- `content/docs/` — Documentation markdown (`index.md` = `/docs/` home)
- `public/` — Static assets, `shop.json`, and `licenses.json`

## Development

```bash
cd themes/aeriashop
npm install
npm run dev
```

## Build

```bash
npm run build
```

From **siteshopdev** root (multi-site, base `/aeriashop`):

```bat
bin\build-themes.bat aeriashop
```

Output: `siteshop/aeriashop/`

## Sync social icons

Copy SVGs from siteshopdev `public/images/icon/` into `public/images/icon/` when adding new networks.
