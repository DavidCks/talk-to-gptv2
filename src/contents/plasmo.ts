import exp from "constants"
import type { PlasmoCSConfig } from "plasmo"
import { rootElementExists, injectElements } from "./injectors/textarea_wrapper"
import cssText from "data-text:~contents/global.css"
import { injectStyle } from "./utils/styler"
import { styles } from "./utils/computedStyles_cloner"
import { addEvents } from "./manipulators/events"
injectStyle(cssText)

export const config: PlasmoCSConfig = {
  //matches: ["<all_urls>"]
  matches: ["https://chat.openai.com/*"]
}

setInterval(() => injectElements(), 1000)

window.addEventListener("load", () => {
  const observerConfig: MutationObserverInit = { attributes: true, childList: true, subtree: true };
  let navroot = document.querySelector("nav");
  if (navroot == undefined) {
    navroot = document.querySelector("div>div>div>div>button");
  }
  observer.observe(navroot, observerConfig);
  injectElements();
})

let isCorrectlyStyled = false;
const observer = new MutationObserver(function (mutations) {
  reinjectElements()
});
function reinjectElements() {
  const observerConfig: MutationObserverInit = { attributes: false, childList: true, subtree: true };
  let navroot = document.querySelector("nav");
  if (navroot == undefined) {
    navroot = document.querySelector("div>div>div>div>button");
  }
  observer.observe(navroot, observerConfig);
  navroot.addEventListener("click", () => {
    let el = document.getElementById("textarea_wrapper_root");
    if (el !== null) {
      el.parentElement.removeChild(el)
    }
    setTimeout(reinjectElements, 1000)
  })

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