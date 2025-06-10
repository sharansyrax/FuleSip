import express from "express"

import { connectDB } from "./Config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRouter.js"

import "dotenv/config"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoute.js"
import cors from "cors"

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware

app.use(express.json())
app.use(cors())

//db connection
connectDB()

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)

app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API working")
})

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://sharan:Sharan160702@cluster0.4pvya2m.mongodb.net/?
