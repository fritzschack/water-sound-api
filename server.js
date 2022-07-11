import express from "express"
import morgan from "morgan"
import routes from "./routes/index.js"

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev", {}))

server.use("/api/v1", routes)

export default server