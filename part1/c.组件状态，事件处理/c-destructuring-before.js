// 1. basic
const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

// 2. destructuring

const Hello = (props) => {
  const name = props.name;
  const age = props.age;

  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div style={ {padding: "15px"} }>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

// 3.    表达式 const { name, age } = props 
//       会将值 'Arto Hellas' 赋值给 name，35赋值给 age。

const Hello = (props) => {
  const { name, age } = props;
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

/*
  props = {
  name: 'Arto Hellas',
  age: 35,
}
  */
