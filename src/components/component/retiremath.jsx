'use client'
import React, { useState, useEffect } from 'react';

function RetirementCalculator() {
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [timesPerYear, setTimesPerYear] = useState(1);
    const [years, setYears] = useState(0);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const interestRate = rate / 100;
        const compoundInterest = principal * Math.pow((1 + interestRate / timesPerYear), timesPerYear * years);
        setResult(compoundInterest);
    }, [principal, rate, timesPerYear, years]);

    return (
        <div>
            <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="Principal" />
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Interest Rate (%)" />
            <input type="number" value={timesPerYear} onChange={e => setTimesPerYear(e.target.value)} placeholder="Times Compounded Per Year" />
            <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="Years" />
            <p>Result: {result}</p>
        </div>
    );
}

export default RetirementCalculator;