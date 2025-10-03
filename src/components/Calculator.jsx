import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const deleteLastChar = () => {
    if (!waitingForOperand) {
      const newDisplay = display.slice(0, -1)
      setDisplay(newDisplay === '' ? '0' : newDisplay)
    }
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let newValue = currentValue

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue
          break
        case '-':
          newValue = currentValue - inputValue
          break
        case '*':
          newValue = currentValue * inputValue
          break
        case '/':
          if (inputValue === 0) {
            setDisplay('Error')
            setPreviousValue(null)
            setOperation(null)
            setWaitingForOperand(true)
            return
          }
          newValue = currentValue / inputValue
          break
        default:
          break
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (operation && previousValue !== null) {
      const currentValue = previousValue
      let newValue = currentValue

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue
          break
        case '-':
          newValue = currentValue - inputValue
          break
        case '*':
          newValue = currentValue * inputValue
          break
        case '/':
          if (inputValue === 0) {
            setDisplay('Error')
            setPreviousValue(null)
            setOperation(null)
            setWaitingForOperand(true)
            return
          }
          newValue = currentValue / inputValue
          break
        default:
          break
      }

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button className="btn btn-function" onClick={clear}>C</button>
        <button className="btn btn-function" onClick={deleteLastChar}>DEL</button>
        <button className="btn btn-operator" onClick={() => performOperation('/')}>/</button>
        <button className="btn btn-operator" onClick={() => performOperation('*')}>*</button>
        
        <button className="btn" onClick={() => inputDigit(7)}>7</button>
        <button className="btn" onClick={() => inputDigit(8)}>8</button>
        <button className="btn" onClick={() => inputDigit(9)}>9</button>
        <button className="btn btn-operator" onClick={() => performOperation('-')}>-</button>
        
        <button className="btn" onClick={() => inputDigit(4)}>4</button>
        <button className="btn" onClick={() => inputDigit(5)}>5</button>
        <button className="btn" onClick={() => inputDigit(6)}>6</button>
        <button className="btn btn-operator" onClick={() => performOperation('+')}>+</button>
        
        <button className="btn" onClick={() => inputDigit(1)}>1</button>
        <button className="btn" onClick={() => inputDigit(2)}>2</button>
        <button className="btn" onClick={() => inputDigit(3)}>3</button>
        <button className="btn btn-equals" onClick={handleEquals}>=</button>
        
        <button className="btn btn-zero" onClick={() => inputDigit(0)}>0</button>
        <button className="btn" onClick={inputDecimal}>.</button>
      </div>
    </div>
  )
}

export default Calculator