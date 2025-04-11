import { TComponentSeoMeta } from '@/types/common';

export interface CTSeoMetaProps {
  /**
   * Giving a meta data for each pages.
   *
   * Currently, only `titlePage` for **browser tab** that available on the options. If need something more, just add it here.
   */
  meta?: TComponentSeoMeta;
}
