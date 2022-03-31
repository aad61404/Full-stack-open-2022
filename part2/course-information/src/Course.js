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

const Total = ({ course }) => {
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
    <div style={totalStyle}>
      total of {totalExercises(course.parts)} exercises
    </div>
  );
};

const Content = ({ course }) => {
  // console.log('course', course);

  return (
    <>
      {course.parts.map((part) => (
        <Part text={part.name} value={part.exercises} key={part.id} />
      ))}
      <Total course={course} />
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

export default Course;
