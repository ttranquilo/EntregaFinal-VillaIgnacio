import CustomBrowserRouter from "./routes/BrowserRouter"
import CartContextProvider from "./context/CartContext"
import './App.css'
import AuthContextProvider from "./context/AuthContext"

function App() {

  return (
    <>
    {/* Auth/login context provider for placing orders */}
      <AuthContextProvider>
        {/* Cart context provider for performing cart operations (add, remove, pay, etc) */}
        <CartContextProvider>
          {/* Browser router for using URLs*/}
          <CustomBrowserRouter>
          </CustomBrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  )

}

export default App
