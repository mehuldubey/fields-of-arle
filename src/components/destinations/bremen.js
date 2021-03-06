import React from 'react'
import PropTypes from 'prop-types'

const Bremen = ({ inventory, handleSellAtDestination }) => <div>Bremen</div>

Bremen.propTypes = {
  inventory: PropTypes.array.isRequired,
  handleSellAtDestination: PropTypes.func.isRequired,
}

export default Bremen
