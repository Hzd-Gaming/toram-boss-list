// TODO: Optimize the navigations

import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { antdTheme } from '@/configs/antd/antdTheme.config';
import { router } from '@/routes';

function App() {
  return (
    <HelmetProvider>
      <ConfigProvider theme={antdTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
