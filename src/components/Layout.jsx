import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-slate-950 text-center py-6 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <p className="text-slate-400 text-sm">
                        Budget Splitter App
                    </p>
                    <p className="text-slate-500 text-xs mt-2">
                        Designed for simplicity and ease of use.
                    </p>
                </div>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
