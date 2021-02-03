import React, { useEffect, useState } from 'react';
import './App.css';
import threeColumnRow from './components/row/3col-row/3col-row';
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
    fontSize: '25px',
    textAlign: 'center',
  }
}

function App() {
  const [table, setTable] = useState(Array.from(Array(9), () => new Array(9).fill("")));
  const [solvedTable, setSolvedTable] = useState(Array.from(Array(9), () => new Array(9).fill("")));

  useEffect(() => {
    console.table(table);
  }, [table])

  const handleInsertInRow = (event) => {
    const rowEL = event.target.getAttribute('data-row');
    const columnEL = event.target.getAttribute('data-column');
    const input = event.target.value

    const tableToAddNum = [...table];
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
      if (index !== iExeption) {
        if (elem === number.toString()) return true;
      }
      return false
    });
    return result === -1 ? true : false;
  };

  const checkedRow = (arrayTable, i, j, num) => {
    const row = arrayTable[j];
    return checkConstrains(row, i, num);
  }

  const checkedColumn = (arrayTable, i, j, num) => {
    const column = arrayTable.map(elem => elem[i]);
    return checkConstrains(column, j, num);
  }

  const findRange = (i) => {
    if (i <= 2) return [0, 2];
    if (i <= 5) return [3, 5];
    return [6, 8];
  };
  const checkedSection = (arrayTable, i, j, num) => {
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
      const rowSection = arrayTable[jRow];

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
    return checkConstrains(section, indexSection, num)
  };


  const findNextEmpty = (solvingTable) => {
    let iRow = -1;
    let iCol = -1;
    solvingTable.some((row, iR) => {
      return row.some((num, iC) => {
        if (num === "") {
          iRow = iR;
          iCol = iC;
          console.log("found", iRow);
          return true;
        }
        return false
      })
    });
    return [iRow, iCol];
  };

  const findValidNum = (data, iRow, iCol) => {
    return baseNum.some((num) => {
      if (checkedRow(data, iCol, iRow, num)
        && checkedColumn(data, iCol, iRow, num)
        && checkedSection(data, iCol, iRow, num)
      ) {
        // run solveSudoku()
        data[iRow][iCol] = num;
        console.log("Inserted",data);
        if (solveSudoku(data)) {
          return true
        } else {
          data[iRow][iCol] = "";
          console.log("Removed" ,data);
          return false
        }
      } else {
        return false
      }
    });
  };

  const solveSudoku = (data) => {
    const coordinate = findNextEmpty(data)
    console.log(coordinate);
    const row = coordinate[0];
    const col = coordinate[1];

    if (row === -1) return true;

    return findValidNum(data, row, col);

  };

  const handleCheckSolution = () => {
    // console.log('Passed', checkedRow([...table], 0, 0, 1));
    // console.log('Passed', checkedColumn([...table], 0, 0, 1));
    // console.log('Passed', checkedSection([...table], 3, 3, 1));
    console.log(table);
    console.log('end');

    solveSudoku([...table])
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