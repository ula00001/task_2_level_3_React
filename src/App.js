import { Component } from 'react';
import math from 'mathjs-expression-parser'
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
    const inputFormula = this.state.formula
    const res = this.resultFunc(inputFormula)
    this.setState({
      inputFormula: inputFormula,
      res: res
    })
  }

  resultFunc = (value) => {
    let res;
    try{
      res = math.eval(value);
      if(this.state.checkResult !== 'Правильно!'){
        this.setState({
          checkResult: 'Правильно!'
        })
      }
    }
    catch(err){
      res = '';
      if(this.state.checkResult !== 'Неверное выражение'){
        this.setState({
          checkResult: 'Неверное выражение'
        })
      }
    }
    return res;
  }

  checkResultColor = () => {
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
          Правильность: <span style={{color: this.checkResultColor()}}>{this.state.formula ? this.state.checkResult : ""}</span>
        </p>
      </div>
    );
  }

}

export default App;
