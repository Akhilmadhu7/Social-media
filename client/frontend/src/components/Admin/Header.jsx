import React, {useContext} from 'react'
import AuthAdminContext from '../../context/AdminAuthContext'


function Header() {
    let {admin, logoutAdmin} = useContext(AuthAdminContext)
  return (
    <div>
      <nav className="bg-indigo-800 flex rounded-md mb-2 justify-between">
        <div className=" mx-6 my-4">
          <h1 className="text-white text-2xl font-semibold">SM Name </h1>
        </div>

        <div className="my-4 mx-6 flex">
          <div className="mx-5 text-white mt-auto">
            {<h3 className="font-bold">{admin && <p> {admin.username}</p>}</h3>}
          </div>

          <button
            onClick={logoutAdmin}
            className=" w-full px-2 py-1 tracking-wide bg-slate-200 font-medium transition-colors duration-200 transform bg-white-700 rounded-md hover:bg-violet-50 hover:text-red-600 focus:outline-none "
          >
            Logout
          </button>
        </div>
      </nav>
    </div>

//  <div>
// <nav className="bg-indigo-800  flex grid grid-cols-2  rounded-md mb-2 justify-between">
//   <div className=" mx-6 my-4">
//     <h1 className="text-white text-2xl font-semibold">SM Name </h1>
//   </div>

//   <div className="my-4 mx-6 grid grid-cols-2 ">
//     <div className="mx-5 text-white mt-auto">
//       {<h3 className="font-bold">{admin && <p> {admin.username}</p>}</h3>}
//     </div>
//     <div>
//       <button
//         onClick={logoutAdmin}
//         className=" w-full px-2 py-1 tracking-wide bg-slate-200 font-medium transition-colors duration-200 transform bg-white-700 rounded-md hover:bg-violet-50 hover:text-red-600 focus:outline-none "
//       >
//         Logout
//       </button>
//     </div>
//   </div>
// </nav> 
//   </div> 
  )
}

export default Header