import { Link } from 'react-router-dom';

// function UsersTable({ users, onDelete }) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Email</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Date of Birth</th>
//           <th>City</th>
//           <th>Operations</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.email}</td>
//             <td>{user.firstName}</td>
//             <td>{user.lastName}</td>
//             <td>{user.dateOfBirth}</td>
//             <td>{user.city}</td>
//             <td>
//               <Link to={`/edit/${user.id}`}>
//                 <button>Edit</button>
//               </Link>
//               <button onClick={() => onDelete(user.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default UsersTable;

import { useState } from 'react';

const initialValue = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  city: '',
};

function UsersTable() {
  const [userData, setUserData] = useState(initialValue);
  const [users, setUsers] = useState([]);

  const handleSubmitUser = e => {
    e.preventDefault();

    setUsers(prevState => [...prevState, userData]);

    setUserData(initialValue);
  };

  console.log('userData: ', userData);

  return (
    <div className="wrapperRoot">
      <div className="wrapper-content">
        <div className="table-data">
          <table className="user-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>City</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.city}</td>
                  <td>
                    <Link to={`/edit/${user.id}`}>
                      <button>Edit</button>
                    </Link>
                    {/* <button onClick={() => onDelete(user.id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-data">
        <form onSubmit={handleSubmitUser}>
          <input
            className="input-form"
            placeholder="Write your Email"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            value={userData.email}
          />
          <input
            className="input-form"
            placeholder="Write your First Name"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                firstName: e.target.value,
              }))
            }
            value={userData.firstName}
          />
          <input
            className="input-form"
            placeholder="Write your Last Name"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                lastName: e.target.value,
              }))
            }
            value={userData.lastName}
          />
          <input
            className="input-form"
            placeholder="Choose your Date of Birth"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                dateOfBirth: e.target.value,
              }))
            }
            value={userData.dateOfBirth}
          />
          <input
            className="input-form"
            placeholder="Write your City"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                city: e.target.value,
              }))
            }
            value={userData.city}
          />

          <div className="buttons-wrapper">
            <button className="form-btn" type="submit">
              Add
            </button>
            <button className="form-btn" type="reset">
              Clean
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersTable;
