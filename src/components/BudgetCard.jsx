
import PropTypes from 'prop-types';

const BudgetCard = ({ index, total, expenseCount, onClick, onDelete }) => {
    return (
        <div
            className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-orange-900/20 transition duration-300 border border-slate-700 flex flex-col justify-between h-48 relative group"
            onClick={onClick}
        >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="text-slate-500 hover:text-red-500 p-1 rounded-full hover:bg-slate-700"
                    title="Delete Form"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">Budget #{index + 1}</h3>
                <p className="text-slate-400 text-sm">{expenseCount} {expenseCount === 1 ? 'Expense' : 'Expenses'}</p>
            </div>

            <div className="mt-4">
                <p className="text-slate-500 text-xs uppercase tracking-wide">Total Amount</p>
                <p className="text-2xl font-bold text-orange-500">
                    {total !== null ? `₹${total.toFixed(2)}` : '₹0.00'}
                </p>
            </div>
        </div>
    );
};

BudgetCard.propTypes = {
    index: PropTypes.number.isRequired,
    total: PropTypes.number,
    expenseCount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default BudgetCard;
