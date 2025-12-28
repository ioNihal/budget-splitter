import React, { useState } from 'react';
import Layout from './Layout';
import Header from './Header';
import Dashboard from './Dashboard';
import BudgetDetailModal from './BudgetDetailModal';

const BudgetSplitter = () => {
    // Initial state matching the original logic
    const [forms, setForms] = useState([{ expenses: [], total: null, result: null, noHead: '1' }]);
    const [activeFormIndex, setActiveFormIndex] = useState(null);

    const handleAddForm = () => {
        const newForms = [...forms, { expenses: [], total: null, result: null, noHead: '1' }];
        setForms(newForms);
        // Automatically open the new form? Maybe not, to keep dashboard view stable.
        // setActiveFormIndex(newForms.length - 1);
    };

    const handleDeleteForm = (index) => {
        if (forms.length <= 1 && index === 0 && forms.length === 1) {
            // If it's the last one, maybe just reset it instead of deleting?
            // Or just alert like before.
             if (window.confirm("This is your last budget. Do you want to reset it?")) {
                 setForms([{ expenses: [], total: null, result: null, noHead: '1' }]);
             }
             return;
        }

        if (window.confirm("Are you sure you want to delete this budget?")) {
            const newForms = forms.filter((_, i) => i !== index);
            setForms(newForms);
            if (activeFormIndex === index) {
                setActiveFormIndex(null);
            }
        }
    };

    const handleOpenForm = (index) => {
        setActiveFormIndex(index);
    };

    const handleCloseForm = () => {
        setActiveFormIndex(null);
    };

    const handleUpdateForm = (updatedForm) => {
        const newForms = [...forms];
        newForms[activeFormIndex] = updatedForm;
        setForms(newForms);
    };

    return (
        <Layout>
            <Header />
            <Dashboard
                forms={forms}
                onAddForm={handleAddForm}
                onDeleteForm={handleDeleteForm}
                onOpenForm={handleOpenForm}
            />

            {activeFormIndex !== null && (
                <BudgetDetailModal
                    form={forms[activeFormIndex]}
                    index={activeFormIndex}
                    onClose={handleCloseForm}
                    onUpdate={handleUpdateForm}
                />
            )}
        </Layout>
    );
};

export default BudgetSplitter;
