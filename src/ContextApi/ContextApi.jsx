import React, { useState } from 'react'
import { createContext } from 'react'

export const searchContext=createContext()
export const profileContext=createContext()
export const careerContext=createContext()
export const adminContext=createContext()
function ContextApi({children}) {
     const [globalSearchKey,setGlobalSearchKey]=useState("")
     const [profileStatus,setProfileStatus]=useState([])
     const [addCareerStatus,setAddCareerStatus]=useState("")
     const[adminProfileStatus,setAdminProfileStatus]=useState("")
  return (
    <>
      <searchContext.Provider value={{globalSearchKey,setGlobalSearchKey}}>
        <profileContext.Provider value={{profileStatus,setProfileStatus}}>
          <careerContext.Provider value={{addCareerStatus,setAddCareerStatus}}>
            <adminContext.Provider value={{adminProfileStatus,setAdminProfileStatus}}>
            {children}
            </adminContext.Provider>
          </careerContext.Provider>
        </profileContext.Provider>
      </searchContext.Provider>
    </>
  )
}

export default ContextApi