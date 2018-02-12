import React from 'react';
import PropTypes from 'prop-types';
import './move_select.css'

export default class MoveSelect extends React.Component {
  static propTypes = {
    moves: PropTypes.any.isRequired,
    events: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.moves.pass()
    this.props.events.endTurn()
  }

  render() {
    return (
      <button disabled={this.props.disabled} onClick={this.onClick}>Next Month</button>
    )
  }
}
