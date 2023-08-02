import { isNull } from "~contents/utils/is_null"

import { injectElements } from "../../../textarea_wrapper"
import { build, playStopOnclick, stopLabel } from "./play_button"

const observerTargetQuery = "main"
const buttonTargetQuery = "p, li"

function getObserverTargets() {
  const targets = document.querySelectorAll(observerTargetQuery)
  return targets
}

function hasAfterElement(element: Element): boolean {
  const computedStyle = window.getComputedStyle(element, "::after")
  return computedStyle.content !== "none"
}

export function init() {
  //console.log(`initializing '${buttonTargetQuery}' observer on '${observerTargetQuery}'`)
  const targets = getObserverTargets()
  targets.forEach((t) => {
    observe(t)
  })
}

function observe(el: HTMLElement) {
  const config: MutationObserverInit = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  }
  const observer = new MutationObserver(async (mutations) => {
    if (isControlsMutation(mutations)) {
      return
    }
    // Select all <p> elements inside the target element
    const paragraphs = el.querySelectorAll(buttonTargetQuery)
    paragraphs.forEach(async (p) => {
      const targetHasAfter = hasAfterElement(p)
      const dialogueElement = document.querySelector(
        "#controls-dialogue_toggle"
      )
      const dialogueIsTrue =
        !isNull(dialogueElement) &&
        dialogueElement.getAttribute("aria-checked") == "true"
      const playButton = build(p as HTMLElement, {
        canPlay: !targetHasAfter,
        shouldPlay: dialogueIsTrue
      })
      if (playButton !== null) {
        const existingButton = p.getElementsByClassName("play-button")[0]
        if (
          existingButton !== undefined &&
          existingButton.getAttribute("rendered") === "false"
        ) {
          p.removeChild(existingButton)
        } else if (
          existingButton === undefined ||
          existingButton.getAttribute("rendered") === "false"
        ) {
          p.insertAdjacentElement("afterbegin", playButton)
        }
        if (dialogueIsTrue) {
          setTimeout(() => {
            if (window.speechSynthesis.speaking === false) {
              let newb = p.getElementsByClassName("play-button")[0]
              playStopOnclick(p as HTMLElement, newb as HTMLButtonElement)
            }
          }, 33)
        }
      }
    })
  })
  observer.observe(el, config)
}

function isControlsMutation(mutations: MutationRecord[]): boolean {
  for (let i = 0; i < mutations.length; i++) {
    return isTargetControlsMutation(mutations[i].target as HTMLElement)
  }
}

function isTargetControlsMutation(target: HTMLElement): boolean {
  if (target.parentElement == null) {
    return false
  }
  if (
    target.parentElement.id == "textarea_wrapper_root" ||
    target.parentElement.tagName == "FORM" ||
    target.tagName == "TEXTAREA"
  ) {
    return true
  } else if (target.parentElement.tagName == "main") {
    return false
  } else {
    return isTargetControlsMutation(target.parentElement)
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
