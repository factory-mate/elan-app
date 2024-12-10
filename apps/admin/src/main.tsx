import '@/assets/styles/main.scss'
import '@/shared/ag-grid'

import { enableMapSet, setAutoFreeze } from 'immer'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/apps'

enableMapSet()
setAutoFreeze(false)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
