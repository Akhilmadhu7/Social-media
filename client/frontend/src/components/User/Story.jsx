import React from 'react'

function Story() {
    const a = [1,2,3,4,5,6,7,7,8,9,9,9,9,9,9,9,9,0,0,0,0,0,0,0,0,0,0]
  return (
    <div className='mb-2 p-2 overflow-x-auto w-screen lg:w-full flex gap-5' >
{
    a.map((element)=>{

     return(
        <div className=' w-[3.5rem] h-[3.5rem] rounded-full bg-purple-600 inline-block '>
        <div className='w-[3.5rem] h-[3.5rem] rounded-full bg-white overflow-hidden border-2 border-purple-700 inline-block'>
        <img className='rounded-full p-[3px]'
                        src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                        alt='story'
                       
                        />  
        </div>
              </div>
     )
})
}
      
        {/*  */}
        {/* overflow-x-scroll whitespace-nowrap scroll-smooth */}

        {/* <div className='container'>
            <div className='story-container'>
                <div className='content'>
                    <div className='img-container'>
                        <img
                        src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
                        alt='story'
                        />  
                    </div>    
                </div>
            </div>
            <div className='text-container'>
                nandu
            </div>

        </div> */}
    </div>
  )
}

export default Story