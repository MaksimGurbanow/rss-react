import './description.css';
import { BaseProps } from '../../types/props';

const Description = ({ children }: BaseProps) => {
  return (
    <div className="description-block">
      <h5>Description</h5>
      <div>{children}</div>
    </div>
  );
};

export default Description;
