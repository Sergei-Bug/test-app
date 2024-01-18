import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const initialValue = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  city: '',
};

const initContact = () => {
  if (localStorage.getItem('contactsArray')) {
    return JSON.parse(localStorage.getItem('contactsArray'));
  }
  return [];
};

function UsersTable() {
  const [userData, setUserData] = useState(initialValue);
  const [users, setUsers] = useState(initContact());
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  useEffect(() => {
    localStorage.setItem('contactsArray', JSON.stringify(users));
  }, [users]);

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
        setUsers(prevState => [
          ...prevState,
          {
            ...userData,
            id: (users[users.length - 1]?.id || users.length) + 1,
          },
        ]);
      }

      setUserData(initialValue);
    }
  };

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
        <div className="wrapper-modal-btn">
          <button className="modal-btn">Create</button>
        </div>
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
              {users?.length
                ? users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.dateOfBirth}</td>
                      <td>{user.city}</td>
                      <td>
                        <div className="wrapper-ops-btn">
                          <button
                            className="btn-operation edit-action"
                            onClick={() => handleEditClick(user, index)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-operation remove-action"
                            onClick={() => handleRemoveClick(index)}
                          >
                            <RiDeleteBin7Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-data">
        <form className="form-add-user" onSubmit={handleSubmitUser}>
          <p className="title-input">Email</p>
          <input
            className="input-form"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            value={userData.email}
          />
          <p className="title-input">First Name</p>
          <input
            className="input-form"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                firstName: e.target.value,
              }))
            }
            value={userData.firstName}
          />
          <p className="title-input">Last Name</p>
          <input
            className="input-form"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                lastName: e.target.value,
              }))
            }
            value={userData.lastName}
          />
          <p className="title-input">Date of Birth</p>
          <input
            className="input-form"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                dateOfBirth: e.target.value,
              }))
            }
            value={userData.dateOfBirth}
          />
          <p className="title-input">City</p>
          <input
            className="input-form"
            onChange={e =>
              setUserData(prevState => ({
                ...prevState,
                city: e.target.value,
              }))
            }
            value={userData.city}
          />

          <div className="buttons-wrapper">
            <button className="form-btn">Back</button>
            <button
              disabled={!isFilledFields}
              className="form-btn"
              type="submit"
            >
              {editableUserData.isEdit ? 'Edit' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersTable;
