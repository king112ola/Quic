import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ReduxProviderWrapper from './ReduxProviderWrapper'

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
      <ReduxProviderWrapper />
  </BrowserRouter>
)

