import Register from "./View/Register/Register";
import ProtectedRoouter from "./Components/ProtectedRouter/ProtectedRoouter";
import Home from "./View/Home/Home";
import Profile from "./View/Profile/Profile";
import NavBar from "./Components/NavBar/NavBar";
import SideBar from "./Components/SideBar/SideBar";
import {Routes, Route} from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CreatePost from "./View/CreatePost/CreatePost";
import About from "./View/About/About";
axios.defaults.baseURL="http://localhost:3001";

function App() {
  const { auth } = useSelector(state => state.auth);
  const {pathname} = useLocation()
  const nav = pathname === "/";
  const Side = pathname === "/register";

  return (
    <>    
        {nav || Side ? null : <NavBar/>}
        {Side || nav ? null : <SideBar/>}
      <Routes>
        <Route index element={<Register/>}/>
        <Route path="/register" element={<Register/>}/>

        {/*El protRou se utiliza para comprobar múltiples componentes(aveces); contiene un outlet que, si es verdadero (true), ejecuta dos rutas dentro del Route.*/}
        <Route element={<ProtectedRoouter isAllowed={auth} redirectTo={"/register"}/>}>{/*El operador !! es si es false da false y si es true da true*/} 
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/createPost" element={<CreatePost/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>  

        <Route path="/home/dashboard" element={
        <ProtectedRoouter isAllowed={!!auth && auth.role ==="admin"} redirectTo={"/home"}> 
          {/* Componente */}
        </ProtectedRoouter>}/>

        <Route path="/home/estadistics" element={
          <ProtectedRoouter isAllowed={!!auth && auth.role === "analize"} redirectTo={"/home"}>
          {/* Componente */}
          </ProtectedRoouter>
        }/>

        <Route path='*' element={null}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
