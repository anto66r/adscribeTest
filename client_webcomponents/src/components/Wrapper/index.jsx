import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.module.css'

const Wrapper = ({ children, className }) => (
  <div className={classnames(styles.border, className)}>{children}</div>
);

Wrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Wrapper
