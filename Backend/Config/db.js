import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sharan:Sharan160702@cluster0.4pvya2m.mongodb.net/fuelsip"
    )
    .then(() => console.log("db is connected"))
}
