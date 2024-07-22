import { useEffect, useState } from 'react';
import { ToogleProps } from '../../types/props';
import './toggle.scss';

const Toggle = ({
  initial,
  end,
  callback,
  defaultToggled = false,
}: ToogleProps) => {
  const [toggled, setToggled] = useState<boolean>(defaultToggled);
  useEffect(() => {
    setToggled(defaultToggled);
  }, [defaultToggled]);
  const handleCallback = () => {
    setToggled((prev) => !prev);
    if (callback) callback();
  };
  return (
    <button className="toggle-button" type="button" onClick={handleCallback}>
      <div className={`toggle-circle ${toggled && 'toggled'}`}>
        {toggled ? end.icon : initial.icon}
      </div>
    </button>
  );
};

export default Toggle;
