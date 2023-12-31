import React, { createContext, useState } from 'react'


export const addprojectContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({children}) {
    const [addprojectResponse,setaddprojectResponse] = useState({})

    const [editprojectResponse,seteditprojectResponse] = useState({})

    const [isAuthToken,setisAuthToken] = useState(true)

  return (
    <>
         <addprojectContext.Provider value={{addprojectResponse,setaddprojectResponse}}>
          <editProjectResponseContext.Provider value={{editprojectResponse,seteditprojectResponse}}>
           <isAuthTokenContext.Provider value={{isAuthToken,setisAuthToken}}> 

           {children}
           
           </isAuthTokenContext.Provider>
            </editProjectResponseContext.Provider>
         </addprojectContext.Provider>

    </>
  )
}

export default ContextShare