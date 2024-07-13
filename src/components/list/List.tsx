import Item from '../item/Item';
import './list.css';
import { ListProps } from '../../types/props';

const List = ({ items }: ListProps) => {
  return (
    <div className="items-list">
      {items.map((item) => (
        <Item
          title={item.title}
          images={item.images}
          key={item.id}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default List;
