import React from 'react';
import ThreeColumnRow from './3col-row/3col-row'

const row = (props) => {

  // console.log("in row", props.rowValue);

  return (
    <div style={props.classes.container} >
      <ThreeColumnRow
        input={props.classes.input}
        column={props.column}
        row={props.row}
        handleInsertInRow={props.handleInsertInRow}
        row3Values={props.rowValue.slice(0,3)}
      />
      <div>--</div>
      <ThreeColumnRow
        input={props.classes.input}
        column={props.column + 3}
        row={props.row}
        handleInsertInRow={props.handleInsertInRow}
        row3Values={props.rowValue.slice(3,3)}
      />
      <div>--</div>
      <ThreeColumnRow
        input={props.classes.input}
        column={props.column + 6}
        row={props.row}
        handleInsertInRow={props.handleInsertInRow}
        row3Values={props.rowValue.slice(6,3)}
      />
    </div>
  );
}

export default row;