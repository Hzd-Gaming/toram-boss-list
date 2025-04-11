import { ButtonProps, LayoutProps } from 'antd';

import { CTSeoMetaProps } from '@/components';

export interface CTLayoutDashboardProps extends LayoutProps, CTSeoMetaProps {
  /**
   * Properties for action buttons on the right page besides the title page.
   */
  actionButtonProps?: ButtonProps[];
  /**
   * Properties for base inner content layout. Usually for changing padding, marging or even background color
   * through className or inline style.
   */
  contentProps?: React.HTMLAttributes<HTMLElement>;
  /**
   * Title for your page. The title is customizable by using React Node or simply using a string.
   *
   * @example
   * <CTLayoutDashboard titlePage={<div><p>Welcome back,</p><h1>Custom Admin</h1></div>}>
   *   // .. children
   * </CTLayoutDashboard>
   */
  titlePage?: string | React.ReactNode;
}
