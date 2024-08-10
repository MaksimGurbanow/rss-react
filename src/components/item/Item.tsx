import './item.scss';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import SaveButton from '../saveButton/SaveButton';
import Link from 'next/link';

const Item = ({ title, images, id, detailsPath }: ItemProps) => {
  return (
    <div className="item" data-testid="item-container">
      <Link href={detailsPath + id} className="item-link">
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
      </Link>
    </div>
  );
};

export default Item;
