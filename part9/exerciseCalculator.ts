type rating = 1 | 2 | 3

interface calculateResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: rating
  ratingDescription: string
  target: number
  average: number
}

function calculateExercises(
  targetDailyHours: number,
  dailyHours: number[]
): calculateResult {
  const totalHours: number = dailyHours.reduce(
    (total, hours) => total + hours,
    0
  )
  const average: number = totalHours / dailyHours.length

  let rating: rating = 1
  if (average >= targetDailyHours - 1) rating = 2
  if (average >= targetDailyHours) rating = 3
  const ratingDescription: { [key: number]: string } = {
    1: 'a little far from the target 😴',
    2: 'not too bad but could be better 😛',
    3: 'goal accomplished 🎉',
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hours) => hours > 0).length,
    success: rating === 3,
    rating,
    ratingDescription: ratingDescription[rating],
    target: targetDailyHours,
    average,
  }
}

console.log(calculateExercises(1, [3, 0, 2, 4.5, 0, 3, 1]))
console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
console.log(calculateExercises(3, [3, 0, 2, 4.5, 0, 3, 1]))

/*
{
  periodLength: 7,
  trainingDays: 5,
  success: true,
  rating: 3,
  ratingDescription: 'goal accomplished 🎉',
  target: 1,
  average: 1.9285714285714286
}
{
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better 😛',
  target: 2,
  average: 1.9285714285714286
}
{
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 1,
  ratingDescription: 'a little far from the target 😴',
  target: 3,
  average: 1.9285714285714286
}
*/