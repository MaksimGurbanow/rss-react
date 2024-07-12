import React, { useEffect, useState } from 'react';
import { getProductById } from '../../app/api';
import ItemDetails from '../../components/itemDetails/ItemDetails';
import { Product } from '../../types/types';
import { useParams } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import Close from '../../../public/x-lg.svg?react';
import Open from '../../../public/caret-left-fill.svg?react';
import './details.css';

const Details = () => {
  const [product, setProduct] = useState<Product>();
  const { productId } = useParams();
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    getProductById(productId)
      .then((res) => setProduct(res))
      .catch(() => {
        throw new Error('Product id is not defined');
      });
    return setOpened(true);
  }, [productId]);
  return (
    <div
      className={`product-details ${opened ? '' : 'product-details__disabled'}`}
    >
      <div
        className={`product-details-container ${opened ? 'opened' : 'closed'}`}
      >
        {product && <ItemDetails {...product} />}
        <Button onClick={() => setOpened((prev) => !prev)}>
          <Close />
        </Button>
      </div>
      <Button
        onClick={() => setOpened((prev) => !prev)}
        className={`open-details-button ${opened ? 'open-details-button__disabled' : ''}`}
      >
        <Open />
      </Button>
    </div>
  );
};

export default Details;
