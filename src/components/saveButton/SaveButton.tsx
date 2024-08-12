import { MouseEvent } from 'react';
import store, { RootState } from '../../redux/store';
import { addProducts, removeProduct } from '../../redux/slices/savedProducts';
import { useSelector } from 'react-redux';
import './saveButton.scss';

const SaveButton = ({ id }: { id: number }) => {
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  const isSaved = !!savedProducts.find((product) => product.id === id);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      store.dispatch(removeProduct(id));
    } else {
      fetch('https://dummyjson.com/products/' + id)
        .then((res) => res.json())
        .then((product) => store.dispatch(addProducts([product])));
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
