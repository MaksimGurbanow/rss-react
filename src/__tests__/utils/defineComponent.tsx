import Main from '../../app/main/[page]/[[...paths]]/page';
import NotFound from '../../app/not-found';

const DefinedComponent = async (path: string) => {
  switch (path) {
    case '/main/1':
      return await Main({ params: { page: '1' } });
    case '/main/1/details/1':
      return await Main({ params: { page: '1', paths: ['details', '1'] } });
    default:
      return <NotFound />;
  }
};

export default DefinedComponent;
