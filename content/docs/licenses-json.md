---
title: licenses.json
order: 12
---

License **labels and descriptions** on product detail pages come from **`public/licenses.json`**, not from product Markdown.

Format reference: `desc/licenses.json` in the siteshopdev repo.

## File location

```
/public/licenses.json
```

## Schema

### `title`

Section heading above license purchase buttons (default: `License`).

### `types`

Object map. **Keys must match** the keys under each product’s `license` front matter in `content/goods/` (e.g. `single license`, `team licenses`).

Each type:

| Field | Description |
| --- | --- |
| `label` | Display name (buttons and description line) |
| `description` | Short text shown under the matching purchase button |
| `free` | If `true`, that tier shows **Free** on buttons and cards (the type key name alone does not imply free) |
| `order` | Sort order on product pages and for **From** pricing (lower = first; default `999` if omitted) |

## Detail page layout

For each tier defined on the product:

1. **Free** or **Purchase** + price (`payurl` always from product front matter; `price` from product when not free)
2. Description line: `{label} — {description}` from this file

## Example

```json
{
  "title": "License",
  "types": {
    "free license": {
      "label": "Free license",
      "description": "Personal use with attribution.",
      "free": true,
      "order": 1
    },
    "single license": {
      "label": "Single license",
      "description": "One production deployment.",
      "free": false,
      "order": 2
    },
    "team licenses": {
      "label": "Team licenses",
      "description": "Unlimited seats within your organization.",
      "free": false,
      "order": 3
    }
  }
}
```

## Adding a new tier

1. Add the type to `public/licenses.json` under `types` (set `free: true` for free tiers).
2. Add the same key under `license` in the product Markdown with `payurl` (and `price` when `free` is not `true`).
