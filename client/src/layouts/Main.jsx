import { Outlet } from 'react-router'
import Navber from '../components/Navber'
import Footer from '../components/Footer'
// import "./Main.css" 

const Main = () => {
  return (
    <div>
        <Navber/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Main