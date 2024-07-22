import './description.scss';
import { BaseProps } from '../../types/props';

const Description = ({ children }: BaseProps) => {
  return (
    <div className="description-block" data-testid="description-block">
      <h5>Description</h5>
      <div>{children}</div>
    </div>
  );
};

export default Description;
