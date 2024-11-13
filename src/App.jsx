import './App.css'
import React, { useState, useEffect } from 'react';
import CodeGuesser from './CodeGuesser/CodeGuesser.jsx'
import EngineFinder from './EngineFinder/EngineFinder.jsx';
import MiscCheatSheet from './MiscCheatSheet/MiscCheatSheet.jsx';

function App() {
    const [activeSection, setActiveSection] = useState(null);
    useEffect(() => {
        document.title = "Payday Helper"; // Set the title here
    }, [activeSection]);


    const renderSection = () => {
      switch (activeSection) {
        case 'CodeGuesser':
          return <CodeGuesser />;
        case 'Engine Finder':
          return <EngineFinder />;
        case 'MiscCheatSheet':
          return <MiscCheatSheet/>;
        default:
          return <div>
                    <h1 id='welcome'> 
                        Welcome to the payday helper!
                    </h1>
                    <br />
                    <h3 id='welcome-message'>
                        This page strives to aid in all the small misc. task where a guide could be useful.
                    </h3>
                    <h3 id='welcome-message'> The website includes:
                        <ul> 
                            <p>A code guesser for any 4 digit coded doors in Payday 3</p>
                            <p>A map to help find the correct diesel engine in Payday 2</p>
                            <p>Misc. Cheat sheets for P3 to help get an overview</p>
                        </ul>
                    </h3>
                </div>;
      }
    };
  
    return (
      <div id='program'>
        <div id='header'>
            <h1 onClick={() => setActiveSection(null)} style={{ cursor: 'pointer' }}> Payday Helper</h1>
            <nav id='nav-buttons'>
                <button onClick={() => setActiveSection('CodeGuesser')}>Code Guesser for P3</button>
                <button onClick={() => setActiveSection('Engine Finder')}>Correct Diesel Engine for P2</button>
                <button onClick={() => setActiveSection('MiscCheatSheet')}>Misc. Cheat sheets for P3</button>
            </nav>
        </div>
  
        <div>
          {renderSection()}
        </div>
      </div>
    );
  }

export default App
