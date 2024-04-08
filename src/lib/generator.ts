import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { innerVoices } from "./voice"

const publicPath = path.resolve("public")

export const generateTTS = (text: string, voice: string) => {
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath)
    }

    const f_name = `${Date.now()}.mp3`

    if (!innerVoices.includes(voice)) {
        throw new Error("Invalid voice")
    }

    execSync(
        `edge-tts --voice ${voice} --text "${text}" --write-media ${path.join(
            publicPath,
            f_name
        )}`
    )

    return f_name
}
