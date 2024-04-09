import fs from "fs"
import path from "path"

const audioPath = path.resolve("public", "a")

export const cleanVoices = () => {
    if (fs.existsSync(audioPath)) {
        fs.rmSync(audioPath, { force: true, recursive: true })
    }
}
