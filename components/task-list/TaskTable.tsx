import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { useRouter } from 'next/navigation';

const TaskTable: React.FC = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const router = useRouter();

    const handleStart = (id: string) => {
      router.push(`/interview/${id}`); 
    };

    const data = [
        { id: 1, name: "John Doe", age: 25, sr:1 },
        { id: 2, name: "Jane Doe", age: 30 },
        { id: 3, name: "Alice Johnson", age: 27 },
        { id: 4, name: "Alice Johnson", age: 27 },
        { id: 5, name: "Bob Smith", age: 32 },
        { id: 6, name: "Bob Smith", age: 32 },
        { id: 7, name: "Bob Smith", age: 32 },
        { id: 8, name: "Bob Smith", age: 32 },
        { id: 9, name: "Bob Smith", age: 32 },
        { id: 10, name: "Bob Smith", age: 32 },
        { id: 11, name: "Bob Smith", age: 32 },
        { id: 12, name: "Bob Smith", age: 32 },
      ];
  
    const customHeadRender = (columnMeta:any) => (
        <th>
          {columnMeta.label}
        </th>
      )
    
    const customBodyRender = (value:any) => (
        <p>{value}</p>
      )

    const columns = [
      {
        label: "No",
        name: "id",
        options: {
          customHeadRender,
          customBodyRender: (value, tableMeta) => {
            const serialNumber = tableMeta.rowIndex + 1 + page * rowsPerPage; // Calculate serial number based on current page
            return <p>{serialNumber}</p>;
          },
        }
      },
      {
        label: "Task Name",
        name: "name",
        options: {
            customHeadRender,
            customBodyRender,
        }
      },
      {
        label: "Actions",
        name: "actions",
        options: {
          customHeadRender,
          customBodyRender: (value, tableMeta) => (
            <p style={{ textAlign: "left", margin: 'auto' }}>
              <button
                  className="btn-sm bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                  onClick={() => handleStart(tableMeta.rowData[0])}
                >
                  Start
                </button>
            </p>
          ),
        },
      },
    ];
  
    const options = {
      page: page,
      rowsPerPage: rowsPerPage,
      pagination: true,
      count: totalElements,
      tableBodyMaxHeight: "50vh",
      selectableRows: "none",
      search: false,
      filter: false,
      download: false,
      print: false,
      viewColumns: false,
      responsive: "simple",
      onChangePage: (e) => setPage(e),
      onChangeRowsPerPage: (e) => {
        setRowsPerPage(parseInt(e));
        setPage(0);
      },
    };

  return (
    <>
      <h1 id='table-title'>Select Task</h1>
      <MUIDataTable
        options={options}
        data={data}
        columns={columns}
        className={`sm:overflow-auto tasktable sm:overflow-auto`}
        // className={`sm:overflow-auto w-full ${loaderDetails ? "opacity-50" : ""}`}
      />
    </>
  );
};

export default TaskTable;
