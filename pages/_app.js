import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../styles/globals.css'
import UserProvider from '../context/provider';
import Layout from '../compenent/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </UserProvider>
  );
}

export default MyApp
