import "./App.css";

const Header = ({ course }) => {
  return <h3>{course.name}</h3>;
};

const Part = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Content = ({ course }) => {
  // console.log('course', course);
  const totalStyle = {
    fontWeight: "bold",
  };

  const totalExercises = (parts) => {
    const result = parts.reduce(function (acc, obj) {
      return acc + obj.exercises;
    }, 0);
    return result;
  };

  return (
    <>
      {course.parts.map((part) => (
        <Part text={part.name} value={part.exercises} />
      ))}
      <div style={totalStyle}>
        total of {totalExercises(course.parts)} exercises
      </div>
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
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h2>Web development cirruculum</h2>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
}

export default App;
