import { GetAuthToken } from "./auth";
import { BaseURL } from "./url";

export interface Exercise {
  id: number,
  name: string,
  primary_muscles: Array<string>,
  secondarY_muscles: Array<string>,

}
export interface Workout {
  id: number,
  user_id: number,
  workout_date: string,
  created_at: string
}

export interface WorkoutExercise {
  id?: number,
  reps: number,
  sets: number,
  weight: number,
  exercise_id: number,
  user_workout_id: number,
}

export const CreateUserWorkoutExercise = async (workoutExercise: WorkoutExercise) => {
  const authToken = await GetAuthToken();

  if(authToken == null) {
    return [];
  }
  const url = `${BaseURL()}/user_workout_exercises`;
  try {
    const apiCall = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(workoutExercise)
    })
    await apiCall.json();
  }
  catch {
    alert("There was an error.")
    return [];
  }
}

export const GetAllUserWorkoutExercises = async (user_workout_id: number) => {
  const authToken = await GetAuthToken();

  if(authToken == null) {
    return [];
  }
  const url = `${BaseURL()}/user_workout_exercises?user_workout_id=${user_workout_id}`;
  try {
    const apiCall = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })
    const data: Array<WorkoutExercise> = await apiCall.json();
    return data;
  }
  catch {
    alert("There was an error.")
    return [];
  }
}

export const CreateOrFetchUserWorkout = async (month: number, year: number, day: number) => {
  const authToken = await GetAuthToken();

  if(authToken == null) {
    return null;
  }

  const url = `${BaseURL()}/user_workouts`;

  try {
    const apiCall = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        month,
        year,
        day
      })
    })
    const data: Workout = await apiCall.json();
    return data;
  }
  catch {
    alert("There was an error.")
    return null;
  }
}

export const GetExercisesForMuscle = async (muscle: string) => {
  const url = `${BaseURL()}/exercises?primary_muscle=${muscle}`;

  try {
    const apiCall = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: Array<Exercise> = await apiCall.json();
    return data;
  }
  catch {
    alert("There was an error.")
    return [];
  }
}

export const GetWorkoutsForMonthAndYear = async (month: number, year: number) => {
  const authToken = await GetAuthToken();

  if(authToken == null) {
    return [];
  }

  const url = `${BaseURL()}/user_workouts?month=${month}&year=${year}`;

  try {
    const apiCall = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })
    const data: Array<Workout> = await apiCall.json();
    return data;
  }
  catch {
    alert("There was an error.")
    return [];
  }
  
}