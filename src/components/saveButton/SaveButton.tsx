'use client';

import { MouseEvent } from 'react';
import store from '../../redux/store';
import { addProducts, removeProduct } from '../../redux/slices/savedProducts';
import { Product } from '../../types/types';

const SaveButton = ({ id, isSaved }: { isSaved?: boolean; id: number }) => {
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
    <button onClick={handleClick} data-testid={`save-button-${id}`}>
      {isSaved ? 'Delete' : 'Save'}
    </button>
  );
};

export default SaveButton;
