import fs from "fs"
import path from "path"

const publicPath = path.resolve("public")

export const cleanPublic = () => {
    fs.rmdirSync(publicPath, { recursive: true })
}
