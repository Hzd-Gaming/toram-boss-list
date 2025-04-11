import { Helmet } from 'react-helmet-async';

import type { CTSeoMetaProps } from './CTSeoMeta.type';

const CTSeoMeta: React.FC<CTSeoMetaProps> = ({ meta }) => {
  const {
    titlePage = 'Custom Title',
    descriptionPage = 'Custom Template for React and written with TypeScript.',
  } = meta || {};

  return (
    <Helmet>
      <title>{titlePage}</title>
      <meta name="description" content={descriptionPage} />

      {/** Please add more meta if needed */}
    </Helmet>
  );
};

export default CTSeoMeta;
