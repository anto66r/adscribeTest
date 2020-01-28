import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import useCounter from '../../hooks/useCounter';

const GreenCounter = ({ initCounter, label, onChange }) => {
  const { counter, increase, decrease } = useCounter(initCounter, onChange, 'green');
  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={decrease}>
        -1
      </button>
      <button type="button" className={styles.button} onClick={increase}>
        +1
      </button>
      <h1 className={styles.h1Class}>{`${label}: ${counter}`}</h1>
    </div>
  );
};

GreenCounter.defaultProps = {
  label: 'Counter',
  onChange: () => null,
  initCounter: 0
};

GreenCounter.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  initCounter: PropTypes.number
};

export default GreenCounter;
