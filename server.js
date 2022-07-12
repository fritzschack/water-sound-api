import express from "express"
import morgan from "morgan"
import cors from "cors"
import routes from "./routes/index.router.js"
import fileUpload from "express-fileupload"

const server = express()

// Configure server plugins
server.use(fileUpload({ createParentPath: true }))
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev", {}))

// Introduce API routes
server.use("/api/v1", routes)

export default server