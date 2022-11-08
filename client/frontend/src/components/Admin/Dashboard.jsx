import React, {useContext} from 'react'
import AuthAdminContext from '../../context/AdminAuthContext'
import Header from './Header'

function Dashboard() {
    // let {admin} = useContext(AuthAdminContext)
  return (
    <div>
        <Header></Header>
        
        <div className="bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 ">
        <div className="">
          <div className="   p-3 m-autorounded-md  mb-3 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Over View
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md">
          <div>
            <div className="bg-gray-100  rounded-md">
              <div className="  grid justify-items-center rounded-md  sm:grid-cols-2">
                <div className="box-border items-center h-64 w-64 p-4 border-4 bg-red-500 mx-6 my-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard