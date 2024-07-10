import express from 'express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 5001




app.listen(port, () => {
  console.log(`Server is up and running on ${port}`)
})
