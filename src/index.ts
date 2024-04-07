import Koa from "koa"
import Static from "koa-static"

const app = new Koa()

app.use(Static("public"))

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})
