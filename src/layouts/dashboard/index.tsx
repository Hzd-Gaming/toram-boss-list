import { Suspense, lazy } from 'react';

import { CTErrorBoundary } from '@/components';

import CTLayoutDashboardLoader from './CTLayoutDashboard.loader';
import type { CTLayoutDashboardProps } from './CTLayoutDashboard.type';

const CTLayoutDashboardComponent = lazy(
  () => import('./CTLayoutDashboard.component')
);

const CTLayoutDashboard: React.FC<CTLayoutDashboardProps> = (props) => {
  return (
    <CTErrorBoundary>
      <Suspense fallback={<CTLayoutDashboardLoader />}>
        <CTLayoutDashboardComponent {...props} />
      </Suspense>
    </CTErrorBoundary>
  );
};

export { CTLayoutDashboard, CTLayoutDashboardProps, CTLayoutDashboardLoader };
