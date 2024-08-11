'use client';

import { MouseEvent } from 'react';
import store, { RootState } from '../../redux/store';
import { addProducts, removeProduct } from '../../redux/slices/savedProducts';
import { Product } from '../../types/types';
import { useSelector } from 'react-redux';
import './saveButton.scss';

const SaveButton = ({ id }: { id: number }) => {
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  const isSaved = !!savedProducts.find((product) => product.id === id);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      fetch('/api/savedProducts', {
        method: 'DELETE',
        body: JSON.stringify({
          ids: [id],
        }),
      })
        .then((res) => res.json())
        .then(() => {
          store.dispatch(removeProduct(id));
        });
    } else {
      fetch('/api/savedProducts', {
        method: 'PUT',
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => res.json())
        .then((res: { product: Product }) => {
          store.dispatch(addProducts([res.product]));
        });
    }
  };
  return (
    <button
      onClick={handleClick}
      data-testid={`save-button-${id}`}
      className="save-button"
    >
      {isSaved ? 'Delete' : 'Save'}
    </button>
  );
};

export default SaveButton;
