import { Button, Layout } from 'antd';
import cx from 'classnames';

import { CTSeoMeta } from '@/components';
import { useComponentStore } from '@/stores/common';

import { CTLayoutDashboardProps } from './CTLayoutDashboard.type';
import {
  CTLayoutDashboardHeader,
  CTLayoutDashboardSidebar,
} from './subcomponent';

import '@/styles/scss/utils/_margin.scss';
import './CTLayoutDashboard.style.scss';

const CTLayoutDashboardComponent: React.FC<CTLayoutDashboardProps> = ({
  actionButtonProps,
  children,
  className,
  contentProps,
  meta,
  ...rest
}) => {
  const { isDarkMode } = useComponentStore((state) => state);

  return (
    <Layout className={cx('ct_layout_dashboard', className)} {...rest}>
      <CTSeoMeta meta={meta} />

      <CTLayoutDashboardHeader />
      <CTLayoutDashboardSidebar />
      <Layout>
        <Layout className={cx('ct_layout_dashboard__inner')}>
          <Layout.Content
            className={cx(
              'ct_layout_dashboard__content',
              isDarkMode && 'ct_layout_dashboard__content--dark',
              contentProps?.className
            )}
            {...contentProps}>
            <div className="ct_layout_dashboard__content__header">
              {Array.isArray(actionButtonProps) &&
                actionButtonProps?.length > 0 && (
                  <>
                    <span style={{ flex: 'auto' }} />
                    {actionButtonProps?.map((prop, idx) => (
                      <Button
                        key={idx}
                        className={cx(
                          'ct_layout_dashboard__content__header__button',
                          prop?.className,
                          idx < actionButtonProps?.length - 1 && 'mr--2'
                        )}
                        style={{
                          maxWidth: !prop?.block ? 120 : '',
                          ...prop?.style,
                        }}
                        type={prop?.type || 'primary'}
                        {...prop}>
                        {prop?.children}
                      </Button>
                    ))}
                  </>
                )}
            </div>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CTLayoutDashboardComponent;
