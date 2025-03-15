import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './Components/Context/StoreContext.jsx'
import ReactGA from 'react-ga4';


ReactGA.initialize("G-CS59VFXQXY");
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
    <App />
    </StoreProvider>
  </StrictMode>,
)
