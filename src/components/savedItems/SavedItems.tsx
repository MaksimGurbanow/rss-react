'use client';

import List from '../list/List';
import './savedItems.scss';
import pluralize from '../../utils/pluralize';
import Button from '../ui/button/Button';
import convertToCSV from '../../utils/convertToCSV';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { addProducts, unsellectAll } from '../../redux/slices/savedProducts';
import { Product } from '../../types/types';

const SavedItems = ({ detailsPath }: { detailsPath: string }) => {
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  const blob = () =>
    new Blob([convertToCSV(savedProducts)], {
      type: 'text/csv;charset=utf-8,',
    });

  useEffect(() => {
    fetch('/api/savedProducts')
      .then((res) => res.json())
      .then((res: { products: Product[] }) => {
        store.dispatch(addProducts(res.products));
      });
  }, []);

  const handleUnselectAll = async () => {
    await fetch('/api/savedProducts/all', {
      method: 'DELETE',
    }).then(() => store.dispatch(unsellectAll()));
  };
  if (!savedProducts.length) return;
  return (
    <div className="saved-products-block" data-testid="saved-products">
      <h2 className="saved-products-header">Saved items</h2>
      <h3 className="saved-products-subheader">
        {savedProducts.length} {pluralize('item', savedProducts.length)}{' '}
        selected.
      </h3>
      <List items={savedProducts} detailsPath={detailsPath} />
      <div className="saved-products-controllers">
        <Button onClick={handleUnselectAll}>Unselect all</Button>
        <Link
          className="saved-products-download-link"
          href={URL.createObjectURL(blob())}
          download={`${savedProducts.length}_products.csv`}
        >
          <Button className="saved-products-download">Download</Button>
        </Link>
      </div>
    </div>
  );
};

export default SavedItems;
