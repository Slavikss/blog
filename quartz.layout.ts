import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Slavikss",
      Telegram: "https://t.me/slavaswords",
      LinkedIn: "https://linkedin.com/in/vguch",
    },
  }),
}

// Components for pages that display a single page (e.g., a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta({ showComma: false }),
    Component.TagList(),
    Component.MobileOnly(Component.Search()),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.PageTitle(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({ useSavedState: true })),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Свежие заметки",
        limit: 8,
        showTags: true,
        linkToMore: false,
        filter: (f) => f.slug !== "index",
      }),
    ),
  ],
  right: [
    Component.DesktopOnly(Component.Search()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(
      Component.Graph({
        localGraph: {
          depth: 2,
          scale: 1,
          linkDistance: 45,
          showTags: true,
        },
        globalGraph: {
          depth: 2,
          scale: 0.85,
          linkDistance: 50,
          showTags: false,
          removeTags: ["home"],
        },
      }),
    ),
  ],
}

// Components for pages that display lists of pages (e.g., tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta({ showComma: false }),
    Component.TagList(),
    Component.MobileOnly(Component.Search()),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.PageTitle(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Search()),
    Component.DesktopOnly(Component.Explorer({ useSavedState: true })),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Что читать дальше",
        limit: 10,
        showTags: true,
        linkToMore: false,
        filter: (f) => f.slug !== "index",
      }),
    ),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}
