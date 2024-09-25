import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BudgetSplitter from './components/BudgetSplitter';

const App = () => {
    return (
        <>
            <Header />
            <BudgetSplitter />
        </>
    );
};

export default App;
