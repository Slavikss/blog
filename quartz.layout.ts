import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Slavikss",
      "Telegram": "https://t.me/slavaswords",
    },
  }),
};

// Components for pages that display a single page (e.g., a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    // Component.TagList(),
    Component.MobileOnly(Component.Search()),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Search(),
    Component.Backlinks(),
    Component.Explorer(),
  ],
};

// Components for pages that display lists of pages (e.g., tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(),
  ],
  right: [],
};
