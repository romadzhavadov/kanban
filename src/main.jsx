import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Redux/store.js'
import { Provider } from 'react-redux'
import { Provider as ChakraProvider } from './components/ui/provider.jsx';


createRoot(document.getElementById('root')).render(
  < ChakraProvider>
    < Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
)
