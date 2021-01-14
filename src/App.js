import React, { useEffect, useState } from 'react';
import './App.css';
import Row from './components/row/row';

const baseNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const classes = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    width: '1em',
    // height: '50px',‰
    fontSize: '25px',
    textAlign: 'center',
  }
}

function App() {
  const [table, setTable] = useState(Array.from(Array(9), () => new Array(9).fill("")));

  useEffect(() => {
    // console.table(table);
  }, [table])

  const handleInsertInRow = (event) => {
    const rowEL = event.target.getAttribute('data-row');
    const columnEL = event.target.getAttribute('data-column');
    const input = event.target.value

    const tableToAddNum = [...table];
    // console.log(tableToAddNum[rowEL]);
    tableToAddNum[rowEL][columnEL] = baseNum.includes(input) ? input : "";
    setTable(tableToAddNum);
  };

  const duplicateNumbersIndexes = (array) => {
    let duplicates = array.map((elem, i) => {
      return (array.includes(elem) && elem !== '');
    });
    // return index of duplicate
    return duplicates;
  };

  // CONSTRAINS:
  const checkedRowConstrain = (i, j, num) => {
    const row = [...table[j]];
    const result = row.findIndex((elem, index) => {
      console.log("Check", elem === num);
      if (index !== i) {
        if (elem === num.toString()) return true;
      }
      return false
    });
    return result === -1 ? true : false;
  }

  const checkedColumnConstrain = (i, j, num) => {
    const column = table.map(elem => elem[i]);
    const result = column.findIndex((elem, index) => {
      console.log("Check col", elem === num);
      if (index !== i) {
        if (elem === num.toString()) return true;
      }
      return false
    });
    return result === -1 ? true : false;
  }

  const handleCheckSolution = () => {
    // const numbers = [...baseNum]
    // const row = [...table[0]]
    // console.log(row);

    // const remain = numbers.filter((elem, i) => !row.includes(elem));

    // console.log('index', duplicateNumbersIndexes(row));
    // console.log(remain);

    console.log('Passed', checkedRowConstrain(0, 0, 1));
    console.log('Passed', checkedColumnConstrain(0, 0, 1));
  };

  return (
    <div>
      <h1>Test</h1>
      <Row
        classes={classes}
        column={0}
        row={0}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[0]}
      />
      <Row
        classes={classes}
        column={0}
        row={1}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[1]}
      />
      <Row
        classes={classes}
        column={0}
        row={2}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[2]}
      />
      <br />
      <Row
        classes={classes}
        column={0}
        row={3}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[3]}
      />
      <Row
        classes={classes}
        column={0}
        row={4}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[4]}
      />
      <Row
        classes={classes}
        column={0}
        row={5}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[5]}
      />
      <br />
      <Row
        classes={classes}
        column={0}
        row={6}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[6]}
      />
      <Row
        classes={classes}
        column={0}
        row={7}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[7]}
      />
      <Row
        classes={classes}
        column={0}
        row={8}
        handleInsertInRow={handleInsertInRow}
        rowValue={table[8]}
      />
      <br />
      <button onClick={handleCheckSolution}>Check</button>
    </div>
  );
}

export default App;