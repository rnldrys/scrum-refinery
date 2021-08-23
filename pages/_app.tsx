import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode} from 'react'
import wrapper from '../components/store'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from '../src/theme'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
    <ThemeProvider theme={theme}>
    { getLayout(<Component {...pageProps} />) }
    </ThemeProvider>
    </>
  )
  
}

export default wrapper.withRedux(MyApp)