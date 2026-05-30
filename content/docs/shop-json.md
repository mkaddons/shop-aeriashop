---
title: shop.json
order: 10
---

Site-wide settings live at **`public/shop.json`**. Format reference: `desc/shop.json` in the siteshopdev repo (comments are documentation only; real JSON must not include comments).

## File location

```
/public/shop.json
```

## Schema

### `config`

| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Site title (header, metadata) |
| `description` | string | Site description (metadata) |
| `theme` | string | Theme variant identifier |
| `copyright` | string | Footer copyright line |

### `socials`

Object map of social links. **Keys must match** an SVG filename under `public/images/icon/` (without `.svg`).

Example: `"github": "https://github.com/..."` uses `/images/icon/github.svg`.

Supported icons are synced from siteshopdev `public/images/icon/` when you run `npm run dev` or `npm run build`.

### `email`

Optional contact email shown under social icons in the footer.

## Example

```json
{
  "config": {
    "title": "Aeria Shop",
    "description": "Sell software globally.",
    "theme": "default",
    "copyright": "© 2026 Aeria Shop"
  },
  "socials": {
    "github": "https://github.com/mkdevkit",
    "x": "https://x.com/mkdevkit"
  },
  "email": "hello@aeriashop.com"
}
```
