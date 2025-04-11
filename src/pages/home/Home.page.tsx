import { useMemo } from 'react';

import { Col, Row } from 'antd';
import { orderBy } from 'lodash';
import { useLocation } from 'react-router-dom';

import { allList } from '@/database';
import { CTLayoutDashboard } from '@/layouts';
import { useComponentStore } from '@/stores/common';
import { paramParsify } from '@/utils/url.util';

import './Home.style.scss';
import { ListCard } from './components';
import { kHomePageMeta } from './Home.constant';
import { ListCategory, ListSortOrd } from './Home.type';

const HomePage: React.FC = () => {
  const location = useLocation();
  const parsed = paramParsify(location?.search);

  const { isDarkMode } = useComponentStore((state) => state);

  const filteredData = useMemo(() => {
    // handle filter by category
    let result = [
      ...(allList?.[(parsed?.category || 'all') as ListCategory] || []),
    ];

    // handle sort by name
    if (parsed?.sort) {
      result = orderBy(
        result,
        ['name'],
        [(parsed?.sort || 'asc') as ListSortOrd]
      );
    }

    // handle filter by search
    const searchByKey = (parsed?.search_by || 'name') as 'name' | 'loc';
    result = result?.filter((el) =>
      el?.[searchByKey]
        ?.toLowerCase()
        ?.includes(String(parsed?.search || '').toLowerCase() as string)
    );

    return result;
  }, [parsed]);
  return (
    <CTLayoutDashboard meta={kHomePageMeta}>
      <Row gutter={[16, 24]}>
        {filteredData?.map((el, idx) => (
          <Col
            key={`${el?.category}-${el?.name}-${idx}`}
            xs={24}
            sm={12}
            lg={8}
            xxl={6}>
            <ListCard
              id={`${el?.category}-${el?.name}-${idx}`}
              data={el}
              isDarkMode={isDarkMode}
            />
          </Col>
        ))}
      </Row>
    </CTLayoutDashboard>
  );
};

export default HomePage;
