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
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
  };

  const handleModalClose = () => {
    setSearchText('');
    setShowModal(false);
  };

  const handleDragEnd = result => {
    if (!result.destination) return;

    const updatedColumns = Array.from(selectedColumns);
    const [movedColumn] = updatedColumns.splice(result.source.index, 1);
    updatedColumns.splice(result.destination.index, 0, movedColumn);

    setSelectedColumns(updatedColumns);
  };

  return (
    <div>
      <h2>Users Page</h2>
      {/* table component */}
      <button onClick={() => setShowModal(true)}>Select Columns</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h3>Select Columns</h3>
            <input
              type="text"
              placeholder="Search columns"
              value={searchText}
              onChange={handleSearchChange}
            />
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="available-columns">
                {provided => (
                  <div
                    className="columns-container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="available-columns">
                      <h4>Available Columns</h4>
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
                    className="selected-columns"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h4>Selected Columns</h4>
                    <ul>
                      {selectedColumns.map((col, index) => (
                        <Draggable key={col} draggableId={col} index={index}>
                          {provided => (
                            <li
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
            </DragDropContext>
            <button onClick={handleApplyChanges}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
