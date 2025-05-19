import '@fontsource/fira-code';
import '~/styles/globals.css';
import '~/styles/antd.css';

import { Devices } from '~/components/devices';
import { Header } from '~/components/header';
import { EditModal } from '~/components/modal';

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
