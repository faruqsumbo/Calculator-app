import React, { use } from "react"
import { useState } from "react";
import './btnPad.css';

export function BtnPad() {
    const [dispValue, setDispValue] = useState('');
    const [evalValue, setEvalValue] = useState('')
    const [result, setResult] = useState('')
    const handleClick = (value) => {
        const mathMapping = {
            'sin(': 'Math.sin(',
            'cos(': 'Math.cos(',
            'tan(': 'Math.tan(',
            'log(': 'Math.log10(',
            'ln(': 'Math.log(',
            '√(': 'Math.sqrt(',
            'e': 'Math.exp(1)'
        };

        setDispValue(prev => prev + value);

        const evalAddition = mathMapping[value] || value;
        setEvalValue(prev => prev + evalAddition);
    };

    const handleDelete = () => {
        const slicedValue = dispValue.slice(0, -1)
        console.log(slicedValue)
        setDispValue(slicedValue)
    }

    const handleEval = () => {
        console.log(evalValue)
        try {
            setResult(eval(evalValue))

        } catch (error) {
            setResult('Error')
        }
        setDispValue('')
        setEvalValue('')
    };

    return (
        <div className="container">
            <div className="displays">
                <input type="text" className="display" name="output" id="disp-output" value={dispValue} onChange={e => { setDispValue(e.target.value) }} readOnly />
                <input type="number" className="display" name="result" id="result" value={result} readOnly />
            </div>
            <div className="btn-rows">
                <div className="row">
                    <button type="button" className="btn" id="clear" onClick={() => { setDispValue(''); setResult('') }}>AC</button>
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
                    <button type="button" className="btn" id="dot-btn">.</button>
                    <button type="button" className="btn" id="zero-btn" onClick={() => handleClick('0')}>0</button>
                    <button type="button" className="btn" id="equals-btn" onClick={() => handleEval()}>=</button>
                    <button type="button" className="btn" id="delete-btn" onClick={() => handleDelete()}>&#x232B;</button>
                    <button type="button" className="btn" id="inv-btn">Inv</button>
                    <button type="button" className="btn" id="deg-btn">Deg</button>
                    <button type="button" className="btn" id="ans-btn" onClick={() => setDispValue(result)}>Ans</button>
                </div>
            </div>
        </div>
    )
}

