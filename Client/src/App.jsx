import {Routes, Route} from "react-router-dom"
import Register from "./View/Register/Register"
import ProtectedRoouter from "./Components/ProtectedRouter/ProtectedRoouter"
import Home from "./View/Home/Home"
import Profile from "./View/Profile/Profile"
import Dashboard from "./View/Dashboard/Dashboard"
import Estadisticts from "./View/Estadisticts/Estadisticts"
import axios from "axios"
axios.defaults.baseURL="http://localhost:3001";
import { useSelector } from "react-redux"
import { Toaster } from "sonner"
import NavBar from "./Components/NavBar/NavBar"
import SideBar from "./Components/SideBar/SideBar"
import { useLocation } from "react-router-dom"
function App() {
  const { auth } = useSelector(state => state.auth);
  const {pathname} = useLocation()
  const nav = pathname === "/";
  const Side = pathname === "/register";
  return (
    <div>
     
      
        {nav || Side ? null : <NavBar/>}
        {Side || nav ? null : <SideBar/>}
      <Routes>
        <Route index element={<Register/>}/>
        <Route path="/register" element={<Register/>}/>

        {/*El protRou se utiliza para comprobar múltiples componentes(aveces); contiene un outlet que, si es verdadero (true), ejecuta dos rutas dentro del Route.*/}
        <Route element={<ProtectedRoouter isAllowed={auth} redirectTo={"/register"}/>}>{/*El operador !! es si es false da false y si es true da true*/} 
          <Route path="/home" element={<Home/>}/>
          <Route path="/home/profile" element={<Profile/>}/>
        </Route>  

        <Route path="/home/dashboard" element={
        <ProtectedRoouter isAllowed={!!auth && auth.role ==="admin"} redirectTo={"/home"}> 
            <Dashboard/>
        </ProtectedRoouter>}/>

        <Route path="/home/estadistics" element={
          <ProtectedRoouter isAllowed={!!auth && auth.role === "analize"} redirectTo={"/home"}>
            <Estadisticts/>
          </ProtectedRoouter>
        }/>

        <Route path='*' element={null}/>

      </Routes>
      <Toaster/>
      <div>
    </div>
    </div>
  )
}

export default App
