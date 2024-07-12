import React from 'react';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import './switch.css';
import { SwitchProps } from '../../types/props';

const Switch = ({ page, limit, total }: SwitchProps) => {
  const navigate = useNavigate();

  return (
    <div className="switch-pages">
      <Button
        className="switch-pages__button"
        onClick={() => navigate(`/${page - 1}`)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Button
        className="switch-pages__button"
        disabled={page * limit > total}
        onClick={() => navigate(`/${page + 1}`)}
      >
        Next
      </Button>
    </div>
  );
};

export default Switch;
