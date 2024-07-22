import './item.scss';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

const Item = ({ title, images, id }: ItemProps) => {
  const navigate = useNavigate();
  const saveItem = (event: MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
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
        alt="Sprite"
        src={images[0]}
        className="item-image"
        data-testid="item-image"
      />
      <button onClick={saveItem}>Save</button>
    </div>
  );
};

export default Item;
