import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

import App from '~/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={{ cssVar: true, hashed: false, token: { colorPrimary: '#00ae42' } }} locale={enUS}>
    <App />
  </ConfigProvider>,
);
