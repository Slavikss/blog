import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Слова Славы",
    pageTitleSuffix: " | slava's words",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
      host: "https://plausible.io",
    },
    locale: "ru-RU",
    baseUrl: "slavikss.github.io/blog",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Space Grotesk",
        body: "Literata",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f6f4f1",
          lightgray: "#ddd4cb",
          gray: "#988d80",
          darkgray: "#3d342c",
          dark: "#1f1914",
          secondary: "#0f6f63",
          tertiary: "#c7632e",
          highlight: "rgba(199, 99, 46, 0.14)",
          textHighlight: "#ffe48f80",
        },
        darkMode: {
          light: "#111416",
          lightgray: "#2a3138",
          gray: "#8f99a7",
          darkgray: "#dde4ee",
          dark: "#f3f6fa",
          secondary: "#58c8ba",
          tertiary: "#ff9a62",
          highlight: "rgba(255, 154, 98, 0.16)",
          textHighlight: "#b3992188",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
