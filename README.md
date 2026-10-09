# slava's words

Исходники [slava.blog](https://slava.blog) — личного сайта и базы знаний
Вячеслава Гуча. Сайт работает на Quartz v5, контент хранится в Markdown.

## Локальный запуск

Нужны Node.js 22+ и npm 10.9.2+.

```bash
npm ci
npx quartz build --serve
```

Проверки перед публикацией:

```bash
npm run check
npm test
npx quartz build
```

- Контент: `content/`
- Конфигурация и layout: `quartz.config.yaml`
- Локальное SEO-расширение: `site-seo.tsx`
- Деплой: push в `v5` запускает GitHub Pages workflow
