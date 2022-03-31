import "./App.css";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Content = ({ course }) => {
  console.log(course);
  return (
    <>
      <Part text={course.parts[0].name} value={course.parts[0].exercises} />
      <Part text={course.parts[1].name} value={course.parts[1].exercises} />
      <Part text={course.parts[2].name} value={course.parts[2].exercises} />
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

function App() {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
}

export default App;
