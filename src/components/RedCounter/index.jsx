import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import useCounter from "../../hooks/useCounter";

const RedCounter = ({ initCounter, label, onChange }) => {
  const { counter, increase, decrease } = useCounter(
    initCounter,
    onChange,
    "red"
  );
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={decrease}>
        -1
      </button>
      <button className={styles.button} onClick={increase}>
        +1
      </button>
      <h1 className={styles.h1Class}>{`${label}: ${counter}`}</h1>
    </div>
  );
};

RedCounter.defaultProps = {
  label: "Counter",
  onChange: () => null,
  initCounter: 0
};

RedCounter.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  initCounter: PropTypes.number
};

export default RedCounter;