import React, { useState } from "react";
// import './styles.css'; // Uncomment if you have a styles.css file

function DataTable({ data = [] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / pageSize);

    // Pagination navigation handlers
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when page size changes
    };

    // Slice data for current page
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = data.slice(startIndex, startIndex + pageSize);

    // Extract table column headers dynamically from first row
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h2>Data Table</h2>
            {data.length === 0 ? (
                    <p>No data available.</p>
            ) : (
                <>
                    <table
                        border="1"
                        cellPadding="10"
                        style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                        <thead>
                            <tr>
                                {headers.map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row, idx) => (
                                <tr key={idx}>
                                    {headers.map((key) => (
                                        <td key={key}>{row[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <button onClick={handlePrevious} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span style={{ margin: "0 10px" }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button onClick={handleNext} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>

                        <div>
                            Rows per page:{" "}
                            <select value={pageSize} onChange={handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default DataTable;



// import DataTable from "./DataTable";

// export default function App() {
//     const sampleData = [
//         { id: 1, name: "Alice", age: 25 },
//         { id: 2, name: "Bob", age: 30 },
//         { id: 3, name: "Charlie", age: 22 },
//         { id: 4, name: "David", age: 28 },
//         { id: 5, name: "Eve", age: 27 },
//         { id: 6, name: "Frank", age: 33 },
//         { id: 7, name: "Grace", age: 24 },
//         { id: 8, name: "Hank", age: 26 },
//         { id: 9, name: "Ivy", age: 21 },
//         { id: 10, name: "Jack", age: 29 }
//     ];

//     return <DataTable data={sampleData} />;
// }