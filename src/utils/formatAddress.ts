const formatAddress = ({
  query,
  pathname,
  newPage,
  search,
  newId,
  includeDetails,
  disableDetails,
}: {
  query?: string;
  pathname: string;
  search?: string;
  newPage?: number | string;
  newId?: string | number;
  includeDetails?: boolean;
  disableDetails?: boolean;
}) => {
  const [main, page, details = '', id = ''] = pathname.split('/').slice(1);
  const productId = newId || id ? '/' + (newId || id) : '';
  return `/${main}/${newPage || page}${(includeDetails || details) && '/details'}${disableDetails ? '' : productId}${search || `?searchQuery=${query}` || ''}`;
};

export default formatAddress;
