import { useState } from 'react'

import './App.css'
import  '../src/index.css'
import { Button } from "@/components/ui/button"
import { Outlet } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom'
import Header from './components/ui/custom/Header'
import { Toaster } from "@/components/ui/sonner"



function App() {
  const [count, setCount] = useState(0)
  const {user , isLoaded , isSignedIn}=useUser();

  if(!isSignedIn &&isLoaded){

    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <>  
    <Header/>
    <Outlet/>
    <Toaster />

    </>

  )
}




export default App
