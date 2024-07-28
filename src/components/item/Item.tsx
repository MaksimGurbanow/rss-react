import './item.scss';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useMemo } from 'react';
import store, { RootState } from '../../app/redux/store';
import {
  addProduct,
  removeProduct,
} from '../../app/redux/slices/savedProducts';
import { getProductById } from '../../app/api';
import { useSelector } from 'react-redux';

const Item = ({ title, images, id }: ItemProps) => {
  const navigate = useNavigate();
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  const isSaved = useMemo(
    () => savedProducts.some((product) => product.id === id),
    [savedProducts],
  );
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (isSaved) store.dispatch(removeProduct(id));
    else getProductById(id).then((item) => store.dispatch(addProduct(item)));
  };
  return (
    <div
      className="item"
      onClick={() => navigate(`details/${id}`)}
      data-testid="item-container"
    >
      <h3 className="item-name" data-testid="item-name">
        {capitalize(title)}
      </h3>
      <img
        loading="lazy"
        role="presentation"
        decoding="async"
        alt="Sprite"
        src={images[0]}
        className="item-image"
        data-testid="item-image"
      />
      <button onClick={handleClick} data-testid={`save-button-${id}`}>
        {isSaved ? 'Delete' : 'Save'}
      </button>
    </div>
  );
};

export default Item;
