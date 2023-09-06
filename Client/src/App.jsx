import {Routes, Route} from "react-router-dom"
import './App.css'
import Register from "./View/Register/Register"

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='*' element={null}/>
      </Routes>
    </div>
  )
}

export default App
