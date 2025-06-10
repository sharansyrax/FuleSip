import foodModel from "../models/foodModel.js"
import fs from "fs"
const addFood = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No image file uploaded" })
  }
  let image_filename = `${req.file.filename}`
  //   console.log("Request Body:", req.body)
  //   console.log("Request File:", req.file)

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  })
  console.log(typeof price)
  try {
    await food.save()
    res.json({ success: true, message: "Food Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "error" })
  }
}
//list foods

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({})
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "error" })
  }
}

//remove fooditem

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`, () => {})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "food Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "error" })
  }
}

export { addFood, listFood, removeFood }
