import React, { use } from "react"
import { useState } from "react";
import './btnPad.css';

export function BtnPad() {
    const [dispValue, setDispValue] = useState('');
    const [evalValue, setEvalValue] = useState('')
    const [result, setResult] = useState('')
    const [isDeg, setIsDeg] = useState(false)
    const mathMapping = isDeg ? {
        'sin(': `Math.sin(Math.PI/180*`,
        'cos(': `Math.cos(Math.PI/180*`,
        'tan(': `Math.tan(Math.PI/180*`,
        'log(': 'Math.log10(',
        'ln(': 'Math.log(',
        '√(': 'Math.sqrt(',
        'e': 'Math.exp(1)',
        'π': 'Math.PI'
    } : {
        'sin(': 'Math.sin(',
        'cos(': 'Math.cos(',
        'tan(': 'Math.tan(',
        'log(': 'Math.log10(',
        'ln(': 'Math.log(',
        '√(': 'Math.sqrt(',
        'e': 'Math.exp(1)',
        'π': 'Math.PI'
    };

    const handleIsDeg = () => {
        setIsDeg(prev => !prev);
        if (!isDeg) {

        }
    };

    const handleClick = (value) => {
        setDispValue(prev => prev + value);

        const evalAddition = mathMapping[value] || value;
        setEvalValue(prev => prev + evalAddition);
    };

    const handleDelete = () => {
        const dispRegex = /(sin|cos|tan|log|ln\(|√)\($/;
        const evalRegex = /(Math\.sin\(|Math\.cos\(|Math\.tan\(|Math\.log10\(|Math\.log\(|Math\.sqrt\(|Math\.sin\(Math\.PI\/180\*|Math\.cos\(Math\.PI\/180\*|Math\.tan\(Math\.PI\/180\*)$/;
        if (dispRegex.test(dispValue)) {
            const newDispValue = dispValue.replace(dispRegex, '');
            const newEvalValue = evalValue.replace(evalRegex, '');
            setDispValue(newDispValue);
            setEvalValue(newEvalValue);
        } else {
            const slicedDispValue = dispValue.slice(0, -1);
            const slicedEvalValue = evalValue.slice(0, -1);
            setEvalValue(slicedEvalValue)
            setDispValue(slicedDispValue)
        }
    };

    const handleEval = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const factRegex = /(\d+)!/g;
        const newEvalValue = evalValue.replace(factRegex, (match, number) => {
            let result = 1;
            for (let i = 2; i <= parseInt(number); i++) {
                result *= i;
            }
            return result;
        });

        console.log(newEvalValue)
        try {
            const currentResult = String(eval(newEvalValue));
            if (currentResult === 'Infinity' || currentResult === '-Infinity' || currentResult === 'NaN') {
                setResult('Error')
                console.log("4a. Math error caught (Infinity/NaN). Setting states to Error.");

            } else {
                setResult(currentResult)
            }

        } catch (error) {
            console.log("4b. Calculation successful. Updating display with numbers.");

            setResult('Error');
            setDispValue(() => 'Error'); // 🟢 THIS ensures the screen actually updates!
            setEvalValue('');
        }
        setDispValue('')
        setEvalValue('')
    };

    return (
        <div className="container">
            <div className="displays">
                <input type="text" className="display" name="output" id="disp-output" value={dispValue || ''} onChange={e => { setDispValue(e.target.value) }} readOnly />
                <input type="text" className="display" name="result" id="result" value={result || ''} readOnly />
            </div>
            <div className="btn-rows">
                <div className="row">
                    <button type="button" className="btn" id="clear" onClick={() => { setDispValue(''); setResult(''); setEvalValue('') }}>AC</button>
                    <button type="button" className="btn" id="mod" onClick={() => handleClick('%')}>%</button>
                    <button type="button" className="btn" id="div" onClick={() => handleClick('/')}>/</button>
                    <button type="button" className="btn" id="mult" onClick={() => handleClick('*')}>*</button>
                    <button type="button" className="btn" id="pi-btn" onClick={() => handleClick('π')}>π</button>
                    <button type="button" className="btn" id="e-btn" onClick={() => handleClick('e')}>e</button>
                    <button type="button" className="btn" id="fact-btn" onClick={() => handleClick('!')}>x!</button>
                </div>
                <div className="row">
                    <button type="button" className="btn" id="one-btn" onClick={() => handleClick('1')}>1</button>
                    <button type="button" className="btn" id="two-btn" onClick={() => handleClick('2')}>2</button>
                    <button type="button" className="btn" id="three-btn" onClick={() => handleClick('3')}>3</button>
                    <button type="button" className="btn" id="plus-btn" onClick={() => handleClick('+')}>+</button>
                    <button type="button" className="btn" id="brac-open-btn" onClick={() => handleClick('(')}>{'('}</button>
                    <button type="button" className="btn" id="brac-close-btn" onClick={() => handleClick(')')}>{')'}</button>
                    <button type="button" className="btn" id="tan-btn" onClick={() => handleClick('tan(')}>tan</button>
                </div>
                <div className="row">
                    <button type="button" className="btn" id="four-btn" onClick={() => handleClick(4)}>4</button>
                    <button type="button" className="btn" id="five-btn" onClick={() => handleClick('5')}>5</button>
                    <button type="button" className="btn" id="six-btn" onClick={() => handleClick('6')}>6</button>
                    <button type="button" className="btn" id="minus-btn" onClick={() => handleClick('-')}>-</button>
                    <button type="button" className="btn" id="sin-btn" onClick={() => handleClick('sin(')}>sin</button>
                    <button type="button" className="btn" id="cos-btn" onClick={() => handleClick('cos(')}>cos</button>
                    <button type="button" className="btn" id="log-btn" onClick={() => handleClick('log(')}>log</button>
                </div>
                <div className="row">
                    <button type="button" className="btn" id="seven-btn" onClick={() => handleClick('7')}>7</button>
                    <button type="button" className="btn" id="eight-btn" onClick={() => handleClick('8')}>8</button>
                    <button type="button" className="btn" id="nine-btn" onClick={() => handleClick('9')}>9</button>
                    <button type="button" className="btn" id="square-btn" onClick={() => setDispValue(prev => prev + ('<sup>2</sup>'))}>X<sup>2</sup></button>
                    <button type="button" className="btn" id="power-btn" onClick={() => handleClick('')}>X<sup>y</sup> </button>
                    <button type="button" className="btn" id="sqrt-btn" onClick={() => handleClick('√(')}> &#8730;x</button>
                    <button type="button" className="btn" id="ln-btn" onClick={() => handleClick('ln(')}>ln</button>

                </div>
                <div className="row">
                    <button type="button" className="btn" id="dot-btn" onClick={() => handleClick('.')}>.</button>
                    <button type="button" className="btn" id="zero-btn" onClick={() => handleClick('0')}>0</button>
                    <button type="button" className="btn" id="equals-btn" onClick={() => handleEval()}>=</button>
                    <button type="button" className="btn" id="delete-btn" onClick={() => handleDelete()}>&#x232B;</button>
                    <button type="button" className="btn" id="inv-btn" onClick={() => setResult(1 / result)}>Inv</button>
                    <input type="button" className="btn" id="deg-btn" value={isDeg ? 'Deg' : 'Rad'} onClick={() => setIsDeg(isDeg ? false : true)} />
                    <button type="button" className="btn" id="ans-btn" onClick={() => setDispValue(result)}>Ans</button>
                </div>
            </div>
        </div>
    )
}

