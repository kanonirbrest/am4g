import { useState } from 'react';
import { getSSItem, setSSItem } from 'services/sessionStorage';

export default (key, defaultValue) => {
  const [state, setState] = useState(getSSItem(key) || defaultValue);

  const setValue = (value) => {
    setState(value);
    setSSItem(key, value);
  };

  return [state, setValue];
};
