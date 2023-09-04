import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {

  return (
    <>
      <Navbar brand="Improvised Store"> </Navbar>
      <ItemListContainer greeting = "greeting"></ItemListContainer>
      <Footer> </Footer>
    </>
  )
}

export default App
