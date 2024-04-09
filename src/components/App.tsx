import { useImmer } from "use-immer"
import { useEffect, useRef, useState } from "react"
import { saveAs } from "file-saver"

import { innerVoices } from "../lib/voice"

const langs = Array.from(
    new Set(innerVoices.map((v) => v.replace(/(\-[a-zA-Z]+)$/, "")))
)

const App = () => {
    // TODO 考虑支持 rate 等
    // https://github.com/rany2/edge-tts?tab=readme-ov-file#changing-rate-volume-and-pitch
    const [formData, setFormData] = useImmer({
        text: "",
        voice: "",
    })

    const [voices, setVoices] = useState<string[]>([])
    const [audioUrl, setAudioUrl] = useState<string>("")

    const audioRef = useRef<HTMLAudioElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!!formData.text && !!formData.voice) {
            fetch(`/tts?text=${formData.text}&voice=${formData.voice}`)
                .then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            setAudioUrl(data.url)
                        })
                    } else {
                        res.json().then((data) => {
                            alert(data.error)
                        })
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        } else {
            alert("Please input text and choose voice")
        }
    }

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData((draft) => {
            draft.text = event.target.value
        })
    }

    const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((draft) => {
            draft.voice = event.target.value
        })
    }

    const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value
        const voices = innerVoices.filter((v) => v.startsWith(lang))
        setVoices(voices)
        setFormData((draft) => {
            draft.voice = voices[0]
        })
    }

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

    const handleSave = () => {
        try {
            const filename = `${formData.text.slice(0, 5)}_${
                formData.voice
            }_${audioUrl.split("/").pop()}`
            saveAs(audioUrl, filename)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        setAudioUrl("")
    }, [formData])

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-indigo-950">
            <header className="w-full h-16 flex justify-center items-center bg-white/10 text-white">
                Edge TTS Server
            </header>
            <main className="flex-1 mt-10 w-full flex flex-col justify-start items-center">
                <form
                    className="flex flex-col justify-center items-center w-2/3"
                    onSubmit={handleSubmit}
                >
                    <textarea
                        id="text"
                        className="border rounded-lg p-5 w-full h-96 resize-none"
                        placeholder="Input text here"
                        onChange={handleTextChange}
                        required
                    ></textarea>
                    <div className="mt-3 w-full flex flex-row justify-center items-start">
                        <select
                            className="p-3 bg-indigo-600 text-white w-full rounded-lg"
                            title="Select language"
                            id="language"
                            onChange={handleLangChange}
                            required
                        >
                            {langs.map((l) => (
                                <option key={l} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>
                        {voices.length > 0 && (
                            <select
                                className="ml-5 p-3 bg-indigo-600 text-white w-full rounded-lg"
                                title="Select voice"
                                id="voice"
                                onChange={handleVoiceChange}
                                required
                            >
                                {voices.map((voice) => (
                                    <option key={voice} value={voice}>
                                        {voice}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="mt-3 w-full grid grid-cols-3 gap-2">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white w-full p-3 rounded-lg"
                            title="get voice"
                        >
                            <span
                                className="icon-[mdi--widget-bubble]"
                                style={{ width: "2rem", height: "1.5rem" }}
                            ></span>
                        </button>
                        <button
                            className="bg-indigo-600 text-white w-full p-3 rounded-lg disabled:bg-indigo-600/20"
                            onClick={handlePlay}
                            disabled={!audioUrl}
                            type="button"
                            title="play"
                        >
                            <span
                                className="icon-[mdi--speak]"
                                style={{ width: "2rem", height: "1.5rem" }}
                            ></span>
                        </button>
                        <button
                            className="bg-indigo-600 text-white w-full p-3 rounded-lg disabled:bg-indigo-600/20"
                            onClick={handleSave}
                            disabled={!audioUrl}
                            type="button"
                            title="save"
                        >
                            <span
                                className="icon-[mdi--tray-download]"
                                style={{ width: "2rem", height: "1.5rem" }}
                            ></span>
                        </button>
                    </div>
                </form>
                <audio
                    src={audioUrl}
                    autoPlay={false}
                    className="hidden"
                    ref={audioRef}
                ></audio>
            </main>
            <footer className="text-white p-5 flex flex-row flex-wrap justify-center items-center">
                <span className="text-center">
                    Open source under GPL-3.0 license &copy; Herbert He
                </span>
                <a
                    className="ml-3"
                    title="github"
                    href="https://github.com/HerbertHe/edge-tts-server"
                >
                    <span
                        className="icon-[mdi--github]"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                    ></span>
                </a>
            </footer>
        </div>
    )
}

export default App
