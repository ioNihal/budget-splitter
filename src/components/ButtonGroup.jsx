import React from 'react';

const ButtonGroup = ({ handleAddEntry, handleSplit }) => {
    return (
        <div className="button-group">
            <button type="button" onClick={handleAddEntry}>Add Expense</button>
            <button type="button" onClick={handleSplit}>Split Budget</button>
        </div>
    );
};

export default ButtonGroup;
