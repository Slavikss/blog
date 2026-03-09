import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "slava's words",
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
          secondary: "#0b7d82",
          tertiary: "#1a3f61",
          highlight: "rgba(11, 125, 130, 0.16)",
          textHighlight: "#7ecbd16b",
        },
        darkMode: {
          light: "#111416",
          lightgray: "#2a3138",
          gray: "#8f99a7",
          darkgray: "#dde4ee",
          dark: "#f3f6fa",
          secondary: "#4fcfc5",
          tertiary: "#7aa6d4",
          highlight: "rgba(79, 207, 197, 0.2)",
          textHighlight: "#2d8f9888",
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
      Plugin.TableOfContents({
        collapseByDefault: true,
      }),
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
