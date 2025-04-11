import { CardProps } from 'antd';

import type { Boss, Miniboss } from '@/database';

export type ListCardPropsData = Boss & Miniboss;
export interface ListCardProps extends CardProps {
  id: string;
  data: ListCardPropsData;
  isDarkMode: boolean;
}
