'use client';

import './item.scss';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import SaveButton from '../saveButton/SaveButton';
import { useRouter } from 'next/navigation';

const Item = ({ title, images, id, detailsPath }: ItemProps) => {
  const { push } = useRouter();
  return (
    <div
      className="item"
      data-testid="item-container"
      onClick={() => push(detailsPath + id)}
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
