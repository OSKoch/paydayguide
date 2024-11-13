import React, { useState, useEffect } from 'react';
import styles from './EngineFinder.module.css';

function EngineFinder() {
    const [hydrogen, setHydrogen] = useState("");
    const [gasType, setGasType] = useState("");
    const [psi, setPsi] = useState("");
    const [possibleEngines, setPossibleEngines] = useState([]); // Track engines that match criteria

    // Sample engine data
    const engines = [
        { id: 12, hydrogen: "3", gasType: "deterium", psi: "above" },
        { id: 7, hydrogen: "3", gasType: "helium", psi: "below" },
        { id: 2, hydrogen: "1", gasType: "deterium", psi: "above" },
        { id: 1, hydrogen: "1", gasType: "nitrogen", psi: "below" },
        
        { id: 10, hydrogen: "3", gasType: "helium", psi: "above" },
        { id: 9, hydrogen: "3", gasType: "deterium", psi: "below" },
        { id: 4, hydrogen: "2", gasType: "nitrogen", psi: "above" },
        { id: 3, hydrogen: "2", gasType: "helium", psi: "above" },

        { id: 8, hydrogen: "3", gasType: "nitrogen", psi: "below" },
        { id: 11, hydrogen: "3", gasType: "nitrogen", psi: "above" },
        { id: 6, hydrogen: "2", gasType: "helium", psi: "above" },
        { id: 5, hydrogen: "2", gasType: "deterium", psi: "below" }, 
        
    ];

    // Filter engines based on user selection
    useEffect(() => {
        const filteredEngines = engines.filter(engine => 
            (hydrogen === "" || engine.hydrogen === hydrogen) &&
            (gasType === "" || engine.gasType === gasType) &&
            (psi === "" || engine.psi === psi)
        );
        setPossibleEngines(filteredEngines);
    }, [hydrogen, gasType, psi]);

    const leftRoomEngines = engines.filter(engine => [12, 7, 10, 9, 8, 11].includes(engine.id));
    const rightRoomEngines = engines.filter(engine => [1, 2, 3, 4, 5, 6].includes(engine.id));


    function handleHydrogenChange(event) {
        setHydrogen(event.target.value);
    }

    function handleGasTypeChange(event) {
        setGasType(event.target.value);
    }

    function handlePsiChange(event) {
        setPsi(event.target.value);
    }

    function resetValues() {
        setHydrogen("");
        setGasType("");
        setPsi("");    
    }

    return (
        <>
            <h1>Payday 2 Engine Finder</h1>
            <div className={styles.engineInput}>
                <select value={hydrogen} onChange={handleHydrogenChange}>
                    <option value="" disabled>Select H value</option>
                    <option value="1">H</option>
                    <option value="2">2 x H</option>
                    <option value="3">3 x H</option>
                </select>

                <select value={gasType} onChange={handleGasTypeChange}>
                    <option value="" disabled>Select gas type value</option>
                    <option value="deterium">Deterium</option>
                    <option value="helium">Helium</option>
                    <option value="nitrogen">Nitrogen</option>
                </select>

                <select value={psi} onChange={handlePsiChange}>
                    <option value="" disabled>Select psi value</option>
                    <option value="above">≥ 5783</option>
                    <option value="below">≤ 5812</option>
                </select>

                <button className={styles.resetButton} onClick={resetValues}>Reset</button>
            </div>

            <div className={styles.container}>
            <h2>Doors</h2>
            <div className={styles.rooms}>
                {/* Left Room */}
                <div className={styles.room}>
                    {leftRoomEngines.map(engine => (
                        <div
                            key={engine.id}
                            className={`${styles.engine} ${possibleEngines.some(e => e.id === engine.id) ? styles.highlighted : ''}`}
                        >
                            #{engine.id}
                        </div>
                    ))}
                </div>

                {/* Space between rooms */}
                <div className={styles.stairs}>whiteboard</div>

                {/* Right Room */}
                <div className={styles.room}>
                    {rightRoomEngines.map(engine => (
                        <div
                            key={engine.id}
                            className={`${styles.engine} ${possibleEngines.some(e => e.id === engine.id) ? styles.highlighted : ''}`}
                        >
                            #{engine.id}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
        </>
    );
}

export default EngineFinder;