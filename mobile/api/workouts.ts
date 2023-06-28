import { GetAuthToken } from "./auth";

export interface Workout {
  id: number,
  user_id: number,
  workout_date: string,
  created_at: string
}

export const CreateOrFetchUserWorkout = async (month: number, year: number, day: number) => {
  const authToken = await GetAuthToken();

  if(authToken == null) {
    return null;
  }

  const url = `http://localhost:3000/user_workouts`;

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

export const GetWorkoutsForMonthAndYear = async (month: number, year: number) => {
  const authToken = await GetAuthToken();

  if(authToken == null) {
    return [];
  }

  const url = `http://localhost:3000/user_workouts?month=${month}&year=${year}`;

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