import { useSelector } from 'react-redux';
import List from '../list/List';
import './savedItems.scss';
import store, { RootState } from '../../app/redux/store';
import pluralize from '../../utils/pluralize';
import Button from '../ui/button/Button';
import { unsellectAll } from '../../app/redux/slices/savedProducts';
import convertToCSV from '../../utils/convertToCSV';
import { useMemo } from 'react';
const SavedItems = () => {
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  const blob = useMemo(
    () =>
      new Blob([convertToCSV(savedProducts)], {
        type: 'text/csv;charset=utf-8,',
      }),
    [savedProducts],
  );
  return (
    <div className="saved-products-block">
      <h2 className="saved-products-header">Saved items</h2>
      <h3 className="saved-products-subheader">
        {savedProducts.length} {pluralize('item', savedProducts.length)}{' '}
        selected.
      </h3>
      <List items={savedProducts} />
      <div className="saved-products-controllers">
        <Button onClick={() => store.dispatch(unsellectAll())}>
          Unselect all
        </Button>
        <Button className="saved-products-download">
          <a
            className="saved-products-download-link"
            href={URL.createObjectURL(blob)}
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
