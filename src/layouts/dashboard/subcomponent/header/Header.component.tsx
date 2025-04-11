import { useMemo, useRef } from 'react';

import { FilterTwoTone, QuestionCircleTwoTone } from '@ant-design/icons';
import { Layout, Space } from 'antd';
import cx from 'classnames';
import { capitalize } from 'lodash';
import { useLocation } from 'react-router-dom';

import './Header.style.scss';

import { CTDebouncedSearch } from '@/components';
import { kColorNeutral, kColorPrimary } from '@/constants/theme';
import { useComponentStore } from '@/stores/common';
import { paramParsify } from '@/utils/url.util';

const { Header } = Layout;

const CTLayoutDashboardHeader: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const parsed = useMemo(() => paramParsify(location?.search), [location]);
  const { isDarkMode, updateIsSidebarOpen, updateSidebarType } =
    useComponentStore((state) => state);

  return (
    <Header
      className={cx(
        'ct_layout_dashboard__header',
        isDarkMode && 'ct_layout_dashboard__header--dark'
      )}
      ref={headerRef}>
      <FilterTwoTone
        className="mr--2"
        style={{ fontSize: 18 }}
        twoToneColor={isDarkMode ? kColorPrimary[3] : kColorNeutral[5]}
        onClick={() => {
          updateSidebarType('filter');
          updateIsSidebarOpen(true);
        }}
      />
      <Space align="center">
        <CTDebouncedSearch
          placeholder={`Search by ${capitalize(
            (parsed?.search_by || 'name') as string
          )}`}
        />
      </Space>

      <QuestionCircleTwoTone
        className="ml--2"
        style={{ fontSize: 18 }}
        twoToneColor={isDarkMode ? kColorPrimary[3] : kColorPrimary[5]}
        onClick={() => {
          updateSidebarType('info');
          updateIsSidebarOpen(true);
        }}
      />
    </Header>
  );
};

export default CTLayoutDashboardHeader;
