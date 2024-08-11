import { useEffect, useState } from 'react';
import ItemDetails from '../../../components/itemDetails/ItemDetails';
import Button from '../../../components/ui/button/Button';
import Close from '../../../assets/x-lg.svg?react';
import Open from '../../../assets/caret-left-fill.svg?react';
import './details.scss';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import getProductById from '../../../api/getProductById';
import formatAddress from '../../../utils/formatAddress';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  const product = id ? await getProductById(id as string) : null;
  return {
    id,
    product,
  };
};

const Details = () => {
  const { product, id } = useLoaderData<typeof loader>();
  const [currentOrStoredId, setCurrentOrStoredId] = useState<string>();
  const [opened, setOpened] = useState(!!id);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => {
    setCurrentOrStoredId(id || localStorage.getItem('id') || '');
  }, []);

  useEffect(() => {
    setOpened(!!id);
    if (id) localStorage.setItem('id', id || '');

    return () => {
      if (id) localStorage.setItem('id', id || '');
    };
  }, [id]);

  return (
    <div
      className={`details-page ${opened ? '' : 'details-page__disabled'}`}
      data-testid="details-page"
    >
      <div className={`details-page-container ${opened ? 'opened' : 'closed'}`}>
        {product && <ItemDetails {...product} />}
        <Button
          onClick={() => {
            setOpened((prev) => !prev);
            navigate(
              formatAddress({ search, pathname, disableDetails: true }),
              { replace: true },
            );
          }}
          disabled={!opened}
          testid="details-close-button"
        >
          <Close />
        </Button>
      </div>
      <Button
        testid="open-details-button"
        onClick={() => {
          navigate(
            formatAddress({ search, pathname, newId: currentOrStoredId || id }),
            {
              replace: true,
            },
          );
          setOpened((prev) => !prev);
        }}
        className={`open-details-button ${opened ? 'open-details-button__disabled' : ''}`}
      >
        <Open />
      </Button>
    </div>
  );
};

export default Details;
