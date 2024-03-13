import React, { useEffect, useState } from 'react'
import "./app.css";

const inputAction = [1,2,3,4,5,6,7,8,9];

const App = () => {
  const [selectNumber, setSelectNumber] = useState<number>(0);
  const [highlight, setHighlight] = useState({
    row: -1,
    col: -1,
    num: -1,
  })
  const [grid, setGrid] = useState<any[][]>([]);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const grid = [];

    for(let i = 0; i < 9; i++) {
      grid.push(new Array(9).fill(0));
    }

    const totalNumbers = 30;
    let count = 0;

    while (count < totalNumbers) {
      const row:number = Math.floor(Math.random() * 9);
      const col:number = Math.floor(Math.random() * 9);
      const num:number = Math.floor(Math.random() * 9) + 1;     

      console.log(checkValidPosition(row, col, num, grid));
      // if(checkValidPosition(row, col, num, grid)) {
      //   grid[row][col].value = num;
      //   count++;
      // }
      // if(grid[row][col].value === 0 && ) {
      //   grid[row][col].value = num;
      //   
      // }   
      
      if(grid[row][col] === 0 && checkValidPosition(row, col, num, grid)) {
        grid[row][col] = num;
        count++;
      }
      
      
    }

    setGrid(grid);
  }

  const checkValidPosition = (row:number, col:number, num:number, grid:any):Boolean => {

    //! Checking row and col
    for(let i = 0; i < 9; i++) {
      if(grid[i][col] === num || grid[row][i] === num) {
        return false;
      }
    }
    
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for(let i = startRow; i <= startRow + 2; i++) {
      for(let j = startCol; j <= startCol + 2; j++) {
        if(grid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  const c = (row:number, col:number) => {
    const value = grid[row][col];
    setHighlight({row: row, col: col, num: (value > 0 ? value : -1)});
  }

  const isInScope = (row: number, col: number) => {
    let startRow = Math.floor(highlight.row / 3) * 3;
    let startCol = Math.floor(highlight.col / 3) * 3;

    return startRow <= row && startRow + 2 >= row && startCol <= col && startCol + 2 >= col;
  }

  const addNumber = (num: number) => {
    if (checkValidPosition(highlight.row, highlight.col, num, grid)) {
      const newGrid = [...grid];
      newGrid[highlight.row][highlight.col] = num;
      setGrid(newGrid);
    }
  };

  return (
    <div className='center-items'>

      <ul className='grid-container'>
        {grid.map((item, row) => (
          <li key={row}>
            <ul>
              {item.map((val, col) => (
                <li key={col} onClick={() => c(row, col)} className={isInScope(row, col) || highlight.row === row || highlight.col === col || highlight.num === val ? highlight.num == val || (highlight.col === col && highlight.row === row) ? "focus-color" : "highlight-row" :  ""}>{val == 0 ? "" : val}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      <div className='input-action-button'>
        <ul>
          {inputAction.slice(0, 5).map(item => (
            <li onClick={() => addNumber(item)}>{item}</li>
          ))}
        </ul>
        <ul>
          {inputAction.slice(5, inputAction.length).map(item => (
            <li onClick={() => addNumber(item)}>{item}</li>
          ))}
        </ul>
      </div>
      
    </div>
  )
}

export default App;