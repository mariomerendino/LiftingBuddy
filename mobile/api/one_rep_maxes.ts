import { GetAuthToken } from "./auth";
import { BaseURL } from "./url";

export interface oneRepMax {
  labels: Array<string>
  data: Array<number>
}

export interface maxes {
  bench: oneRepMax,
  deadlift: oneRepMax,
  squat: oneRepMax,
}

export const ExmptyOneRepMaxes: maxes = {
  bench: {
    labels: [],
    data: [],
  },
  deadlift: {
    labels: [],
    data: [],
  },
  squat: {
    labels: [],
    data: [],

  }
}

export const GetOneRepMaxes = async (): Promise<maxes> => {
  const authToken = await GetAuthToken();


  if(authToken == null) {
    return ExmptyOneRepMaxes;
  }
  const url = `${BaseURL()}/one_rep_maxes`;
  try {
    const apiCall = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })
    const data: maxes = await apiCall.json();
    return data;
  }
  catch {
    alert("There was an error.")
    return ExmptyOneRepMaxes;
  }
} 