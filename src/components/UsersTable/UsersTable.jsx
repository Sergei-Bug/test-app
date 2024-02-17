import Modal from 'components/Modal/Modal';
import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const [value, setValue] = useState('');
  const [userData, setUserData] = useState(initialValue);
  const [users, setUsers] = useState(initContact());
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });
  const [modalActiveCreateUser, setModalActiveCreateUser] = useState();
  const [modalActiveSelectColumns, setModalActiveSelectColumns] = useState();

  // +++++++++++++++++++ temporarily
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([
    'Name',
    'Email',
    'Phone',
    'Address',
  ]);
  const [searchText, setSearchText] = useState('');
  // const [showModal, setShowModal] = useState(false);

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  };

  const handleAddColumn = column => {
    setAvailableColumns(availableColumns.filter(col => col !== column));
    setSelectedColumns([...selectedColumns, column]);
  };

  const handleRemoveColumn = column => {
    setSelectedColumns(selectedColumns.filter(col => col !== column));
    setAvailableColumns([...availableColumns, column]);
  };

  const handleApplyChanges = () => {
    // Add table change
    // setShowModal(false);
  };

  // const handleModalClose = () => {
  //   setSearchText('');
  //   // setShowModal(false);
  // };

  const handleDragEnd = result => {
    if (!result.destination) return;

    const updatedColumns = Array.from(selectedColumns);
    const [movedColumn] = updatedColumns.splice(result.source.index, 1);
    updatedColumns.splice(result.destination.index, 0, movedColumn);

    setSelectedColumns(updatedColumns);
  };
  // -------------------- temporarily

  useEffect(() => {
    localStorage.setItem('contactsArray', JSON.stringify(users));
  }, [users]);

  const handleRemoveClick = index => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
    userSuccessDeletedNotify();
  };

  const isFilledFields =
    userData.email &&
    userData.firstName &&
    userData.lastName &&
    userData.dateOfBirth &&
    userData.city;

  const filteredUsers = users.filter(user => {
    return (
      user.email?.toLowerCase().includes(value?.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(value?.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(value?.toLowerCase()) ||
      user.dateOfBirth?.toLowerCase().includes(value?.toLowerCase()) ||
      user.city?.toLowerCase().includes(value?.toLowerCase())
    );
  });

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
        userSuccessEditedNotify();
      } else {
        setUsers(prevState => [
          ...prevState,
          {
            ...userData,
            id: (users[users.length - 1]?.id || users.length) + 1,
          },
        ]);
        userSuccessCreatedNotify();
      }

      setUserData(initialValue);
      setModalActiveCreateUser(false);
    }
  };

  const handleEditClick = (data, index) => {
    setModalActiveCreateUser(true);
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

  const userSuccessCreatedNotify = () =>
    toast.success('User successfully created!');

  const userSuccessDeletedNotify = () =>
    toast.success('User deleted successfully!');

  const userSuccessEditedNotify = () =>
    toast.success('User data successfully updated!');

  return (
    <div className="wrapperRoot">
      <div className="wrapper-content">
        <div className="wrapper-modal-btn">
          <button
            className="open-modal-btn"
            onClick={() => setModalActiveCreateUser(true)}
          >
            Create
          </button>
          <button
            className="open-modal-btn"
            onClick={() => setModalActiveSelectColumns(true)}
          >
            Select Grid Columns
          </button>
        </div>
        <div>
          <form className="search-form">
            <input
              type="text"
              placeholder="Search user"
              className="search-input"
              onChange={e => setValue(e.target.value)}
            />
          </form>
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
                ? filteredUsers.map((user, index) => (
                    <tr className="str-table" key={user.id}>
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

      <Modal
        active={modalActiveCreateUser}
        setActive={setModalActiveCreateUser}
      >
        <div className="form-data">
          <form className="form-add-user" onSubmit={handleSubmitUser}>
            <h1 className="modal-title">
              {editableUserData.isEdit ? 'Please edit user' : 'Add new user'}
            </h1>
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
              <button
                className="form-btn form-btn-back"
                onClick={() => setModalActiveCreateUser(false)}
              >
                Back
              </button>
              <button
                disabled={!isFilledFields}
                className="form-btn form-btn-confirm"
                type="submit"
              >
                {editableUserData.isEdit ? 'Edit' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        active={modalActiveSelectColumns}
        setActive={setModalActiveSelectColumns}
      >
        <div>
          {/* table component */}
          {/* <button onClick={() => setShowModal(true)}>Select Columns</button> */}

          {/* {showModal && ( */}
          {/* <div className="modal"> */}
          <div className="modal-content-select-columns">
            {/* <span className="close" onClick={handleModalClose}>
          &times;
        </span> */}
            <div className="modal-title-wrapper">
              <h3 className="title-select-columns">
                Select columns for the grid
              </h3>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="select-modal-content">
                <input
                  type="text"
                  className="search-input-select"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchChange}
                />
                <div className="drag-drop-table">
                  <Droppable droppableId="available-columns">
                    {provided => (
                      <div
                        className="columns-container columns-wrapper"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="available-columns">
                          <ul>
                            {availableColumns
                              .filter(col =>
                                col
                                  .toLowerCase()
                                  .includes(searchText.toLowerCase())
                              )
                              .map((col, index) => (
                                <Draggable
                                  key={col}
                                  draggableId={col}
                                  index={index}
                                >
                                  {provided => (
                                    <li
                                      className="columns-item"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={() => handleAddColumn(col)}
                                    >
                                      {col}
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Droppable>

                  <Droppable droppableId="selected-columns">
                    {provided => (
                      <div
                        className="selected-columns columns-wrapper"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <ul>
                          {selectedColumns.map((col, index) => (
                            <Draggable
                              key={col}
                              draggableId={col}
                              index={index}
                            >
                              {provided => (
                                <li
                                  className="columns-item"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => handleRemoveColumn(col)}
                                >
                                  {col}
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </DragDropContext>
            <div className="modal-footer-wrapper">
              <button className="modal-apply-btn" onClick={handleApplyChanges}>
                Apply
              </button>
            </div>
          </div>
          {/* </div> */}
          {/* )} */}
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default UsersTable;
