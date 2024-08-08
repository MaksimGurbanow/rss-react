import { useEffect, useMemo, useState } from 'react';
import ItemDetails from '../itemDetails/ItemDetails';
import Button from '../ui/button/Button';
import Close from '../../assets/x-lg.svg';
import Open from '../../assets/caret-left-fill.svg';
import './details.scss';
import Loader from '../common/loader/Loader';
import { useRouter } from 'next/router';
import { Product } from '../../types/types';

const Details = ({ product }: { product: Product }) => {
  const { query, push, asPath } = useRouter();
  const productId = query.id as string;
  const [isMounted, setIsMounted] = useState(false);
  const currentOrStoredProductId = useMemo(() => {
    if (isMounted) {
      return productId || localStorage.getItem('productId');
    }
    return productId;
  }, []);
  const [opened, setOpened] = useState(!!currentOrStoredProductId);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setIsFetching(false);
  }, [product]);

  useEffect(() => {
    setOpened(!!productId);
    if (productId) localStorage.setItem('productId', productId || '');

    return () => {
      if (productId) localStorage.setItem('productId', productId || '');
    };
  }, [productId]);

  return (
    <div
      className={`details-page ${opened ? '' : 'details-page__disabled'}`}
      data-testid="details-page"
    >
      <div className={`details-page-container ${opened ? 'opened' : 'closed'}`}>
        {product && opened && <ItemDetails {...product} />}
        {isFetching && <Loader />}
        <Button
          onClick={() => {
            push(`${asPath.split('/details')[0]}/details`);
            setOpened((prev) => !prev);
          }}
          disabled={!opened}
          testid="details-close-button"
        >
          <Close />
        </Button>
      </div>
      <Button
        testid="open-details-button"
        onClick={() => setOpened((prev) => !prev)}
        className={`open-details-button ${opened ? 'open-details-button__disabled' : ''}`}
      >
        <Open />
      </Button>
    </div>
  );
};

export default Details;
