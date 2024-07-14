import './properties.css';
import { ItemDescriptionProps, ItemDescriptionValues } from '../../types/props';

const Properties = (props: ItemDescriptionProps) => {
  return (
    <div className="properties-container">
      <h5>Properties</h5>
      {Object.entries<ItemDescriptionValues>(props).map(
        ([name, value]) =>
          value && (
            <div
              className="item-property"
              key={`value-${value}-key-${name}`}
              data-testid="item-property"
            >
              <div className="item-property-name">{name}</div>
              <div className="item-property-content">{value.toString()}</div>
            </div>
          ),
      )}
    </div>
  );
};

export default Properties;
