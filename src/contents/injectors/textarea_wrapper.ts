import { getEventListeners } from "events"
import { type Root, createRoot } from "react-dom/client"

import { styles } from "~contents/utils/computedStyles_cloner"

import { InjectablesContainer } from "./elements/injectables"

let selector: string = "textarea"
let parentLevel: number = 2

const rootElementStyle: Array<[string, string]> = [
  ["display", "flex"],
  [
    "maxHeight",
    `calc((${
      styles().get("textarea") ? styles().get("textarea").get("height") : "50px"
    } + 1px) * 2)`
  ]
]

export function rootElementExists(): boolean {
  const existingRootElement = document.querySelector("#textarea_wrapper_root")
  return existingRootElement !== null
}

function createRootElement(): HTMLElement {
  const existingRootElement = document.querySelector("#textarea_wrapper_root")
  if (existingRootElement) {
    return existingRootElement as HTMLElement
  }
  const rootElement: HTMLElement = document.createElement("div")
  rootElementStyle.forEach(([property, value]) => {
    rootElement.style[property] = value
  })
  rootElement.id = "textarea_wrapper_root"
  return rootElement
}

export function getInjectorRootElement(): HTMLElement {
  const rootElement = document.querySelectorAll(selector)[0]
  return rootElement as HTMLElement
}

function getInjectorTargetElement(): HTMLElement {
  let targetElement: Element = getInjectorRootElement()
  for (let index = 0; index < parentLevel; index++) {
    targetElement = targetElement.parentElement
  }
  return targetElement as HTMLElement
}

function configureInjectionRootParent(e: HTMLElement) {
  if (window.innerWidth <= 767) {
    e.style.flexWrap = "wrap"
  }
}

let root: Root
function createInjetionRoot(): Root {
  const injectionTarget: HTMLElement = createRootElement()
  if (injectionTarget.parentElement) {
    return root
  }
  const targetElement: HTMLElement = getInjectorTargetElement()
  targetElement.appendChild(injectionTarget)
  configureInjectionRootParent(injectionTarget.parentElement)
  return createRoot(injectionTarget)
}

export function injectElements(rerender: boolean = true): void {
  root = createInjetionRoot()
  if (root != null && rerender) {
    root.render(InjectablesContainer())
  }
}
