import type { RouteObject } from 'react-router-dom';

import { RouteEndpointsCommon } from '@/constants/route-endpoint';
import { Error404 } from '@/pages/error/404';
import { Home } from '@/pages/home';

const RouterCommon: RouteObject[] = [
  {
    path: RouteEndpointsCommon.HOME,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  { path: '*', element: <Error404 /> },
];

export default RouterCommon;
