import { isNil } from 'lodash';

export const thousandFormat: (
  num: number | string | null | undefined,
  decimalPlaces?: number
) => string = (num, decimalPlaces = 0) => {
  if (isNil(num)) return '???';

  return Number(num).toLocaleString('en-US', {
    ...(decimalPlaces
      ? {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }
      : {}),
  });
};
