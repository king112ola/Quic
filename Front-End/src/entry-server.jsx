import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import ReduxProviderWrapper from './ReduxProviderWrapper'

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
        <ReduxProviderWrapper />
    </StaticRouter>
  )
}
