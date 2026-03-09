const bufferPx = 150
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElements.length > 0) {
      for (const tocEntryElement of tocEntryElements) {
        if (entry.boundingClientRect.y < windowHeight) {
          tocEntryElement.classList.add("in-view")
        } else {
          tocEntryElement.classList.remove("in-view")
        }
      }
    }
  }
})

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  const tocs = document.querySelectorAll<HTMLElement>(".toc .toc-button")
  for (const toc of tocs) {
    if (toc.dataset.tocBound === "true") {
      continue
    }
    toc.dataset.tocBound = "true"
    toc.addEventListener("click", toggleToc)
    window.addCleanup(() => {
      toc.removeEventListener("click", toggleToc)
      delete toc.dataset.tocBound
    })
  }
}

window.addEventListener("resize", setupToc)
document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
