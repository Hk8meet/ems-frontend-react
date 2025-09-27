// import React, {useEffect, useState} from 'react'
// import { deleteEmployee, listEmployees } from '../services/EmployeeService';
// import{ useNavigate } from 'react-router-dom';

// const ListEmployeeComponent = () => {

//     const [employees, setEmployees] = useState([])

//     const navigator = useNavigate();

//     useEffect(() => { 
//         getAllEmployees();
//     }, [])
 
//     function getAllEmployees() {
//       listEmployees().then((response) => {
//         setEmployees(response.data);
//         }).catch(error => {
//           console.error(error);
//         })
//     }
//     function addNewEmployee() {
//       navigator('/add-employee/')
//     }

//     function updateEmployee(id) {
//       navigator(`/edit-employee/${id}`)
//     }

//     function removeEmployee(id) {
//       console.log(id);

//       deleteEmployee(id).then(() => {
//        getAllEmployees();
//       }).catch(error => {
//         console.error(error);
//       })
//     }

//   return (
//     <div className='container'>
//       <h2 className='text-center'>List of Employees</h2>
//       <button className='btn btn-primary mb-2'onClick={addNewEmployee}> Add Employee</button>
//       <table className='table table-striped table-bordered'>
//         <thead>
//           <tr>
//             <th>Employee Id</th>
//             <th>Employee First Name</th>
//             <th>Employee Last Name</th>
//             <th>Employee Email Id</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             employees.map(employee =>
//               <tr key={employee.id}>
//                             <td>{employee.id}</td>
//                             <td>{employee.firstname}</td>
//                             <td>{employee.lastname}</td>
//                             <td>{employee.email}</td>
//                             <td>
//                               <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
//                               <button style={{marginLeft:"10px"}} className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
//                             </td>
//                         </tr>
//             )
//           }
          
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ListEmployeeComponent


import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees()
            .then((response) => { setEmployees(response.data); })
            .catch(error => { console.error(error); });
    }

    function addNewEmployee() {
        navigator('/add-employee/');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id)
                .then(() => { getAllEmployees(); })
                .catch(error => { console.error(error); });
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ marginBottom: 0 }}>List of Employees</h2>
                <button className="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
            </div>
            <div className="table-responsive">
            <table className="employees-table">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>No Employees Found</td>
                        </tr>
                    ) : (
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                {/* <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td> */}
                                <td className="truncate-cell" title={employee.firstname}>{employee.firstname}</td>
                                <td className="truncate-cell" title={employee.lastname}>{employee.lastname}</td>
                                <td className="truncate-cell" title={employee.email}>{employee.email}</td>



                                {/* <td>
                                  <div className="action-buttons">
                                    <button
                                      className="btn btn-warning"
                                      onClick={() => updateEmployee(employee.id)}
                                    >
                                      Update
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => removeEmployee(employee.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td> */}
                                <td>
                                      <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                          style={{
                                            minWidth: "80px",
                                            color: "white",
                                            fontWeight: "600",
                                            
                                            backgroundColor: "#2775fbff", // green-blue for Update
                                            border: "none"
                                          }}
                                          className="btn btn-warning"
                                          onClick={() => updateEmployee(employee.id)}
                                        >
                                          Update
                                        </button>
                                        <button
                                          style={{
                                            minWidth: "80px",
                                            fontWeight: "600",
                                            backgroundColor: "#516074ff", // deep red for Delete
                                            color: "white",
                                            border: "none"
                                          }}
                                          className="btn btn-danger"
                                          onClick={() => removeEmployee(employee.id)}
                                        >
                                          Delete
                                        </button>

                                      </div>
                                    </td>


                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
