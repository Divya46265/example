import './index.css'
import { FaHome,FaBug,FaRegUser } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { AiOutlineStock } from "react-icons/ai";
import { CiSettings,CiCircleQuestion } from "react-icons/ci";

const Sidebar = () => {
    return(
        <div className = "sidebar-con">
            <div className = "logo-con">
                <img src = "" alt = "logo" className = "logo"/>
            </div>
            <hr className = "hr-line"/>
        <ul className = "list-con">
            <li className = "list-item"> <FaHome /> Home </li>
            <li className = "list-item"> <GoPeople/> Customers </li>
            <li className = "list-item selected"> <AiOutlineStock/> Cohort Analysis </li>
            <li className = "list-item"> <FaRegUser /> Account </li>
            <li className = "list-item"> <CiSettings/> Settings </li>
            <li className = "list-item"> <CiCircleQuestion/> About </li>
            <li className = "list-item"> <FaBug/> Report a Bug </li>
        </ul>
        </div>
    )
}

export default Sidebar