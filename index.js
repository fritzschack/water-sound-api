import server from "./server.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

// Connect to database
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database.")
)

const port = process.env.PORT || 5000

// Start server on specified port
server.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})