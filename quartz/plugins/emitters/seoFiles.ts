import { FilePath, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import chalk from "chalk"
import DepGraph from "../../depgraph"

// LLM crawlers / answer-engine bots we explicitly welcome.
const LLM_BOTS = [
  "GPTBot", // OpenAI training crawler
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on behalf of a user
  "ClaudeBot", // Anthropic crawler
  "Claude-SearchBot", // Claude search
  "Claude-User", // Claude browsing on behalf of a user
  "anthropic-ai", // legacy Anthropic agent
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex training opt-in
  "Applebot-Extended", // Apple AI
  "Bytespider", // ByteDance / Doubao
  "YandexAdditional", // YandexGPT
  "CCBot", // Common Crawl (feeds many models)
  "Amazonbot",
  "cohere-ai",
  "Diffbot",
  "Meta-ExternalAgent",
]

// Classic search engine crawlers (RU + EN coverage).
const SEARCH_BOTS = ["Googlebot", "Bingbot", "YandexBot", "DuckDuckBot", "Applebot"]

function buildRobotsTxt(baseUrl: string): string {
  const sitemap = `https://${baseUrl}/sitemap.xml`
  const lines: string[] = []

  // Everyone is welcome to the whole site.
  lines.push("User-agent: *", "Allow: /", "")

  // Explicitly invite each search + LLM crawler. Being explicit matters:
  // some agents only obey a named block and ignore the wildcard.
  for (const bot of [...SEARCH_BOTS, ...LLM_BOTS]) {
    lines.push(`User-agent: ${bot}`, "Allow: /", "")
  }

  lines.push(`Sitemap: ${sitemap}`, "")
  return lines.join("\n")
}

function buildLlmsTxt(baseUrl: string): string {
  const base = `https://${baseUrl}`
  return `# Vyacheslav Guch (Вячеслав Гуч) — slava's words

> AI Product Manager. 2+ years shipping AI/ML/GenAI products from concept to
> commercialization. Portfolio of 6+ AI products that cut client operational
> costs by 40–50%. HSE University, Applied Math & CS. Speaker at AI Conf 2026.

Личный сайт и рабочая база знаний Вячеслава Гуча о продакт-менеджменте,
проектном управлении и agentic engineering. Материалы на русском и английском.

## Об авторе

- Имя: Вячеслав Гуч (Vyacheslav Guch)
- Роль: AI Product Manager (старший продакт-менеджер в AI-направлениях)
- Образование: НИУ ВШЭ — Прикладная математика и информатика (Merit Scholar)
- Экспертиза: AI/ML/GenAI продукты, продуктовая стратегия, P&L, ML System Design,
  agentic AI, RAG, text-to-SQL, GTM, продуктовая аналитика, A/B-тесты
- Сооснователь и продакт Shperling AI — LLM-платформа операционной эффективности
  для SME (pre-seed оценка $5M)
- Спикер AI Conf 2026 — доклад «AI для бизнеса без иллюзий»

## Основные разделы

- [Главная](${base}/): кто такой Слава и чем он занимается
- [Product Management cheatsheets](${base}/pm-study): 400+ страниц фреймворков,
  чек-листов и шаблонов экспериментов от топовых компаний
- [Project Management](${base}/project-management-study): практики проектного
  управления
- [Agentic Engineering](${base}/agentic-engineering): заметки про AI-агентов и
  инженерию вокруг LLM
- [Knowledge base](${base}/knowledge): структурированная база знаний

## Профили и источники

- GitHub: https://github.com/Slavikss
- LinkedIn: https://linkedin.com/in/vguch
- Telegram: https://t.me/sslava_g
- Telegram-канал: https://t.me/slavaswords
- AI Conf 2026 (спикер): https://aiconf.ru/2026/authors/20540
- НИУ ВШЭ (интервью о Shperling AI): https://cs.hse.ru/cppr/news/998965907.html
`
}

export const SeoFiles: QuartzEmitterPlugin = () => ({
  name: "SeoFiles",
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph(_ctx, _content, _resources) {
    return new DepGraph<FilePath>()
  },
  async emit({ argv, cfg }, _content, _resources): Promise<FilePath[]> {
    if (!cfg.configuration.baseUrl) {
      console.warn(chalk.yellow("SeoFiles emitter requires `baseUrl` to be set in your configuration"))
      return []
    }
    const baseUrl = cfg.configuration.baseUrl

    const robotsPath = joinSegments(argv.output, "robots.txt") as FilePath
    const llmsPath = joinSegments(argv.output, "llms.txt") as FilePath

    fs.writeFileSync(robotsPath, buildRobotsTxt(baseUrl))
    fs.writeFileSync(llmsPath, buildLlmsTxt(baseUrl))

    return [robotsPath, llmsPath]
  },
})
