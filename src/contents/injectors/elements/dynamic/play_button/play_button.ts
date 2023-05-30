/*global browser*/
import { classList } from "~contents/utils/classList_cloner"
import { injectStyle } from "~contents/utils/styler"
import { getUtterances } from "~contents/utils/strings"
import cssText from "data-text:~contents/injectors/elements/dynamic/play_button/play_button.css"
import { url } from "inspector"
import { Console } from "console"
injectStyle(cssText)


export const playLabel: string = "▸"
export const stopLabel: string = "■"
export const loadingLabel: string = '◠'

export function buttonHasPlayedInitially(target: HTMLElement) {
    const btns = target.getElementsByClassName("play-button")
    if (btns.length > 0) {
        return btns[0].getAttribute("hasplayedinitially") == "true"
    } else {
        return false
    }
}

export function setButtonHasPlayedInitially(target: HTMLElement, value: "true" | "false") {
    const btns = target.getElementsByClassName("play-button")
    if (btns.length > 0) {
        return btns[0].setAttribute("hasplayedinitially", value)
    } else {
    }
}

function getCurrentLabel(target: HTMLElement): string {
    const btns = target.getElementsByClassName("play-button")
    if (btns.length == 0) {
        return ""
    } else if (btns.length == 2) {
        console.log("Every element should have only one play button element inside it. The offending item was:")
        console.log(target);
    }
    const btn = btns[0] as HTMLElement
    return btn.innerText
}

function shouldRebuild(target: HTMLElement, shouldPlay: boolean, canPlay: boolean): boolean {

    let label: string;
    if (!canPlay)
        label = loadingLabel;
    else if (!shouldPlay) {
        label = playLabel
    } else {
        label = stopLabel
    }
    const currentLabel = getCurrentLabel(target)
    return label !== currentLabel && !buttonHasPlayedInitially(target)
}

let playing: boolean = false
export function build(target: HTMLElement, { shouldPlay = false, canPlay = false }): HTMLButtonElement | null {
    if (!shouldRebuild(target, shouldPlay, canPlay)) {
        return null
    } else {
        const existingbs = target.getElementsByClassName("play-button")
        if (existingbs.length > 0) {
            if (existingbs[0].getAttribute("rendered") == "true") {
                return null
            }
        }
    }

    let btn = document.createElement("button")
    btn.setAttribute("class", `${classList()} play-button`)
    if (!canPlay) {
        btn.setAttribute("rendered", "false")
        btn.innerHTML = `<span class="spin">${loadingLabel}</span>`
        return btn;
    }
    btn.innerHTML = playLabel
    btn.setAttribute("rendered", "true")
    if (window.speechSynthesis !== undefined && window.SpeechSynthesisUtterance !== undefined) {
        btn.onclick = (e) => playStopOnclick(target, btn)
    } else {
        btn.onclick = (e) => noSpeechApiError()
        btn.style.backgroundColor = "gray"
    }
    return btn;
}

function noSpeechApiError() {
    alert("The \"Talk to GPT\" extension currently doesn't support browsers without a native SpeechSynthesis API. For now you'll need to use a modern browser or update your current one. You can find a list of supported browsers here: https://caniuse.com/speech-synthesis")
}

export function playStopOnclick(target: HTMLElement, btn: HTMLButtonElement) {
    const text = target.innerText.replace(btn.innerHTML, "")
    if (btn.innerHTML == stopLabel) {
        stopText(target, btn)
    } else if (btn.innerHTML == playLabel) {
        window.speechSynthesis.cancel()
        btn.innerHTML = stopLabel
        playText(text, { target: target, btn: btn })
    }
}

async function playText(text: string, { target, btn }) {
    const utterances = await getUtterances(text)
    playUtterances(utterances, null, { target: target, btn: btn })
}

function playUtterances(utterances: [SpeechSynthesisUtterance], utterance: SpeechSynthesisUtterance | null = null, { target: target, btn: btn }) {
    if (utterance == null && utterances.length > 0) {
        const nextUtterance = utterances.shift()
        playUtterances(utterances, nextUtterance, { target: target, btn: btn })
        return
    }
    if (utterances.length > 0) {
        utterance.onend = () => {
            const nextUtterance = utterances.shift()
            playUtterances(utterances, nextUtterance, { target: target, btn: btn })
        }
    } else {
        utterance.onend = () => {
            playStopOnclick(target, btn)
            console.log(btn)
            const nextt: HTMLElement = btn.parentElement.nextElementSibling
            if (nextt !== null || nextt !== undefined) {
                const nextb: HTMLButtonElement = nextt.getElementsByClassName("play-button")[0] as HTMLButtonElement
                setTimeout(() => {
                    if (nextb !== undefined || nextb !== null) {
                        playStopOnclick(nextt, nextb)
                    }
                }, 100)
            }
        }
    }
    utterance.onerror = () => {
        console.log("speech stopped")
        stopText(target, btn)
        playing = false
    }
    const synth = window.speechSynthesis
    synth.speak(utterance)
}

function stopText(target: HTMLElement, btn: HTMLButtonElement) {
    btn.innerHTML = playLabel
    window.speechSynthesis.cancel()
}