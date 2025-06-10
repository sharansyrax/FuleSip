import { useState, createContext, useEffect } from "react"
// import { food_list } from "../assets/frontend_assets/assets"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartitems, setCartItems] = useState({})
  const url = "https://fulesip-backend.onrender.com"
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])

  const addToCart = async (itemId) => {
    console.log(itemId)
    console.log(cartitems[itemId])
    if (!cartitems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    // Sync with backend if token is present
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        )
      } catch (err) {
        console.error("Failed to sync cart with server:", err)
      }
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      )
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item)
        if (iteminfo) {
          totalAmount += iteminfo.price * cartitems[item]
        }
      }
    }
    return totalAmount
  }

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list")
      setFoodList(response.data.data)
    } catch (error) {
      console.error("Error fetching food list:", error)
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    )
    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList()
      const savedToken = localStorage.getItem("token")
      if (savedToken) {
        setToken(savedToken)
        await loadCartData(savedToken)
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list,
    cartitems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
