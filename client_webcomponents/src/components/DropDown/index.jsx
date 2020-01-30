import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const DropDown = ({ value, options, onChange }) => (
    <select
      onChange={e => onChange(e.target.value)}
      className={styles.select}
      value={value}
    >
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );

DropDown.defaultProps = {
  options: [],
  value: "",
  onChange: () => null
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default DropDown