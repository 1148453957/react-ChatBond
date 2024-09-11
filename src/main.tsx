import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import '@/assets/css/base.less'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { initTA } from '@/assets/js/TA'
import Cookies from 'js-cookie'

Cookies.set('language', navigator.language, {
  domain: import.meta.env.VITE_RUN_ENV == 'prod' ? '.chatbond.co' : '.aecoapps.com',
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
