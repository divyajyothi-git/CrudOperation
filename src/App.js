import { useState } from 'react';
import './App.css';
import { Table } from './components/Table';
import { Modal } from './components/Modal';

function App() {
  const [modalOpen,setModelOpen]=useState(false);

  const [rows,setRows]=useState([
    {page:1,description:"This is the first page",status:"live"},
    {page:2,description:"This is the second page",status:"draft"},
    {page:3,description:"This is the third page",status:"error"},
  ]);

  const [rowToEdit,setRowToEdit]=useState(null)

  const handleDeleteRow=(targetIndex)=>{
    setRows(rows.filter((_,idx)=> idx!==targetIndex));
    alert("Are you sure, you want to delete the row?");

  }

  const handleEditRow=(idx)=>{
    setRowToEdit(idx);
    setModelOpen(true);
  }
  const getNewId=()=>{
      const ids=rows.map((eachRow)=>{return eachRow.page})
      return Math.max(...ids)+1;
  }

  const handleSubmit=(newRow)=>{
    console.log(newRow)
    rowToEdit === null ?
    setRows([...rows,{...newRow,page:getNewId()}]): setRows(rows.map((currRow,idx)=>
    {
      if(idx !== rowToEdit) return currRow;
      return newRow;
    }
    ))

  }
  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
      <button className='btn' onClick={()=>setModelOpen(true)}>Add</button>
       {modalOpen && (
       <Modal
       rows={rows}
       closeModal={()=>{
       setModelOpen(false);
       setRowToEdit(null)
        }}
        onSubmit ={handleSubmit}
        defaultValue={rowToEdit !==null && rows[rowToEdit]}
        />)}
    </div>
  );
}

export default App;
