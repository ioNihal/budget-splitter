import React from 'react';
import '../App.css'

const ExpenseEntryForm = ({ expenses, handleChange, handleDeleteEntry }) => {
    return (
        <>
            <div className='expense-input'>
                {expenses.map((expense, index) => (
                    <div key={index} className="expense-entry">
                        <input
                            type="text"
                            name="name"
                            placeholder="Expense name"
                            value={expense.name}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <input
                            type="number"
                            name="value"
                            placeholder="Amount"
                            value={expense.value}
                            onChange={(e) => handleChange(index, e)}

                        />
                        <button type="button" onClick={() => handleDeleteEntry(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ExpenseEntryForm;
