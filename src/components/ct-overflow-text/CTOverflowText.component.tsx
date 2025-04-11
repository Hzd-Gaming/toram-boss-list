import { useMemo } from 'react';

import { Tooltip } from 'antd';
import cx from 'classnames';

import { formatEllipsis } from '@/utils/string.utils';

import { CTOverflowTextProps } from './CTOverflowText.type';

import './CTOverflowTwxt.style.scss';

const CTOverflowText: React.FC<CTOverflowTextProps> = ({
  id,
  text,
  maxChar = 30,
  textClassName,
}) => {
  const trimmedText = useMemo(
    () => formatEllipsis(text, maxChar),
    [text, maxChar]
  );
  const showTootlip = useMemo(() => {
    const ellipsisChar = trimmedText?.substring(
      trimmedText?.length >= 3 ? trimmedText?.length - 3 : 0,
      trimmedText?.length
    );
    const isEllipsis = text?.length > maxChar && ellipsisChar === '...';
    return isEllipsis;
  }, [maxChar, text, trimmedText]);

  if (!showTootlip) {
    return (
      <p id={id} className={cx('ct_overflow_text', textClassName)}>
        {trimmedText}
      </p>
    );
  }

  return (
    <Tooltip title={text} trigger={['click']}>
      <p id={id} className={cx('ct_overflow_text', textClassName)}>
        {trimmedText}
      </p>
    </Tooltip>
  );
};

export default CTOverflowText;
