import React, { Component } from "react";
import { filterProduct } from "../../../redux/actions";
import { connect } from "react-redux";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      value: this.props.value,
      name: this.props.name,
      checked: false,
    };
  }

  handleFilter() {
    this.setState({ checked: !this.state.checked });
    this.props.filterProduct(this.state.name);
    console.log(this.state.name);
  }

  render() {
    return (
      <input
        id={this.state.value}
        name={this.state.name}
        defaultValue={this.state.value}
        type="checkbox"
        checked={this.state.checked}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        onChange={(e) => {
          this.handleFilter(e);
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterProduct: (event) => dispatch(filterProduct(event)),
  };
};

export default connect(null, mapDispatchToProps)(Checkbox);
