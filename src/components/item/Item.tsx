import './item.scss';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import SaveButton from '../saveButton/SaveButton';
import { useLocation, useNavigate } from '@remix-run/react';
import formatAddress from '../../utils/formatAddress';

const Item = ({ title, images, id }: ItemProps) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className="item"
      data-testid="item-container"
      onClick={() => {
        navigate(
          formatAddress({ search, pathname, includeDetails: true, newId: id }),
        );
      }}
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
      <SaveButton id={id} />
    </div>
  );
};

export default Item;
