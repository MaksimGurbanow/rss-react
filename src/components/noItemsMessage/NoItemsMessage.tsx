import './noItemsMessage.scss';

const NoItemsMessage = () => {
  return (
    <div className="no-items-message" data-testid="no-items-container">
      <h3>Oops... No product found</h3>
      <h5>It seems that there is no such a product with given title</h5>
    </div>
  );
};

export default NoItemsMessage;
