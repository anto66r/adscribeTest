import React from 'react';
import styles from './styles.module.css';
import GreenCounter from './components/GreenCounter';
import RedCounter from './components/RedCounter';
import DropDown from './components/DropDown';

import makeCustomElement from './helpers/makeCustomElement';

makeCustomElement(GreenCounter, 'green-counter');
makeCustomElement(RedCounter, 'red-counter');
makeCustomElement(DropDown, 'drop-down');

const colorOptions = ['Red', 'Blue', 'Yellow', 'Green', 'Orange'];

function App() {
  const [last, setLast] = React.useState('-');
  const [color, setColor] = React.useState('-');
  const greenCounter = React.useRef();
  const redCounter = React.useRef();
  const dropDown = React.useRef();
  React.useEffect(() => {
    const onCounterChangeHandler = ({ detail }) => setLast(detail);
    const onSelectChangeHandler = ({ detail }) => setColor(detail);
    const gC = greenCounter.current;
    const rC = redCounter.current;
    const dd = dropDown.current;
    gC.addEventListener('onChange', onCounterChangeHandler);
    rC.addEventListener('onChange', onCounterChangeHandler);
    dd.addEventListener('onChange', onSelectChangeHandler);
    return function removeListeners() {
      gC.removeEventListener('onChange', onCounterChangeHandler);
      rC.removeEventListener('onChange', onCounterChangeHandler);
      dd.removeEventListener('onChange', onSelectChangeHandler);
    };
  }, [redCounter, greenCounter, dropDown]);
  return (
    <div>
      <div className={styles.flex}>
        <GreenCounter onChange={setLast} initCounter={3} label="Green counter" />
        <RedCounter onChange={setLast} initCounter={2} label="Red counter" />
      </div>
      <div className={styles.flex}>
        <green-counter ref={greenCounter} label="Green webComponent" initCounter={0} />
        <red-counter ref={redCounter} label="Red webComponent" initCounter={1} />
      </div>
      <div>{`Last counter changed: ${last}`}</div>
      <DropDown onChange={setColor} options={colorOptions} value={color} />
      Web component:{' '}
      <drop-down ref={dropDown} value={color} options={JSON.stringify(colorOptions)} />
      <div>{`Selected color: ${color}`}</div>
    </div>
  );
}

export default App;
