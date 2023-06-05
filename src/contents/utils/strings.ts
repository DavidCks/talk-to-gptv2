import { split, type TxtParentNodeWithSentenceNodeContent } from "sentence-splitter"
import { franc, type Options } from "franc-min"

export const crxToFranc = {
    "en": "eng",
    "ja": "jpn",
    "de": "deu",
    "zh": "cmn",
    "es": "spa",
    "ru": "rus",
    "ar": "arb",
    "bn": "ben",
    "hi": "hin",
    "pt": "por",
    "id": "ind",
    "fr": "fra",
    "jv": "jav",
    "ko": "kor",
    "te": "tel",
    "vi": "vie",
    "mr": "mar",
    "it": "ita",
    "ta": "tam",
    "tr": "tur",
    "ur": "urd",
    "gu": "guj",
    "pl": "pol",
    "uk": "ukr",
    "kn": "kan",
    "mai": "mai",
    "ml": "mal",
    "fa": "pes",
    "my": "mya",
    "sw": "swh",
    "su": "sun",
    "ro": "ron",
    "pa": "pan",
    "bh": "bho",
    "am": "amh",
    "ha": "hau",
    "fuv": "fuv",
    "bs_cyrl": "bos",
    "bs_latn": "bos",
    "hr": "hrv",
    "nl": "nld",
    "sr_cyrl": "srp",
    "sr_latn": "srp",
    "th": "tha",
    "ckb": "ckb",
    "yo": "yor",
    "uz_cyrl": "uzn",
    "uz_latn": "uzn",
    "zlm_arab": "zlm",
    "zlm_latn": "zlm",
    "ig": "ibo",
    "ne": "npi",
    "ceb": "ceb",
    "skr": "skr",
    "tl": "tgl",
    "hu": "hun",
    "az_cyrl": "azj",
    "az_latn": "azj",
    "si": "sin",
    "koi": "koi",
    "el": "ell",
    "cs": "ces",
    "mag": "mag",
    "rn": "run",
    "be": "bel",
    "plt": "plt",
    "qug": "qug",
    "mad": "mad",
    "ny": "nya",
    "zyb": "zyb",
    "pbu": "pbu",
    "rw": "kin",
    "zu": "zul",
    "bg": "bul",
    "sv": "swe",
    "ln": "lin",
    "so": "som",
    "hms": "hms",
    "hnj": "hnj",
    "ilo": "ilo",
    "kk": "kaz"
} as const

export const francToCrx =
{
    "cmn": "zh-CN",
    "spa": "es-ES",
    "eng": "en-US",
    "rus": "ru-RU",
    "arb": "ar-SA",
    "ben": "bn-BD",
    "hin": "hi-IN",
    "por": "pt-PT",
    "ind": "id-ID",
    "jpn": "ja-JP",
    "fra": "fr-FR",
    "deu": "de-DE",
    "jav": "jv-Java",
    "kor": "ko-KR",
    "tel": "te-IN",
    "vie": "vi-VN",
    "mar": "mr-IN",
    "ita": "it-IT",
    "tam": "ta-IN",
    "tur": "tr-TR",
    "urd": "ur-PK",
    "guj": "gu-IN",
    "pol": "pl-PL",
    "ukr": "uk-UA",
    "kan": "kn-IN",
    "mai": "mai-IN",
    "mal": "ml-IN",
    "pes": "fa-IR",
    "mya": "my-MM",
    "swh": "sw-TZ",
    "sun": "su-ID",
    "ron": "ro-RO",
    "pan": "pa-IN",
    "bho": "bho-IN",
    "amh": "am-ET",
    "hau": "ha-NG",
    "fuv": "fuv-NG",
    "bos": "bs-Latn-BA",
    "hrv": "hr-HR",
    "nld": "nl-NL",
    "srp": "sr-Cyrl-RS",
    "tha": "th-TH",
    "ckb": "ku-IQ",
    "yor": "yo-NG",
    "uzn": "uz-Cyrl-UZ",
    "zlm": "ms-MY",
    "ibo": "ig-NG",
    "npi": "ne-NP",
    "ceb": "ceb-PH",
    "skr": "skr-PK",
    "tgl": "tl-PH",
    "hun": "hu-HU",
    "azj": "az-Cyrl-AZ",
    "sin": "si-LK",
    "koi": "koi-RU",
    "ell": "el-GR",
    "ces": "cs-CZ",
    "mag": "mag-IN",
    "run": "rn-BI",
    "bel": "be-BY",
    "plt": "plt-MG",
    "qug": "qug-EC",
    "mad": "mad-ID",
    "nya": "ny-MW",
    "zyb": "none",
    "pbu": "none",
    "kin": "rw-RW",
    "zul": "zu-ZA",
    "bul": "bg-BG",
    "swe": "sv-SE",
    "lin": "ln-CD",
    "som": "so-SO",
    "hms": "zh-CN",
    "hnj": "vi-VN",
    "ilo": "ilo-PH",
    "kaz": "kk-KZ"
}




async function splitByLanguage(text: string): Promise<[{ lang: string, sentence: string }]> {
    const textNodes: TxtParentNodeWithSentenceNodeContent[] = split(text)
    let sentences: string[] = []
    textNodes.forEach((s, i) => {
        if (s.type == "Sentence") {
            if ((s.raw as string).indexOf("\"") != -1) {
                const ss: string[] = (s.raw as string).split("\"")
                ss.forEach(se => {
                    sentences.push(se)
                });
            } else {
                let lb = s.raw.split("\n")
                for (const element of lb) {
                    let paren = element.split("(")
                    for (const element2 of paren) {
                        let paren2 = element2.split(")")
                        for (const p3 of paren2) {
                            sentences.push(p3)
                        }
                    }
                }
            }
        }
    })
    let langDetect = null;
    if (chrome !== undefined && chrome !== null && chrome.i18n !== null && chrome.i18n !== undefined && chrome.i18n.detectLanguage !== undefined && chrome.i18n.detectLanguage !== null) {
        langDetect = chrome.i18n.detectLanguage
    } else if (browser !== undefined && browser !== null && browser.i18n !== null && browser.i18n !== undefined && browser.i18n.detectLanguage !== undefined && browser.i18n.detectLanguage !== null) {
        langDetect = browser.i18n.detectLanguage
    }
    let config: Options = { ignore: ["und", "som", "tur"] };
    if (langDetect !== null) {
        let lngs: string[] = []
        let res = await langDetect(text)
        const francRes1 = franc(text.substring(0, text.length / 2))
        const francRes2 = franc(text.substring(text.length / 2 + 1, text.length - 1))
        res.languages.forEach((lng) => {
            lngs.push(crxToFranc[lng.language])
        })
        lngs.push(francRes1)
        lngs.push(francRes2)
        config.only = Array.from(new Set(lngs))
        console.log(config.only)
    }
    let speechObj: [{ lang: string, sentence: string }] = [{ lang: "", sentence: "" }]
    for (const s of sentences) {
        let lang = franc(s, config)
        if (lang == "und") {
            lang = config.only[0]
        }
        speechObj.push({ lang: francToCrx[lang], sentence: s })
    }
    speechObj.shift()
    console.log(speechObj)
    return speechObj
}

export async function getUtterances(text): Promise<[SpeechSynthesisUtterance]> {
    let classifiedStrings = await splitByLanguage(text)
    let utterances: [SpeechSynthesisUtterance] = [new SpeechSynthesisUtterance(classifiedStrings[0].sentence)];
    utterances[0].lang = classifiedStrings[0].lang
    classifiedStrings.shift()
    classifiedStrings.forEach(({ lang, sentence }) => {
        const utterance = new SpeechSynthesisUtterance(sentence)
        utterance.lang = lang.split("-")[0]
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.filter(voice => voice.lang == lang)[0];

        utterances.push(utterance)
    })
    return utterances
}