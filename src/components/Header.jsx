import React from 'react';

const Header = () => {
    return (
        <header className="py-6 mb-8 text-center sm:text-left sm:flex sm:justify-between sm:items-center">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    BUDGET SPLITTER
                </h1>
                <p className="text-slate-400 mt-1">Split expenses easily with friends.</p>
            </div>
            <div className="mt-4 sm:mt-0">
                <button
                    onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-lg"
                >
                    Get Started
                </button>
            </div>
        </header>
    );
};

export default Header;
