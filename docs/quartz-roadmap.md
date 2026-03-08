# Quartz Roadmap: полезные неиспользуемые возможности

Этот план собран для текущего состояния сайта `slava's words` с приоритетом на навигацию и поиск.

## Волна 1: Навигация и поиск (приоритет)

### 1) `Header` как быстрые маршруты чтения

- Польза: быстрый доступ к ключевым путям (`Главная`, `PM`, `Project`, `Обо мне`) без лишнего скролла.
- Где включать:
  - [quartz.layout.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.layout.ts) в `sharedPageComponents.header`.
- Минимум внедрения:
  - Добавить `Component.Header({...})` с 4-6 стабильными ссылками.
  - Проверить поведение на `320/375/390`.

### 2) Точечная навигация через `Explorer` и структуру разделов

- Польза: быстрее находить модули в больших разделах `knowledge/*`.
- Где улучшать:
  - [quartz.layout.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.layout.ts) параметры `Explorer`.
- Минимум внедрения:
  - Согласовать названия разделов на русском.
  - Проверить, что глубина дерева комфортна для mobile.

## Волна 2: Вовлечение и дистрибуция

### 3) `Comments` компонент

- Польза: собирать обратную связь по лонгридам и модулям.
- Где включать:
  - [quartz.layout.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.layout.ts) в правой колонке (под `Backlinks`) или после статьи.
  - Конфигурация провайдера в [quartz.config.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.config.ts) (через `comments`).
- Минимум внедрения:
  - Выбрать провайдера (например, Giscus/Utterances).
  - Включать только на `draft: false`.

### 4) `generateSocialImages`

- Польза: качественный превью-контент в Telegram/X/LinkedIn.
- Где включать:
  - [quartz.config.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.config.ts), `configuration.generateSocialImages = true`.
- Минимум внедрения:
  - Проверить шаблон соц-превью на русском заголовке.
  - Не ломать существующий `baseUrl`.

### 5) `CNAME` emitter

- Польза: чистая работа кастомного домена без ручного файла.
- Где включать:
  - [quartz.config.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.config.ts), `emitters: [Plugin.CNAME()]`.
- Минимум внедрения:
  - Задать домен в конфиге и сверить DNS.

## Волна 3: Контентный пайплайн

### 6) `Citations` transformer

- Польза: единообразные ссылки на источники и академичные заметки.
- Где включать:
  - [quartz.config.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.config.ts), `transformers: [Plugin.Citations()]`.
- Минимум внедрения:
  - Принять формат библиографии (BibTeX/CSL).
  - Проверить отрисовку на существующих заметках.

### 7) `LineBreaks` transformer

- Польза: чище импорт заметок из внешних markdown-источников без ручной правки переносов.
- Где включать:
  - [quartz.config.ts](/Users/slava/Documents/Obsidian/blog-clean-20260308/quartz.config.ts), `transformers: [Plugin.LineBreaks()]`.
- Минимум внедрения:
  - Прогнать выборочно 5-10 страниц с callout/таблицами.
  - Убедиться, что переносы не ломают текущую типографику.
