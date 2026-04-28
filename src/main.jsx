import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextApi from './ContextApi/ContextApi.jsx'

import AuthContextApi from './ContextApi/AuthContextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId='97853990103-13iqsap34adl8b2cceqvph9l2mbqdg4v.apps.googleusercontent.com'>
    <ContextApi>
      <AuthContextApi>
    <App />
    </AuthContextApi>
    </ContextApi>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
