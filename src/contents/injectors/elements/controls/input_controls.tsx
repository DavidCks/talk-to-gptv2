import { useEffect, useRef, useState } from "react"
import { FaMicrophone } from "react-icons/fa"

import { classList } from "~contents/utils/classList_cloner"
import { styles } from "~contents/utils/computedStyles_cloner"

import "regenerator-runtime/runtime"

import cssText from "data-text:./input_controls.css"
import React from "react"
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition"
import type {
  ListeningOptions,
  SpeechRecognitionOptions
} from "react-speech-recognition"

import { getInjectorRootElement } from "~contents/injectors/textarea_wrapper"
import { getGlobalClassName, injectStyle } from "~contents/utils/styler"

import { addEvents } from "../../../manipulators/events"
import { supportedLanguages } from "../../../utils/supportedLanguages_getter"

injectStyle(cssText)

const globalClassName: string = getGlobalClassName()

function getInitialColor() {
  if (styles().get("textarea")) {
    return styles().get("textarea").get("color").toString()
  } else {
    return "black"
  }
}

export const InputControls = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("en-US")
  const langCodeSelectRef = useRef(null)
  const listeningOptions: ListeningOptions = {
    continuous: true
  }

  const speechRecognitionOptions: SpeechRecognitionOptions = {
    transcribing: true,
    clearTranscriptOnListen: true
  }
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition(speechRecognitionOptions)

  if (!browserSupportsSpeechRecognition) {
    return (
      <span className={classList() + globalClassName}>
        Your Browser doesn't support speech recognition.
      </span>
    )
  }

  if (!isMicrophoneAvailable) {
    return (
      <span className={classList() + globalClassName}>
        Please allow microfone access to use voice recognition.
      </span>
    )
  }

  const handleClick = () => {
    if (!isClicked) {
      listeningOptions.language = selectedLanguageCode
      SpeechRecognition.startListening(listeningOptions)
      console.log(
        `interpreting ${selectedLanguage} (${selectedLanguageCode})...`
      )
      window.speechSynthesis.cancel()
    } else {
      //injectPromptsAndCancelReading()
      SpeechRecognition.stopListening()
      console.log("stopped listening")
      resetTranscript()
    }
    setIsClicked(!isClicked)
  }

  const handleLangSelectChange = (e) => {
    setSelectedLanguage(e.target.value)
    const langCode: string = supportedLanguages.filter(
      ([label, _dialect, _langCode]) => {
        return label === e.target.value
      }
    )[0][2][0] as string
    setSelectedLanguageCode(langCode)
  }

  const handleLangCodeSelectChange = (e) => {
    setSelectedLanguageCode(e.target.value)
  }

  const textareaElement: HTMLTextAreaElement =
    getInjectorRootElement() as HTMLTextAreaElement
  setTimeout(() => {
    if (textareaElement.innerHTML === "" && transcript !== "") {
      console.log("resetting voice rec...")
      resetTranscript()
    }
  }, 500)
  useEffect(() => {
    if (transcript !== "") {
      console.log(transcript)
      textareaElement.innerHTML = transcript
      const textfieldLength = textareaElement.value.length
      textareaElement.addEventListener("focus", (e: any) => {
        e.target.value = transcript
      })
      textareaElement.focus()
      textareaElement.blur()
      textareaElement.focus()
    }
  }, [transcript])

  return (
    <>
      <button
        id="controls-input_controls-mic_button"
        className={classList() + globalClassName}
        style={{ minWidth: "40px" }}
        onClick={handleClick}>
        <FaMicrophone
          className="mic-button-svg dark:text-white"
          fill={isClicked ? "red" : getInitialColor()}
        />
      </button>
      <select
        className={classList() + globalClassName + " select-field"}
        onChange={handleLangSelectChange}
        defaultValue={selectedLanguage}>
        {supportedLanguages.map(([label, _dialects, _langCode]) => (
          <option key={label as string} value={label}>
            {label}
          </option>
        ))}
      </select>
      <select
        ref={langCodeSelectRef}
        className={classList() + globalClassName + " select-field"}
        defaultValue={selectedLanguageCode}
        onChange={handleLangCodeSelectChange}>
        {supportedLanguages
          .filter(([label, _dialects, _langCode]) => label == selectedLanguage)
          .map(([label, dialect, langCode]) =>
            (dialect as string[]).map((dialectLabel, i) => (
              <option
                key={dialectLabel as string}
                value={(langCode as string[])[i]}>
                {dialectLabel}
              </option>
            ))
          )}
      </select>
    </>
  )
}
