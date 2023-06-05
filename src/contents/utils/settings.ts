export type SpeechSettings = {
    volume: number,
    pitch: number,
    rate: number,
}

export const getSpeechSettings: () => SpeechSettings = () => {
    const vEl = document.querySelector("#settings-volume")
    const vSlider = vEl.querySelector("[role=slider]")
    const pEl = document.querySelector("#settings-pitch")
    const pSlider = pEl.querySelector("[role=slider]")
    const rEl = document.querySelector("#settings-rate")
    const rSlider = rEl.querySelector("[role=slider]")
    return { volume: 1, pitch: 1, rate: 1 }
}