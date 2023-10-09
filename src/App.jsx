import CustomBrowserRouter from "./routes/BrowserRouter"
import CartContextProvider from "./context/CartContext"
import './App.css'

function App() {

  return (
    <>
      <CartContextProvider>

        <CustomBrowserRouter>
        </CustomBrowserRouter>

      </CartContextProvider>
    </>
  )

}

export default App
