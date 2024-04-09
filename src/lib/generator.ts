import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { innerVoices } from "./voice"

const publicPath = path.resolve("public")
const audioPath = path.join(publicPath, "a")

export const generateTTS = (text: string, voice: string) => {
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath)
    }

    if (!fs.existsSync(audioPath)) {
        fs.mkdirSync(audioPath)
    }

    const f_name = `${Date.now()}.mp3`

    if (!innerVoices.includes(voice)) {
        throw new Error("Invalid voice")
    }

    execSync(
        `edge-tts --voice ${voice} --text "${text}" --write-media ${path.join(
            audioPath,
            f_name
        )}`
    )

    return `/a/${f_name}`
}
