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

  const checkConstrains = (array, iExeption, number) => {
    const result = array.findIndex((elem, index) => {
      console.log("Check", elem === number);
      if (index !== iExeption) {
        if (elem === number.toString()) return true;
      }
      return false
    });
    return result === -1 ? true : false;
  };

  const checkedRow = (i, j, num) => {
    const row = [...table[j]];
    return checkConstrains(row, i, num);
  }

  const checkedColumn = (i, j, num) => {
    const column = table.map(elem => elem[i]);
    return checkConstrains(column, j, num);
  }

  const findRange = (i) => {
    if (i <= 2) return [0, 2];
    if (i <= 5) return [3, 5];
    return [6, 8];
  };
  const checkedSection = (i, j, num) => {
    const rangeColumn = findRange(i);
    const rangeRow = findRange(j);
    let section = [];

    const jInSection = j - rangeRow[0];
    const iInSection = i - rangeColumn[0];

    let jCurrent = 0;
    let iCurrent = 0;
    let indexSection;

    let jRow;
    for (jRow = rangeRow[0]; jRow <= rangeRow[1]; jRow++) {
      const rowSection = [...table[jRow]];

      let iCol;
      for (iCol = rangeColumn[0]; iCol <= rangeColumn[1]; iCol++) {
        section = [...section, rowSection[iCol]]
        if (iCurrent === iInSection && jCurrent === jInSection) {
          indexSection = section.length - 1;
        }

        iCurrent++;
      };

      jCurrent++;
    };
    return checkConstrains( section, indexSection, num)
  };

  const handleCheckSolution = () => {
    console.log('Passed', checkedRow(0, 0, 1));
    console.log('Passed', checkedColumn(0, 0, 1));
    console.log('Passed', checkedSection(3, 3, 1));
    console.log('end');
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