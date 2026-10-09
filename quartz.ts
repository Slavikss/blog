import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { SiteSeo } from "./site-seo"

const config = await loadQuartzConfig()
config.plugins.emitters.push(SiteSeo())
export default config
export const layout = await loadQuartzLayout()
