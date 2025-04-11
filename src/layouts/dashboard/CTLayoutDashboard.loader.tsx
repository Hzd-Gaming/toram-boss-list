import { Layout, Skeleton } from 'antd';
import cx from 'classnames';

import '@/styles/scss/utils/_padding.scss';

import { useComponentStore } from '@/stores/common';

import './CTLayoutDashboard.style.scss';
import './subcomponent/header/Header.style.scss';

const { Content, Header } = Layout;

const CTLayoutDashboardLoader: React.FC = () => {
  const isDarkMode = useComponentStore((state) => state.isDarkMode);

  return (
    <Layout
      className={cx(
        'ct_layout_dashboard',
        isDarkMode && 'ct_layout_dashboard--dark'
      )}>
      <Header
        className={cx(
          'ct_layout_dashboard__header',
          isDarkMode && 'ct_layout_dashboard__header--dark'
        )}>
        <Skeleton.Button
          rootClassName="ct_layout_dashboard__root_skeleton"
          style={{ width: 180 }}
        />

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
          <Skeleton.Avatar rootClassName="ct_layout_dashboard__root_skeleton" />
          <Skeleton.Button
            rootClassName="ct_layout_dashboard__root_skeleton"
            style={{ width: 120 }}
          />
        </div>
      </Header>

      <Layout>
        <Layout className="ct_layout_dashboard__inner">
          <Content
            className={cx(
              'ct_layout_dashboard__content',
              isDarkMode && 'ct_layout_dashboard__content--dark'
            )}>
            <Skeleton className="mb--6" />
            <Skeleton />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CTLayoutDashboardLoader;
