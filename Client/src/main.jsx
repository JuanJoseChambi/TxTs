import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider} from 'react-redux';
import "./Style/_global.scss"
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
