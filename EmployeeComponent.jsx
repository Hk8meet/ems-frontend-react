// import React, { useState } from 'react' 
// import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useEffect } from 'react'

// function EmployeeComponent() {

//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')

//   const {id} = useParams();  
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     email: ''
//   })

// // function handleFirstName(e) {
// //   setFirstName(e.target.value);
// // }

// // function handleLastName(e) {
// //   setLastName(e.target.value);
// // }

// // function handleEmail(e) {
// //   setEmail(e.target.value);
// // }

// const navigator = useNavigate();

// useEffect(() => {
//   if(id) {
//     getEmployee(id).then((response) => {
//       setFirstName(response.data.firstname)
//       setLastName(response.data.lastname)
//       setEmail(response.data.email)
//     }).catch(error => {
//       console.error(error);
//     })  
//   }
// }, [id])

// function saveOrUpdateEmployee(e) {
//   e.preventDefault();

//   if(validateForm()) {
//     const employee = {firstname: firstName, lastname: lastName, email}
//     console.log(employee)

//     if(id) {      
//       updateEmployee(id, employee).then((response) => {
//         console.log(response.data);
//         navigator('/employees');
//       }).catch(error => {   
//         console.error(error);
//       })
//     } else {
//       createEmployee(employee).then((response) => {
//         console.log(response.data);
//         navigator('/employees');
//       }).catch(error => {   
//         console.error(error);
//       })
//     }
//   }
// }



// function validateForm() {
//   let valid = true;
//   const errorsCopy = {...errors}

//   if(firstName.trim()) {
//     errorsCopy.firstName = '';
//   } else {
//     errorsCopy.firstName = 'First Name is required';
//     valid = false;
//   }

//   if(lastName.trim()) {
//     errorsCopy.lastName = '';
//   } else {
//     errorsCopy.lastName = 'Last Name is required';
//     valid = false;
//   } 

//   if(email.trim()) {
//     errorsCopy.email = '';
//   } else {
//     errorsCopy.email = 'Email is required';
//   }  
  
//   setErrors(errorsCopy);
//   return valid;
// }

// function pageTitle() {
//   if(id) {
//     return <h2 className='text-center'>Update Employee</h2>
//   } else {
//     // return <h2 className='text-center'>Add Employee</h2>
//   }
// }

//   return (
//     <div className='container'>
//       <br /> <br />
//       <div className='row'>
//         <div className='card col-md-6 offset-md-3 offset-md-3'>
//           {
//             pageTitle()
//           }
//           <h2 className='text-center'>Add Employee</h2>
//           <div className='card-body'>
//             <form>
//               <div className='form-group mb-2'>
//                 <label className='form-label'>First Name :</label>
//                 <input
//                   type='text'
//                   placeholder='Enter First Name'
//                   name='firstName'
//                   className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 >
//                 </input>
//                 {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
//               </div>

//                <div className='form-group mb-2'>
//                 <label className='form-label'>Last Name :</label>
//                 <input
//                   type='text'
//                   placeholder='Enter Last Name'
//                   name='lastName'
//                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 >
//                 </input>
//                 {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
//               </div>

//               <div className='form-group mb-2'>
//                 <label className='form-label'>Email :</label>
//                 <input
//                   type='text'
//                   placeholder='Enter Email'
//                   name='email'
//                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 >
//                 </input>
//                 {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
//               </div>

//               <button className='btn btn-success' onClick={saveOrUpdateEmployee} >Submit</button>
//               <button className='btn btn-danger' style={{marginLeft:"10px"}}>Cancel</button>

//             </form>
//           </div>
//         </div>  
//       </div>
//     </div>
//   )
// }

// export default EmployeeComponent

import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstname || '');
                setLastName(response.data.lastname || '');
                setEmail(response.data.email || '');
            }).catch(error => { console.error(error); });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstname: firstName, lastname: lastName, email };
            if (id) {
                updateEmployee(id, employee).then(() => navigator('/employees'));
            } else {
                createEmployee(employee).then(() => navigator('/employees'));
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        } else errorsCopy.firstName = '';
        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        } else errorsCopy.lastName = '';
        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else errorsCopy.email = '';

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return id
            ? <h2 className="text-center mb-4">Update Employee</h2>
            : <h2 className="text-center mb-4">Add Employee</h2>;
    }

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "#fff", padding: "30px 25px", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.09)" }}>
            {pageTitle()}
            <form autoComplete="off">
                <div className="form-group mb-3">
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.firstName}</div>
                </div>
                <div className="form-group mb-3">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.lastName}</div>
                </div>
                <div className="form-group mb-3">
                    <label>Email Id:</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary me-2" onClick={saveOrUpdateEmployee}>
                        {id ? "Update" : "Save"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigator('/employees')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmployeeComponent;
