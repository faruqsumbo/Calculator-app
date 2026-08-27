import React, { use } from "react"
import { useState } from "react";
import './btnPad.css';
import { math } from "./mathUtilis";

export function BtnPad() {
    const [dispValue, setDispValue] = useState('');
    const [evalValue, setEvalValue] = useState('')
    const [result, setResult] = useState('')
    const [isDeg, setIsDeg] = useState(false)
    const [isInv, setIsInv] = useState(false);
    const [isBasic, setIsBasic] = useState(true);


    const handleInv = () => {

        setIsInv(prev => !prev)

    };

    const trigFuncs = isInv ? {
        sin: 'asin',
        cos: 'acos',
        tan: 'atan',

    } : {
        sin: 'sin',
        cos: 'cos',
        tan: 'tan'
    };

    const mathMapping = {
        'log(': 'log10(',
        'ln(': 'log(',
        '√(': 'sqrt(',
        'e': 'e',
        'π': 'pi'

    };

    const handleIsDeg = () => {

        setIsDeg(prev => !prev);

    };


    const handleClick = (value) => {


        const regex = /(sin|cos|tan)\(\d+$/;
        if (regex.test(dispValue) && !isInv && isDeg && value === ')') {
            setEvalValue(prev => prev + ' deg)');
        } else {
            const evalAddition = mathMapping[value] || value;
            setEvalValue(prev => prev + evalAddition);

        }
        setDispValue(prev => prev + value);

    };


    const handleDelete = () => {
        const dispRegex = /(asin|acos|atan|sin|cos|tan|log|ln|√)\($/;
        const evalRegex = /(asin|acos|atan|sin|cos|tan|log|log10|sqrt)\($/;
        if (dispRegex.test(dispValue) || evalRegex.test(evalValue)) {
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
        console.log(evalValue);
        let initialEvalValue;
        const arcRegex = /(asin|acos|atan)\((\d*(?:\.\d+)?)\)/g;

        if (isDeg) {
            initialEvalValue = evalValue.replace(arcRegex, (match, number) => {
                const rad = math.evaluate(match)
                console.log('rad:', rad);
                const deg = math.evaluate('rad * 180 / pi', { rad: rad });
                return deg;
            })
        }
        console.log('evalValue:', evalValue);
        if (e && e.preventDefault) e.preventDefault();
        const factRegex = /(\d+)!/g;
        const newEvalValue = initialEvalValue ? initialEvalValue : evalValue;
        const newerEvalValue = newEvalValue.replace(factRegex, (match, number) => {
            let result = 1;
            for (let i = 2; i <= parseInt(number); i++) {
                result *= i;
            }
            return result;
        });

        try {
            const currentResult = String(math.evaluate(newerEvalValue));
            if (currentResult === 'Infinity' || currentResult === '-Infinity' || currentResult === 'NaN') {
                setResult('error')
            } else {
                setResult(Number(currentResult))
            }

        } catch (error) {
            setResult('error');
        }
        console.log(typeof result);
        setDispValue('')
        setEvalValue('')
    };

    return (
        <div className="container">
            <div className="displays">
                <input type="text" className="type-disp" name="output" id="disp-output" value={dispValue || ''}  readOnly />
                <input type="text" className="result-disp" name="result" id="result" value={result || ''} readOnly />
            </div>
            <div className="btn-pads">
                <div className={`basic-pad ${isBasic ? "active-pad" : "inactive-pad"}`}>
                    <div className="row">
                        <button type="button" className="btn" id="clear" onClick={() => { setDispValue(''); setResult(''); setEvalValue('') }}>AC</button>
                        <button type="button" className="btn" id="mod" onClick={() => handleClick('%')}>%</button>
                        <button type="button" className="btn" id="div" onClick={() => handleClick('/')}>/</button>
                        <button type="button" className="btn" id="mult" onClick={() => handleClick('*')}>*</button>

                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="one-btn" onClick={() => handleClick('1')}>1</button>
                        <button type="button" className="btn" id="two-btn" onClick={() => handleClick('2')}>2</button>
                        <button type="button" className="btn" id="three-btn" onClick={() => handleClick('3')}>3</button>
                        <button type="button" className="btn" id="plus-btn" onClick={() => handleClick('+')}>+</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="four-btn" onClick={() => handleClick('4')}>4</button>
                        <button type="button" className="btn" id="five-btn" onClick={() => handleClick('5')}>5</button>
                        <button type="button" className="btn" id="six-btn" onClick={() => handleClick('6')}>6</button>
                        <button type="button" className="btn" id="minus-btn" onClick={() => handleClick('-')}>-</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="seven-btn" onClick={() => handleClick('7')}>7</button>
                        <button type="button" className="btn" id="eight-btn" onClick={() => handleClick('8')}>8</button>
                        <button type="button" className="btn" id="nine-btn" onClick={() => handleClick('9')}>9</button>
                        <button type="button" className="btn" id="square-btn" onClick={() => handleClick('^2')}>X<sup>2</sup></button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="dot-btn" onClick={() => handleClick('.')}>.</button>
                        <button type="button" className="btn" id="zero-btn" onClick={() => handleClick('0')}>0</button>
                        <button type="button" className="btn" id="equals-btn" onClick={() => handleEval()}>=</button>
                        <button type="button" className="btn" id="delete-btn" onClick={() => handleDelete()}>&#x232B;</button>
                    </div>

                </div>
                <div className={`trig-pad ${isBasic ? "inactive-pad" : "active-pad"}`}>
                    <div className="row">
                        <button type="button" className="btn" id="pi-btn" onClick={() => handleClick('π')}>π</button>
                        <button type="button" className="btn" id="e-btn" onClick={() => handleClick('e')}>e</button>
                        <button type="button" className="btn" id="fact-btn" onClick={() => handleClick('!')}>x!</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="brac-open-btn" onClick={() => handleClick('(')}>{'('}</button>
                        <button type="button" className="btn" id="brac-close-btn" onClick={() => handleClick(')')}>{')'}</button>
                        <button type="button" className="btn" id="tan-btn" onClick={() => handleClick(`${trigFuncs.tan}(`)}>{trigFuncs.tan}</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="sin-btn" onClick={() => handleClick(`${trigFuncs.sin}(`)}>{trigFuncs.sin}</button>
                        <button type="button" className="btn" id="cos-btn" onClick={() => handleClick(`${trigFuncs.cos}(`)}>{trigFuncs.cos}</button>
                        <button type="button" className="btn" id="log-btn" onClick={() => handleClick('log(')}>log</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="power-btn" onClick={() => handleClick('^')}>X<sup>y</sup> </button>
                        <button type="button" className="btn" id="sqrt-btn" onClick={() => handleClick('√(')}> &#8730;x</button>
                        <button type="button" className="btn" id="ln-btn" onClick={() => handleClick('ln(')}>ln</button>
                    </div>
                    <div className="row">
                        <button type="button" className="btn" id="inv-btn" onClick={() => handleInv()}>Inv</button>
                        <input type="button" className="btn" id="deg-btn" value={isDeg ? 'Deg' : 'Rad'} onClick={() => handleIsDeg()} />
                        <button type="button" className="btn" id="ans-btn" onClick={() => setDispValue(result || '')}>Ans</button>
                    </div>
                </div>

            </div>
            <input type='button' className= "toggle-btn" value={isBasic ? 'Trig' : 'Basic'} onClick={() => setIsBasic(prev => !prev)} />
        </div>
    )
}

