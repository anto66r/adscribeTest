import React from 'react';

export default (initCounter, onChange, color) => {
  const [counter, setCounter] = React.useState(initCounter);
  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    onChange(color);
  }, [counter, onChange, color]);
  const decrease = () => setCounter(val => val - 1);
  const increase = () => setCounter(val => val + 1);
  return { counter, decrease, increase };
};
