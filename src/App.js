import React, { Component } from 'react';
import math from 'mathjs-expression-parser'
import _clone from 'lodash/clone'
import _escapeRegExp from 'lodash/escapeRegExp'
import './App.css';


class App extends Component {

  state = {
    formula: '',
    inputFormula: '',
    res: '',
    checkResult: ''
  };

  componentDidMount = () => {
    this.checkFormula()
  }

  changeFormula = (e) => {
    this.setState({
      formula: e.target.value
    }, this.checkFormula)
  }

  checkFormula = () => {
    const inputFormula = this.inputFields(this.state.formula)
    const res = this.resultFunc(inputFormula)
    this.setState({
      inputFormula: inputFormula,
      res: res
    })
  }

  inputFields = (formula) => {
    let swappedFormula = _clone(formula)
    const variables = swappedFormula.match(/\{[^\{\}]+\}/gi) || []
    const variablesArray = variables.map(myVariableWithBrackets => {
      return myVariableWithBrackets.slice(1, -1)
    })
    variablesArray.map(myVariable => {
      swappedFormula = swappedFormula.replace(
        new RegExp('{'+_escapeRegExp(myVariable)+'}', 'gi'),
        '1'
      )
    })
    return swappedFormula
  }

  resultFunc = (mathString) => {
    let res
    try{
      res = math.eval(mathString)
      if(this.state.checkResult !== 'Правильно!'){
        this.setState({
          checkResult: 'Правильно!'
        })
      }
    }
    catch(err){
      console.log(err)
      res = ''
      if(this.state.checkResult !== 'Неверное выражение'){
        this.setState({
          checkResult: 'Неверное выражение'
        })
      }
    }
    return res
  }

  getcheckResultColor = () => {
    if(this.state.checkResult === 'Правильно!'){
      return 'green'
    }
    else{
      return 'red'
    }
  }

  render() {

    return (
      <div className='App'>
        <p>
          Введите формулу:
        </p>
          <input style={{width: '300px'}} type="text" value={this.state.formula} onChange={this.changeFormula} /> = {this.state.res}

        <p>
          Правильность: <span style={{color: this.getcheckResultColor()}}>{this.state.checkResult}</span>
        </p>
      </div>
    );
  }

}

export default App;
