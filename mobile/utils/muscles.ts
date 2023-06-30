export const musclesArray = [
  "abdominals",
  "hamstrings",
  "calves",
  "shoulders",
  "adductors",
  "glutes",
  "quadriceps",
  "biceps",
  "forearms",
  "abductors",
  "triceps",
  "chest",
  "lower back",
  "traps",
  "back",
  "lats"
]

export const musclesObjectForDropdown = () => {
  return musclesArray.map(muscle => ({value: muscle, label: muscle.toLocaleUpperCase()}));
}