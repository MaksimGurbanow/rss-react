import Item from '../item/Item';
import './list.css';
import { ListProps } from '../../types/props';
import NoItemsMessage from '../noItemsMessage/NoItemsMessage';

const List = ({ items }: ListProps) => {
  return (
    <div className="items-list" data-testid="list-container">
      {items.length ? (
        items.map((item) => (
          <Item
            title={item.title}
            images={item.images}
            key={item.id}
            id={item.id}
          />
        ))
      ) : (
        <NoItemsMessage />
      )}
    </div>
  );
};

export default List;
