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
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const handleRemoveClick = index => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const isFilledFields =
    userData.email &&
    userData.firstName &&
    userData.firstName &&
    userData.dateOfBirth &&
    userData.city;

  const handleSubmitUser = e => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);

        setUsers(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers(prevState => [...prevState, userData]);
      }

      setUserData(initialValue);
    }
  };

  const handleCleanClick = () => setUserData(initialValue);

  const handleEditClick = (data, index) => {
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

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
              {users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.city}</td>
                  <td>
                    <div className="wrapper-ops-btn">
                      <button
                        className="edit-action"
                        onClick={() => handleEditClick(user, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="edit-action"
                        onClick={() => handleRemoveClick(index)}
                      >
                        Delete
                      </button>
                    </div>
                    {/* <Link to={`/edit/${user.id}`}>
                      <button>Edit</button>
                    </Link> */}
                    {/* <button onClick={() => onDelete(user.id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-data">
        <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
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
            <button
              disabled={!isFilledFields}
              className="form-btn"
              type="submit"
            >
              {editableUserData.isEdit ? 'Edit' : 'Add'}
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
