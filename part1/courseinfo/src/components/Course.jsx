const Header = ({course}) => {
  return (
  <h2>{course}</h2>
  )
}

const Part = ({part})=> {
  const {name, exercises} = part;
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = ({total}) => {
  return <p><strong>Number of exercises {total}</strong></p>
}

const Course = ({course}) => {

  const total = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0,
  )

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course;