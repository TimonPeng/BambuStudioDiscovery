import '~/styles/globals.css';
import '~/styles/antd.css';

import { notification } from 'antd';

import { Devices } from '~/components/devices';
import { Header } from '~/components/header';
import { EditModal } from '~/components/modal';

notification.config({
  bottom: 0,
  duration: 2,
  showProgress: true,
  placement: 'bottomRight',
  maxCount: 3,
});

function App() {
  return (
    <div className='mx-auto flex flex-col gap-4 p-4'>
      <Header />

      <EditModal />

      <Devices />
    </div>
  );
}

export default App;
