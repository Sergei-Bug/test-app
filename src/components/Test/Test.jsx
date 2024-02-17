import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const UsersPage = () => {
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

  return (
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
          <h3 className="title-select-columns">Select columns for the grid</h3>
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
                            col.toLowerCase().includes(searchText.toLowerCase())
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
                        <Draggable key={col} draggableId={col} index={index}>
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
  );
};

export default UsersPage;
