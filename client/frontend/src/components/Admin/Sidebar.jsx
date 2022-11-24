import React, {useState, useEffect, useContext} from 'react'
import {BrowserRouter as Router, NavLink,Route,Routes} from 'react-router-dom'

import {FaTh, FaBars, FaUsers} from 'react-icons/fa'

// import './Styles/Sidebar.css'
import './Styles/Sidebar.css'

function Sidebar(children) {

    const [isOpen, setIsOpen] = useState(true)
    const toggle = ()=> setIsOpen(!isOpen)

    const menuItem = [
        {
            path:'/admin/dashboard',
            name:'Dashboard',
            icon:<FaTh/>
        },

        {
            path:'/admin/userlist',
            name:'Users',
            icon:<FaUsers/>
        },

        {
            path:'/admin/listpost',
            name:'Posts',
            icon:<FaUsers/>
        }
    ]
  return (
    <div className='flex '>
        <div style={{width: isOpen ? "250px" : "80px"}} className='side-bar bg-indigo-800 ' >
            <div className='top-section' >
                <div className="flex items-center mb-3">
                <h1 style={{display : isOpen ? "block" : 'none'}} className='logo'>Logo</h1>
                <div style={{marginLeft : isOpen ? "50px" : "0px"}} className='bars'>
                    <FaBars onClick={toggle}/>
                </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                      <NavLink to={item.path} key={index} className='link flex items-center mb-2' activeclassName='active' >
                        <div className='icon'>{item.icon}</div>
                        <div style={{display : isOpen ? "block" : 'none'}}  className='link-text'>{item.name}</div>
                      </NavLink>
                    ))
                }
                
               

            </div>
           

        </div>
      {/* <main className='main '>{children}</main> */}
      

    </div>
  )
}

export default Sidebar