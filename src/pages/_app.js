import '../../styles/globals.css'
import { wrapper } from '../core/redux';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
