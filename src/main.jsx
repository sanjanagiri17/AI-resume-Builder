import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'

import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Home from './Home'
import EditResume from './dashboard/resume/[resumeid]/edit/index.jsx'
import './index.css'; 
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import TemplatesPage from './pages/Templates.jsx'; 



// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}





const router=createBrowserRouter([
  {
    element:<App/>,
    children:[
      
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeid/edit',
        element:<EditResume/>

      },
      {
        path:'/templates',
        element:<TemplatesPage/>
      }
    ]
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage/>
  },
  {
    path:'my-resume/:resumeId/view',
    element:<ViewResume/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
