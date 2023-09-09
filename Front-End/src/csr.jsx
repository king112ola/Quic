import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ReduxProviderWrapper from './ReduxProviderWrapper'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ReduxProviderWrapper />
  </BrowserRouter>
)

