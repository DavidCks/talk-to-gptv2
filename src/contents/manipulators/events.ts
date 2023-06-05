import { getInjectorRootElement } from '~contents/injectors/textarea_wrapper';
import { ids } from '../injectors/ids';
import { prompts } from './prompts';

function injectDialoguePrompt(injectorRoot: HTMLElement | HTMLTextAreaElement) {
    const dialogueToggle = document.querySelector("#" + ids.dialogue_toggle)
    if (!dialogueToggle) {
        return
    }
    const shouldInjectDialogue = dialogueToggle.getAttribute("aria-checked")
    if (shouldInjectDialogue == "true") {
        return prompts.dialogue;
    } else {
        return ""
    }
}

export function injectPromptsAndCancelReading() {
    const injectorRoot = getInjectorRootElement() as HTMLElement
    const originalRootText = injectorRoot.innerHTML
    if (originalRootText.startsWith("Instructions: ")) {
        return
    }
    let instructions = "Instructions: "
    instructions += injectDialoguePrompt(injectorRoot)
    let prompt = instructions += "\n\nQuery: " + originalRootText
    console.log("final prompt:\n" + prompt);
    (injectorRoot as any).value = prompt
    window.speechSynthesis.cancel()
}

function isActiveSendButton(targetElement: HTMLElement) {
    let target = targetElement
    for (let i = 0; i < 3; i++) {
        if (!!target && target.tagName == "BUTTON") {
            if (!(target as HTMLButtonElement).disabled) {
                if (target.parentElement.children[0].tagName == "TEXTAREA") {
                    return true
                }
            }
            target = target.parentElement
        }
        return false
    }
    return false
}

export function addEvents() {
    let isShiftPressed = false;
    window.addEventListener("click", (e) => {
        const targetElement = e.target as HTMLElement
        const shouldInject = isActiveSendButton(targetElement)
        if (shouldInject) {
            injectPromptsAndCancelReading()
        }
    });
    (getInjectorRootElement() as HTMLElement).onkeydown = (e) => {
        if (e.key == "Enter" && !isShiftPressed) {
            injectPromptsAndCancelReading()
        } else if (e.key == "Shift") {
            isShiftPressed = true
        }
    }
    window.addEventListener("keyup", (e) => {
        if (e.key == "Shift") {
            isShiftPressed = false
        }
    })
}