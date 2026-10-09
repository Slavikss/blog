---
created: 2026-06-09T13:37:13+03:00
modified: 2026-06-09T13:37:13+03:00
title: "Агентик инжиниринг: гайд от новичка до продвинутого"
description: "Структурированный гайд по агентному AI и кодинг-агентам: от первого знакомства до написания циклов. 17 материалов, меньше 5 часов."
tags:
  - ai
  - agents
  - engineering
draft: false
---

Одна идея под всем гайдом: современная модель уже достаточно умная. Выигрывает не хитрый промпт, а три вещи вместе: тонкая обвязка вокруг модели, аккуратно собранный контекст и цикл, который проверяет результат. Источники ниже идут по нарастанию сложности и учат именно этому. Поле меняется быстро, поэтому упор на принципы, которые живут дольше одного релиза модели.

**Как пользоваться:** читайте по порядку. Если времени совсем мало, минимум это пункты 1, 6 и 11: понять суть, освоить контекст, поднять реальную обвязку. Всего 17 материалов, два из них интервью. **Общее время на обучение — меньше 5 часов!**

-----

## Уровень 1. Новичок: понять, что такое агент

**1. Anthropic, "Building effective agents"**
Самый чистый разбор без воды: чем агент отличается от обычного конвейера-скрипта.
<https://www.anthropic.com/research/building-effective-agents>

**2. Simon Willison, "Agentic Engineering Patterns"**
Живой сборник рабочих приёмов от независимого практика. Объясняет разницу между "набросал по фану" (vibe coding) и кодом продакшн-уровня.
<https://simonwillison.net/guides/agentic-engineering-patterns/>

**3. Anthropic, "Claude Code in Action" (официальный курс)**
Лаконичный и лёгкий курс от Anthropic, идеальный для старта: разбирают архитектуру, задуманные паттерны использования и best practices от самих создателей. Помогает понять логику инструмента до того, как вы начнёте писать команды.
<https://anthropic.skilljar.com/claude-code-in-action>

-----

## Уровень 2. Новичок и выше: научиться водить инструмент

**4. Anthropic, "Claude Code best practices"**
Практический мануал: как реально работать с кодинг-агентом, что включать и чего избегать.
<https://code.claude.com/docs/en/best-practices>

**5. Sankalp, "My experience with Claude Code 2.0"**
Инженерный разбор реального опыта эксплуатации: управление контекстом, типичные ошибки модели и приёмы, которые помогают агенту писать рабочий код, а не галлюцинировать.
<https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/>

**6. Karpathy guidelines (skill)**
Четыре простых правила поведения, которые кладут в файл CLAUDE.md рядом с кодом. Снижают долю ошибок примерно с 41% до 11%. Четыре правила от Карпаты, расширенная версия на 12 уже от сообщества.
<https://github.com/forrestchang/andrej-karpathy-skills>

-----

## Уровень 3. Средний: главный навык, контекст

**7. Anthropic, "Effective context engineering"**
Относиться к контексту (тому, что видит модель) как к ограниченному ресурсу: что класть, а что вовремя выкидывать.
<https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>

**8. Manus, "Context Engineering: Lessons from Building Manus"**
Те же уроки, но из реального продакшна: команда рассказывает, что ломалось и как чинили.
<https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus>

**9. Anthropic, "Code execution with MCP"**
Свежий приём: вместо того чтобы дёргать инструменты по одному, модель пишет небольшой код, который вызывает их сам. Сильно экономит токены.
<https://www.anthropic.com/engineering/code-execution-with-mcp>

-----

## Уровень 4. Продвинутый: длинные задачи и обвязка

**10. Anthropic, "Effective harnesses for long-running agents"**
Как заставить агента доводить длинную задачу, которая не влезает в одно окно: агент-инициализатор плюс файл прогресса.
<https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents>

**11. LangChain Deep Agents (открытая обвязка)**
Готовый харнесс, работает с любой моделью (OpenAI, Anthropic, локальные через vLLM или Ollama). В их разборе кодинг-агент поднялся с Top 30 до Top 5 на бенчмарке без смены модели, только за счёт обвязки.
<https://github.com/langchain-ai/deepagents>

-----

## Уровень 5. Профи: писать циклы, а не промпты

> **★ Начните отсюда:** [[agentic-engineering/wtf-is-loops|Что за «loops», о которых все говорят]] — самый понятный разбор циклов и целей (`/loop`, `/goal`) на простом языке. Вся история термина от ReAct до оркестрации, живые цитаты практиков и главный вывод: дорогим стал не «мозг», а цикл вокруг него. Базовое чтиво для всего этого уровня.

**12. Boris Cherny, интервью у Pragmatic Engineer**
Разговор с создателем Claude Code. Главная мысль: перестать писать промпты и начать писать циклы (лупы), которые сами гоняют агентов.
<https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny>

**13. Peter Steinberger, "Just Talk To It"**
Самый честный текст про соло-разработку с агентами: меньше городить сложных схем, больше отгружать.
<https://steipete.me/posts/just-talk-to-it>

**14. Addy Osmani, "Loop Engineering"**
Хорошая карта сдвига "циклы вместо промптов" со ссылками на первоисточники.
<https://addyosmani.com/blog/loop-engineering/>

-----

## Уровень 6. Трезвость: чтобы не повестись на хайп

**15. Andrej Karpathy х Dwarkesh Patel, интервью (около 2.5 часов)**
Для калибровки: автор крайне силён в кодинг-агентах, но честно говорит, что универсальные агенты это работа на годы, а не на этот год. Ищите по названию "Andrej Karpathy AGI a decade away".
<https://www.dwarkesh.com>

**16. Cognition (Walden Yan), "Don't Build Multi-Agents"**
Контраргумент против моды на мультиагентов: не плодите агентов, пока не решили, как они делят между собой контекст.
<https://cognition.ai/blog/dont-build-multi-agents>

**17. Mitchell Hashimoto, "My AI Adoption Journey"**
Шесть фаз честного внедрения агентов без хайпа. Золотое правило: дай агенту способ проверять свою работу, и он сам чинит большую часть ошибок.
<https://mitchellh.com/writing/my-ai-adoption-journey>
