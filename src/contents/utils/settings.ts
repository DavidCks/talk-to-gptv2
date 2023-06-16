import { ids } from "~contents/injectors/ids"

export type SpeechSettings = {
  volume: number
  pitch: number
  rate: number
}

export const getSpeechSettings: () => SpeechSettings = () => {
  const v = localStorage.getItem(ids.settings_volume) ?? "1"
  const r = localStorage.getItem(ids.settings_rate) ?? "1"
  const p = localStorage.getItem(ids.settings_pitch) ?? "1"
  console.log(v, r, p)
  return {
    volume: parseInt(v) / 100,
    pitch: parseInt(p) / 100,
    rate: parseInt(r) / 100
  }
}
