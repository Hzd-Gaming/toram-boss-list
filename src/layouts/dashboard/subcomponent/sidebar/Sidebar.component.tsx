import { useCallback, useMemo } from 'react';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import {
  Button,
  Collapse,
  CollapseProps,
  Drawer,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Switch,
} from 'antd';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  categoryOptions,
  searchCategoryOptions,
  sortByNameOptions,
} from '@/constants/common';
import { kColorDanger, kColorPrimary } from '@/constants/theme';
import { useComponentStore } from '@/stores/common';
import {
  generateUrlWithParams,
  paramParsify,
  paramStringify,
} from '@/utils/url.util';

import { CTLayputDashboardSidebarProps } from './Sidebar.types';

import './Sidebar.style.scss';

// MM/DD/YYYY
const lastUpdateInfo = '04/06/2025';

const CTLayoutDashboardSidebar: React.FC<CTLayputDashboardSidebarProps> = (
  props
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const parsed = useMemo(() => paramParsify(location?.search), [location]);
  const {
    isDarkMode,
    isSidebarOpen,
    sidebarType,
    updateIsSidebarOpen,
    updateIsDarkMode,
  } = useComponentStore((state) => state);

  const handleSortByName = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      const stringified = paramStringify({
        ...parsed,
        sort: value,
      });
      navigate(generateUrlWithParams(location?.pathname, stringified), {
        state: location?.state,
      });
    },
    [location?.pathname, location?.state, navigate, parsed]
  );

  const handleOnSelectCategory = useCallback(
    (value: string) => {
      const stringified = paramStringify({
        ...parsed,
        category: value,
      });
      navigate(generateUrlWithParams(location?.pathname, stringified), {
        state: location?.state,
      });
    },
    [location?.pathname, location?.state, navigate, parsed]
  );

  const handleOnSelectSearchCategory = useCallback(
    (value: string) => {
      const stringified = paramStringify({
        ...parsed,
        search_by: value,
      });
      navigate(generateUrlWithParams(location?.pathname, stringified), {
        state: location?.state,
      });
    },
    [location?.pathname, location?.state, navigate, parsed]
  );
  const handleOnClickClearAll = useCallback(() => {
    const stringified = paramStringify({
      search: parsed?.search,
    });
    navigate(generateUrlWithParams(location?.pathname, stringified), {
      state: location?.state,
    });
  }, [location?.pathname, location?.state, navigate, parsed]);

  const handleSwitchDarkMode = useCallback(() => {
    updateIsDarkMode(!isDarkMode);
  }, [isDarkMode, updateIsDarkMode]);

  const sidebarContent = useMemo(() => {
    switch (sidebarType) {
      case 'filter':
        return (
          <>
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* Sort */}
              <h3>Sort By Name</h3>
              <Radio.Group
                onChange={handleSortByName}
                block
                options={sortByNameOptions}
                optionType="button"
                buttonStyle="solid"
                style={{ width: '100%' }}
                value={parsed?.sort}
              />
            </Space>

            {/* Filter */}
            <h3 className="mt--4 mb--2">Filter By:</h3>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h4>Category</h4>
              <Select
                placeholder="Select Category"
                options={categoryOptions}
                style={{ width: '100%' }}
                onChange={handleOnSelectCategory}
                value={(parsed?.category || 'all') as string}
                popupClassName={cx(
                  'ct_layout_dashboard__sidebar__select_popup',
                  isDarkMode &&
                    'ct_layout_dashboard__sidebar__select_popup--dark'
                )}
              />
            </Space>

            {/* Search Category */}
            <h3 className="mt--4 mb--2">Search By:</h3>
            <Space direction="vertical" style={{ width: '100%' }}>
              <h4>Category</h4>
              <Select
                placeholder="Select Category"
                options={searchCategoryOptions}
                style={{ width: '100%' }}
                onChange={handleOnSelectSearchCategory}
                value={(parsed?.search_by || 'name') as string}
                popupClassName={cx(
                  'ct_layout_dashboard__sidebar__select_popup',
                  isDarkMode &&
                    'ct_layout_dashboard__sidebar__select_popup--dark'
                )}
              />
            </Space>
          </>
        );
      case 'info': {
        const items: CollapseProps['items'] = [
          {
            key: 'd',
            label: 'D',
            children: <p>{'Debuff'}</p>,
          },
          {
            key: 'fts',
            label: 'FTS',
            children: <p>{'Flinch / Tumble / Stun'}</p>,
          },
          {
            key: 'ftsd',
            label: 'FTSD',
            children: <p>{'Flinch / Tumble / Stun / Debuff'}</p>,
          },
          {
            key: '1',
            label: 'PRES',
            children: <p>Physical Resistance (value in percentage)</p>,
          },
          {
            key: '2',
            label: 'MRES',
            children: <p>Magic Resistance (value in percentage)</p>,
          },
          {
            key: '3',
            label: 'NPROR',
            children: (
              <p>
                Normal Proration / Auto Attack Proration (value in percentage)
              </p>
            ),
          },
          {
            key: '4',
            label: 'PPROR',
            children: <p>Physical Skill Proration (value in percentage)</p>,
          },
          {
            key: '5',
            label: 'MPROR',
            children: <p>Magic Skill Proration (value in percentage)</p>,
          },
          {
            key: '6',
            label: 'CRES',
            children: <p>Critical Resistance (value in flat number)</p>,
          },
          {
            key: '7',
            label: 'PH',
            children: <p>Phase of Boss</p>,
          },
          {
            key: '8',
            label: 'LHP',
            children: <p>Low HP</p>,
          },
          {
            key: '9',
            label: 'Last Info Update',
            children: (
              <p>{String(dayjs(lastUpdateInfo).format('DD MMMM YYYY'))}</p>
            ),
          },
          {
            key: 'support',
            label: 'Support Me',
            children: (
              <>
                <div
                  className="mb--2"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  Visit my repo github:{' '}
                  <a
                    href="https://github.com/Hzd-Gaming/toram-boss-list"
                    target="_blank"
                    style={{ color: kColorPrimary.main }}>
                    Click here
                  </a>
                  <br />(
                  <span style={{ color: kColorDanger.main }}>
                    this action requires <b>internet connection</b> and{' '}
                    <b>github account</b>
                  </span>
                  ), go to tab <b>Issues</b>, and then you can open discussion
                  with me regarding any feedbacks or data fixing by clicking{' '}
                  <b>New Issue</b> button there.
                </div>
                <div
                  className="mb--2"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                  If you have already known me in <b>Discord</b>, you can just
                  DM me for feedbacks.
                </div>
                <span>Your support will be really appreciated ^^/</span>
              </>
            ),
          },
          {
            key: 'credits',
            label: 'Credits',
            children: (
              <>
                <p>Credits to:</p>
                <b>Arewzo, mayam, TheXIIIthGuy, Shirohebi (白蛇)</b>
                <p className="mt--2">Developed by:</p>
                <b>Hzd</b>
              </>
            ),
          },
          {
            key: 'copyright',
            label: 'Copyright',
            children: (
              <>
                <p className="mb--2">
                  This website is not affiliated with or endorsed by Asobimo.
                </p>
                <p>
                  Toram Online is{' '}
                  <a href="https://id.toram.jp/" target="_blank">
                    © Toram Online - ASOBIMO, INC
                  </a>
                </p>
                <p>All Rights Reserved.</p>
              </>
            ),
          },
        ];
        return <Collapse items={items} />;
      }
      default:
        return <></>;
    }
  }, [
    handleOnSelectCategory,
    handleOnSelectSearchCategory,
    handleSortByName,
    isDarkMode,
    parsed,
    sidebarType,
  ]);
  return (
    <Drawer
      className={cx(
        'ct_layout_dashboard__sidebar',
        isDarkMode && 'ct_layout_dashboard__sidebar--dark'
      )}
      title={
        <Row justify="space-between" align="middle">
          <h2>{sidebarType === 'filter' ? 'Filter & Sort' : 'Information'}</h2>
          {sidebarType === 'filter' ? (
            <Button type="primary" danger onClick={handleOnClickClearAll}>
              Clear All
            </Button>
          ) : (
            <Switch
              className="ml--2"
              onChange={handleSwitchDarkMode}
              defaultChecked={isDarkMode}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          )}
        </Row>
      }
      open={isSidebarOpen}
      placement={sidebarType === 'filter' ? 'left' : 'right'}
      onClose={() => updateIsSidebarOpen(false)}
      {...props}>
      {sidebarContent}
    </Drawer>
  );
};

export default CTLayoutDashboardSidebar;
