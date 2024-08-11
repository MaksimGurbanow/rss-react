import List from '../list/List';
import './savedItems.scss';
import pluralize from '../../utils/pluralize';
import Button from '../ui/button/Button';
import convertToCSV from '../../utils/convertToCSV';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { unsellectAll } from '../../redux/slices/savedProducts';

const SavedItems = () => {
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  const blob = () =>
    new Blob([convertToCSV(savedProducts)], {
      type: 'text/csv;charset=utf-8,',
    });

  const handleUnselectAll = async () => {
    store.dispatch(unsellectAll());
  };
  if (!savedProducts.length) return;
  return (
    <div className="saved-products-block" data-testid="saved-products">
      <h2 className="saved-products-header">Saved items</h2>
      <h3 className="saved-products-subheader">
        {savedProducts.length} {pluralize('item', savedProducts.length)}{' '}
        selected.
      </h3>
      <List items={savedProducts} />
      <div className="saved-products-controllers">
        <Button onClick={handleUnselectAll}>Unselect all</Button>

        <Button className="saved-products-download">
          <a
            className="saved-products-download-link"
            href={URL.createObjectURL(blob())}
            download={`${savedProducts.length}_products.csv`}
          >
            Download
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SavedItems;
