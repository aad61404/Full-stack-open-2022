import React from 'react';
import logo from './logo.svg';
import './App.css';

function Header(props) {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  return (
    <div>
      <h1>{ course }</h1>
      <p>
        {part1} {props.exercises1}
      </p>
    </div>
  )
}

function Content(props) {
  const part2 = 'Using props to pass data';
  
  return (
    <div>
      <p>
        {part2} {props.chapter}
      </p>
    </div>
  )
}

function Total(props) {
  const part3 = 'State of a component';

  return (
    <div>
      <p>
        {part3} {props.pratice}
      </p>
    </div>
  )
}

function App() {

  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  const style = {
    backgroundColor: 'red',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };
  return (
    <div style={ {padding: '15px'} }>
      <Header course={ exercises1 } />
      <Content chapter={ exercises2 } />
      <Total pratice={ exercises3 } />
      <p>Number of exercise { exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App;
