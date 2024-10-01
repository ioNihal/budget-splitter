import React from 'react';

const ButtonGroup = ({ handleAddEntry, handleSplit , handleDeleteThis }) => {
    return (
        <div className="button-group">
            <button type="button" onClick={handleAddEntry}>Add Expense</button>
            <button type="button" onClick={handleSplit}>Split Budget</button>
            <button type="button" onClick={handleDeleteThis}>Delete Form</button>
        </div>
    );
};

export default ButtonGroup;
