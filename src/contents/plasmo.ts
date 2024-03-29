import exp from "constants"
import cssText from "data-text:~contents/global.css"
import type { PlasmoCSConfig } from "plasmo"

import { injectElements, rootElementExists } from "./injectors/textarea_wrapper"
import { addEvents } from "./manipulators/events"
import { styles } from "./utils/computedStyles_cloner"
import { injectStyle } from "./utils/styler"

injectStyle(cssText)

export const config: PlasmoCSConfig = {
  //matches: ["<all_urls>"]
  matches: ["https://chat.openai.com/*"]
}

let recentlyInjectedThroughbserver = false
const observer: MutationObserver = new MutationObserver((mutations) => {
  setTimeout(() => (recentlyInjectedThroughbserver = false), 1000)
  if (!recentlyInjectedThroughbserver) {
    reinjectElements()
  }
  recentlyInjectedThroughbserver = true
})

setInterval(() => injectElements(), 1000)

function observerSetup() {
  const observerConfig: MutationObserverInit = {
    attributes: false,
    childList: true,
    subtree: true
  }
  let navroot = document.querySelector("nav")
  if (navroot == undefined) {
    navroot = document.querySelector("div>div>div>div>button")
  }
  observer.observe(navroot, observerConfig)
}

window.addEventListener("load", () => {
  observerSetup()
  injectElements()
  addEvents()
})

let isCorrectlyStyled = false
function reinjectElements() {
  observerSetup()
  if (!isCorrectlyStyled || !rootElementExists()) {
    injectElements()
    addEvents()
  }
  if (styles().get("textarea")) {
    isCorrectlyStyled = true
  } else {
    isCorrectlyStyled = false
    setTimeout(reinjectElements, 1000)
  }
}
