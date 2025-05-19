import ReactDOM from 'react-dom/client';
import { ConfigProvider, notification } from 'antd';
import enUS from 'antd/locale/en_US';

import App from '~/app';

notification.config({
  bottom: 0,
  duration: 2,
  showProgress: true,
  placement: 'bottomRight',
  maxCount: 3,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    theme={{
      cssVar: true,
      hashed: false,
      token: { fontFamily: '"Fira Code", monospace', colorPrimary: '#00ae42' },
    }}
    locale={enUS}
  >
    <App />
  </ConfigProvider>,
);
