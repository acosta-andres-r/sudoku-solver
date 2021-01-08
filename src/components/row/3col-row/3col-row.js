import React from 'react';

const threeColumnRow = (props) => {
  // console.log("in 3col", props.row3Values);
  return (
    <div>
      <input
        style={props.input}
        data-column={props.column}
        data-row={props.row}
        maxLength='1'
        onChange={(event) => props.handleInsertInRow(event)}
        value={props.row3Values[0]}
      ></input>
      <input
        style={props.input}
        data-column={props.column + 1}
        data-row={props.row}
        maxLength='1'
        onChange={(event) => props.handleInsertInRow(event)}
        value={props.row3Values[1]}
      ></input>
      <input
        style={props.input}
        data-column={props.column + 2}
        data-row={props.row}
        maxLength='1'
        onChange={(event) => props.handleInsertInRow(event)}
        value={props.row3Values[2]}

      ></input>
    </div>
  );
}

export default threeColumnRow;