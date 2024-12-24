import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Make sure this is the correct path to your Redux store
import App from './App.jsx';
import { Toaster } from "./components/ui/toaster";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster/>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);


