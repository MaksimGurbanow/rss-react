import { useEffect, useMemo, useState } from 'react';
import { getProductById } from '../../app/api';
import ItemDetails from '../../components/itemDetails/ItemDetails';
import { Product } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import Close from '../../assets/x-lg.svg?react';
import Open from '../../assets/caret-left-fill.svg?react';
import './details.css';
import { useFetching } from '../../hooks/useFetching';
import Loader from '../../components/common/loader/Loader';

const Details = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const currentOrStoredProductId = useMemo(
    () => productId || localStorage.getItem('productId'),
    [productId],
  );
  const [opened, setOpened] = useState(!!currentOrStoredProductId);
  const { response: product, isLoading } = useFetching<Product>(
    currentOrStoredProductId
      ? () => getProductById(currentOrStoredProductId)
      : undefined,
    productId,
  );

  useEffect(() => {
    setOpened(!!productId);

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
        {isLoading && opened && <Loader />}
        {product && <ItemDetails {...product} />}
        <Button
          onClick={() => {
            navigate('../details');
            setOpened((prev) => !prev);
          }}
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
