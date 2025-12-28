import React from 'react';
import PropTypes from 'prop-types';
import BudgetCard from './BudgetCard';

const Dashboard = ({ forms, onAddForm, onDeleteForm, onOpenForm }) => {
    return (
        <div id="dashboard" className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-100">Your Budgets</h2>
                <button
                    onClick={onAddForm}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Budget
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.map((form, index) => (
                    <BudgetCard
                        key={index}
                        index={index}
                        total={form.total}
                        expenseCount={form.expenses.length}
                        onClick={() => onOpenForm(index)}
                        onDelete={() => onDeleteForm(index)}
                    />
                ))}
            </div>

            {forms.length === 0 && (
                <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                    <p className="text-slate-400 text-lg">No budgets created yet.</p>
                    <button
                        onClick={onAddForm}
                        className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                        Create your first budget
                    </button>
                </div>
            )}
        </div>
    );
};

Dashboard.propTypes = {
    forms: PropTypes.arrayOf(PropTypes.shape({
        expenses: PropTypes.array.isRequired,
        total: PropTypes.number,
    })).isRequired,
    onAddForm: PropTypes.func.isRequired,
    onDeleteForm: PropTypes.func.isRequired,
    onOpenForm: PropTypes.func.isRequired,
};

export default Dashboard;
