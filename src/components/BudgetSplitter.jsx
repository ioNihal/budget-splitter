
import React, { useState, useEffect } from 'react';
import '../App.css';

import ExpenseEntryForm from './ExpenseEntryForm';
import ButtonGroup from './ButtonGroup';

const BudgetSplitter = () => {

    const [forms, setForms] = useState([{ expenses: [], total: null, result: null, noHead: '1' }]);
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [blurOn, setBlurOn] = useState(false);

    useEffect(() => {
        const rootDiv = document.getElementById('root');
        if (blurOn) {
            rootDiv.className = 'blur';
        } else {
            rootDiv.removeAttribute('class');
        }
    }, [blurOn]);

    const handleAddForm = () => {
        const newForms = [...forms, { expenses: [], total: null, result: null, noHead: null }];
        setForms(newForms);
        setActiveFormIndex(newForms.length - 1);
    };

    const handleDeleteForm = () => {
        if (forms.length > 1) {
            const newForms = forms.slice(0, -1);
            setForms(newForms);
            setActiveFormIndex(newForms.length - 1);
        }
    };

    const handleFormClick = (index) => {
        setActiveFormIndex(index);
        //setBlurOn(true)
        setIsOverlayOpen(true)
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        setBlurOn(false)
    };


    const handleExpenseChange = (expenseIndex, e) => {
        const updatedForms = [...forms];
        updatedForms[activeFormIndex].expenses[expenseIndex][e.target.name] = e.target.value;
        setForms(updatedForms);
    };

    const handleHeadChange = (e) => {
        const updatedForms = [...forms];
        updatedForms[activeFormIndex].noHead = e.target.value;
        setForms(updatedForms);
    };


    const handleAddExpenseEntry = () => {
        const updatedForms = [...forms];
        updatedForms[activeFormIndex].expenses.push({ y: '', value: '' });
        setForms(updatedForms);
    };


    const handleDeleteExpenseEntry = (expenseIndex) => {
        const updatedForms = [...forms];
        updatedForms[activeFormIndex].expenses.splice(expenseIndex, 1);
        setForms(updatedForms);
    };


    const handleSplitBudget = () => {
        const total = forms[activeFormIndex].expenses.reduce((acc, expense) => acc + parseFloat(expense.value || 0), 0);
        const noHead = forms[activeFormIndex].noHead;
        const result = total / noHead;
        const updatedForms = [...forms];
        updatedForms[activeFormIndex].total = total;
        updatedForms[activeFormIndex].result = result;
        setForms(updatedForms);
    };

    return (
        <>
            <div className="container" id="budgetSplitter">
                <div className="splitter-layout">
                    <div className="left-pane">
                        <button type="button" onClick={handleAddForm}>Add New Form</button>
                        <button type="button" onClick={handleDeleteForm}>Delete Last Form</button>
                        {forms.map((form, index) => (
                            <button key={index} onClick={() => handleFormClick(index)}>
                                {`Form ${index + 1}`}
                            </button>
                        ))}

                        {isOverlayOpen && (
                            <div className='blur'>
                                <div className='overlay'>
                                    <h2>{`Expense Form ${activeFormIndex + 1}`}</h2>
                                    {
                                        console.log(forms)
                                    }
                                    <div className='cliNform'>
                                        <div className="cli-output">

                                            {forms[activeFormIndex].expenses.length > 0 ? (
                                                forms[activeFormIndex].expenses.map((expense, idx) => (
                                                    <div key={idx}>
                                                        {`Expense ${idx + 1}: ${expense.name || 'No name'} - ₹${expense.value || '0'}`}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No expenses yet. Start adding some!</div>
                                            )}

                                            {forms[activeFormIndex].total !== null && (
                                                <div className="total-display">
                                                    <strong>{`Total: ₹${forms[activeFormIndex].total}`}</strong>
                                                    <br />
                                                    <strong>{`Result: ₹${forms[activeFormIndex].result} (Per Person)`}</strong>
                                                </div>
                                            )}
                                        </div>

                                        <form className="expense-calc-con">
                                            <ExpenseEntryForm
                                                expenses={forms[activeFormIndex].expenses}
                                                handleChange={handleExpenseChange}
                                                handleDeleteEntry={handleDeleteExpenseEntry}
                                            />
                                            <ButtonGroup
                                                handleAddEntry={handleAddExpenseEntry}
                                                handleSplit={handleSplitBudget}
                                            />
                                        </form>
                                    </div>
                                    <div className='backNhead'>
                                        <button type="button" onClick={handleCloseOverlay}>Back</button>
                                        <input
                                            type="number"
                                            name="noHead"
                                            placeholder='No. P'
                                            min='1'
                                            value={forms[activeFormIndex].noHead}
                                            onChange={(e) => handleHeadChange(e)}
                                            onSubmit={(e) => console.log(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default BudgetSplitter;