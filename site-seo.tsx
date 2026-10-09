import fs from "node:fs"
import path from "node:path"
import type { QuartzEmitterPlugin } from "./quartz/plugins/types"
import type { QuartzPluginData } from "./quartz/plugins/vfile"
import type { FilePath } from "./quartz/util/path"

const SEARCH_BOTS = ["Googlebot", "Bingbot", "YandexBot", "DuckDuckBot", "Applebot"]
const LLM_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "YandexAdditional",
  "CCBot",
  "Amazonbot",
  "cohere-ai",
  "Diffbot",
  "Meta-ExternalAgent",
]

const SAME_AS = [
  "https://www.wikidata.org/wiki/Q140140251",
  "https://github.com/Slavikss",
  "https://linkedin.com/in/vguch",
  "https://t.me/sslava_g",
  "https://aiconf.ru/2026/authors/20540",
  "https://cs.hse.ru/cppr/news/998965907.html",
]

function siteUrl(baseUrl: string): string {
  return `https://${baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
}

function pageUrl(base: string, fileData: QuartzPluginData): string {
  if (!fileData.slug || fileData.slug === "index") return `${base}/`
  return `${base}/${fileData.slug}`
}

function description(fileData: QuartzPluginData): string {
  const frontmatter = fileData.frontmatter
  return String(
    frontmatter?.socialDescription ?? frontmatter?.description ?? fileData.description ?? "",
  )
}

function isoDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value)
    if (!Number.isNaN(date.valueOf())) return date.toISOString()
  }
  return undefined
}

function buildStructuredData(base: string, pageTitle: string, fileData: QuartzPluginData): string {
  const personId = `${base}/#person`
  const websiteId = `${base}/#website`
  const url = pageUrl(base, fileData)
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: "Вячеслав Гуч",
      alternateName: ["Vyacheslav Guch", "Slava Guch", "slava"],
      url: base,
      jobTitle: "AI Product Manager",
      worksFor: {
        "@type": "Organization",
        name: "Raiffeisenbank",
        sameAs: "https://www.raiffeisen.ru/",
      },
      description:
        "AI Product Manager. Строит AI/ML/GenAI продукты от идеи до коммерциализации. " +
        "Спикер AI Conf 2026, сооснователь и продакт Shperling AI.",
      knowsAbout: [
        "Product Management",
        "AI Product Management",
        "Machine Learning",
        "Generative AI",
        "Agentic AI",
        "ML System Design",
        "RAG",
        "Product Strategy",
        "Go-to-Market",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "HSE University",
        sameAs: "https://www.hse.ru/en/",
      },
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: base,
      name: pageTitle,
      inLanguage: ["ru", "en"],
      author: { "@id": personId },
      publisher: { "@id": personId },
    },
  ]

  if (fileData.slug && fileData.slug !== "index" && fileData.slug !== "404") {
    const title = String(fileData.frontmatter?.title ?? fileData.slug)
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: title,
      description: description(fileData),
      url,
      inLanguage: "ru",
      image: `${url}-og-image.webp`,
      datePublished: isoDate(fileData.dates?.created),
      dateModified: isoDate(fileData.dates?.modified ?? fileData.dates?.created),
      author: { "@id": personId },
      publisher: { "@id": personId },
      isPartOf: { "@id": websiteId },
      mainEntityOfPage: url,
    })
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  )
}

function buildRobotsTxt(baseUrl: string): string {
  const lines = ["User-agent: *", "Allow: /", ""]
  for (const bot of [...SEARCH_BOTS, ...LLM_BOTS]) {
    lines.push(`User-agent: ${bot}`, "Allow: /", "")
  }
  lines.push(`Sitemap: ${siteUrl(baseUrl)}/sitemap.xml`, "")
  return lines.join("\n")
}

function buildLlmsTxt(baseUrl: string): string {
  const base = siteUrl(baseUrl)
  return `# Vyacheslav Guch (Вячеслав Гуч) — slava's words

> AI Product Manager. 3+ years shipping AI/ML/GenAI products from concept to
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
- [Project Management](${base}/project-management-study): практики проектного управления
- [Agentic Engineering](${base}/agentic-engineering): заметки про AI-агентов и LLM
- [Knowledge base](${base}/knowledge): структурированная база знаний

## Профили и источники

- Wikidata: https://www.wikidata.org/wiki/Q140140251
- GitHub: https://github.com/Slavikss
- LinkedIn: https://linkedin.com/in/vguch
- Telegram: https://t.me/sslava_g
- Telegram-канал: https://t.me/slavaswords
- AI Conf 2026 (спикер): https://aiconf.ru/2026/authors/20540
- НИУ ВШЭ (интервью о Shperling AI): https://cs.hse.ru/cppr/news/998965907.html
`
}

export const SiteSeo: QuartzEmitterPlugin = () => ({
  name: "SiteSeo",
  externalResources(ctx) {
    const cfg = ctx.cfg.configuration
    const base = siteUrl(cfg.baseUrl ?? "slava.blog")
    return {
      additionalHead: [
        (fileData) => (
          <>
            <meta name="author" content="Вячеслав Гуч (Vyacheslav Guch)" />
            <link rel="me" href="https://github.com/Slavikss" />
            <link rel="me" href="https://linkedin.com/in/vguch" />
            <link rel="me" href="https://t.me/sslava_g" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: buildStructuredData(base, cfg.pageTitle, fileData),
              }}
            />
          </>
        ),
      ],
    }
  },
  async emit({ argv, cfg }) {
    const baseUrl = cfg.configuration.baseUrl
    if (!baseUrl) {
      console.warn("SiteSeo requires configuration.baseUrl; SEO files were not emitted")
      return []
    }

    const files = {
      "robots.txt": buildRobotsTxt(baseUrl),
      "llms.txt": buildLlmsTxt(baseUrl),
      "yandex_7a985e8de70ba860.html":
        '<html>\n  <head><meta charset="UTF-8"></head>\n  <body>Verification: 7a985e8de70ba860</body>\n</html>\n',
    }

    await fs.promises.mkdir(argv.output, { recursive: true })
    const emitted: FilePath[] = []
    for (const [filename, contents] of Object.entries(files)) {
      const outputPath = path.join(argv.output, filename) as FilePath
      await fs.promises.writeFile(outputPath, contents)
      emitted.push(outputPath)
    }
    return emitted
  },
})
