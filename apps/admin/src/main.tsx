import '@/assets/styles/main.scss'
import '@/shared/ag-grid'

import { enableMapSet } from 'immer'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/apps'

enableMapSet()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
