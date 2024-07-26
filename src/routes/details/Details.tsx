import { useEffect, useMemo, useState } from 'react';
import { useGetProductByIdQuery } from '../../app/redux/slices/productDetails';
import ItemDetails from '../../components/itemDetails/ItemDetails';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import Close from '../../assets/x-lg.svg?react';
import Open from '../../assets/caret-left-fill.svg?react';
import './details.scss';
import Loader from '../../components/common/loader/Loader';

const Details = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const currentOrStoredProductId = useMemo(
    () => productId || localStorage.getItem('productId'),
    [productId],
  );
  const [opened, setOpened] = useState(!!currentOrStoredProductId);
  const { data: product, isFetching } = useGetProductByIdQuery({
    id: currentOrStoredProductId || '1',
  });

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
            navigate('../details');
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
