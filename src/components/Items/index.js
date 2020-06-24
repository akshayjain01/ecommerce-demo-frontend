//Dependencies
import React, { Component } from 'react';
//Internals
import AllItems from './AllItems';

const styles = {
  "background-color": "#282c34",
  height: "70px",
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
  "font-size": "calc(30px + 2vmin)",
  color: "white",
  padding: "20px",
  cursor: "pointer"
};

class Products extends Component {

  render() {
    return (
      <div className="items-wrapper">
        <header className="App-header">
          <h2 style={styles}>All Items</h2>
        </header>
      <AllItems />
      </div>
    );
  }
}

export default Products;
