
import PropTypes from 'prop-types';

const ExpenseEntry = ({ expense, index, onChange, onDelete }) => {
    return (
        <div className="flex gap-3 mb-3 items-start animate-fade-in">
            <div className="flex-grow">
                <input
                    type="text"
                    name="name"
                    placeholder="Expense Name (e.g., Dinner)"
                    value={expense.name || ''}
                    onChange={(e) => onChange(index, e)}
                    className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500"
                />
            </div>
            <div className="w-1/3">
                <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400">₹</span>
                    <input
                        type="number"
                        name="value"
                        placeholder="0.00"
                        value={expense.value || ''}
                        onChange={(e) => onChange(index, e)}
                        className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-lg pl-7 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-500"
                    />
                </div>
            </div>
            <button
                onClick={() => onDelete(index)}
                className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-700 transition"
                title="Remove Entry"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

ExpenseEntry.propTypes = {
    expense: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

const BudgetDetailModal = ({ form, index, onClose, onUpdate }) => {
    const handleExpenseChange = (idx, e) => {
        const newExpenses = [...form.expenses];
        newExpenses[idx] = { ...newExpenses[idx], [e.target.name]: e.target.value };
        updateForm(newExpenses, form.noHead);
    };

    const handleAddExpense = () => {
        const newExpenses = [...form.expenses, { name: '', value: '' }];
        updateForm(newExpenses, form.noHead);
    };

    const handleDeleteExpense = (idx) => {
        const newExpenses = form.expenses.filter((_, i) => i !== idx);
        updateForm(newExpenses, form.noHead);
    };

    const handleHeadChange = (e) => {
        updateForm(form.expenses, e.target.value);
    };

    const updateForm = (expenses, noHead) => {
        // Calculate total immediately
        const total = expenses.reduce((acc, curr) => acc + (parseFloat(curr.value) || 0), 0);
        const heads = parseInt(noHead) || 1;
        const result = total / heads;

        onUpdate({
            ...form,
            expenses,
            noHead,
            total,
            result
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-slate-950 bg-opacity-75 transition-opacity backdrop-blur-sm"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block align-bottom bg-slate-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-2xl sm:w-full border border-slate-700">
                    <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold leading-6 text-slate-100" id="modal-title">
                                    Budget Details #{index + 1}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">Manage expenses for this event.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-200 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Summary Section */}
                        <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-700/50 p-4 rounded-lg">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wide">Total Expenses</p>
                                <p className="text-2xl font-bold text-orange-500">₹{form.total ? form.total.toFixed(2) : '0.00'}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wide">Per Person</p>
                                <p className="text-2xl font-bold text-emerald-400">₹{form.result ? form.result.toFixed(2) : '0.00'}</p>
                            </div>
                        </div>

                        {/* People Count */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Number of People</label>
                            <input
                                type="number"
                                min="1"
                                value={form.noHead}
                                onChange={handleHeadChange}
                                className="w-full sm:w-1/3 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Expense List */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-slate-300">Expenses List</label>
                                <button
                                    onClick={handleAddExpense}
                                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 uppercase tracking-wide flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Entry
                                </button>
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {form.expenses.length === 0 ? (
                                    <p className="text-slate-500 text-center py-4 italic">No expenses added yet.</p>
                                ) : (
                                    form.expenses.map((expense, i) => (
                                        <ExpenseEntry
                                            key={i}
                                            index={i}
                                            expense={expense}
                                            onChange={handleExpenseChange}
                                            onDelete={handleDeleteExpense}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm transition"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

BudgetDetailModal.propTypes = {
    form: PropTypes.shape({
        expenses: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })).isRequired,
        total: PropTypes.number,
        result: PropTypes.number,
        noHead: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    index: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default BudgetDetailModal;
