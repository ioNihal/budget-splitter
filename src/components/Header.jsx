import React from 'react';
import '../styles/Header.css';

const Header = () => {

    const onDigIn = () => {
        document.getElementById('budgetSplitter')
            .scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container" id="landing">
            <div className="left-sec">
                <h1>BUDGET SPLITTER</h1>
            </div>
            <div className="right-sec">
                <div className="about-con">
                    <h1>
                        Trouble splitting <span>expense</span> with your friends?
                    </h1>
                    <h3>WE GOT YOU BUB!!!</h3>
                    <button type="button" onClick={onDigIn}>
                        DIG IN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
