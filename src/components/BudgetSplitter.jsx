
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

    const handleDeleteThis = (index) => {
        if (forms.length > 1) {
            const confirmDelete = window.confirm("Are you sure you want to delete this form?");

            if (confirmDelete) {
                const newForms = forms.filter((_, i) => i !== index);
                setForms(newForms);
                setActiveFormIndex(Math.max(index - 1, 0));

                setIsOverlayOpen(false);
                setBlurOn(false)
            }
        } else {
            window.alert("You cannot delete the last remaining form.");
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
                                                handleDeleteThis={() => handleDeleteThis(activeFormIndex)}
                                            />
                                        </form>
                                    </div>
                                    <div className='backNhead'>
                                        <button type="button" onClick={handleCloseOverlay}>Back</button>
                                        <span>No of Persons &nbsp; &nbsp;</span>
                                        <input
                                            type="number"
                                            name="noHead"
                                            placeholder='NO.OFHEADS'
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
                <footer className="footer">
                    This website is created by Nihal K,<br /> BCA A4 Batch,<br /> Register No 03SU22SD224

                    <p> <br />
                        Expense Splitting Web Application <b>(BudgetSplitter) </b>
                        This dynamic expense splitting web application, built with ReactJS, simplifies the process of dividing expenses among multiple people. <br /> <br /> Key features include: <br />

                        <b> Dynamic Form Creation: </b> Users can create multiple expense calculation forms, each tailored to different groups or events. <br />
                        <b> Persistent State: </b> The state of all forms is maintained until the page is reloaded, ensuring that users don’t lose their data during their session. <br />
                        <b> Flexible Management: </b> Users can easily add new forms or delete existing ones, providing flexibility and control over their expense tracking. <br />
                        <b> User-Friendly Interface: </b> The application features an intuitive and responsive design, making it easy for users to navigate and manage their expenses. <br />
                        <b> Real-Time Calculations: </b> Expenses are calculated in real-time as users input their data, providing immediate feedback and accuracy. <br /> <br />
                        This application is designed to be user-friendly and efficient, making it an ideal tool for managing shared expenses in various scenarios.
                    </p>
                </footer>
            </div >
        </>
    );
};

export default BudgetSplitter;