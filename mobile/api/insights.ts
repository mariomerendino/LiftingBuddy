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


export interface Insights {
  average_days_per_week: number,
}

export const emptyInsights = {
  average_days_per_week: 0,
  ai_recommendation: ""
}


export const GetInsights = async (): Promise<Insights> => {
  const authToken = await GetAuthToken();


  if(authToken == null) {
    return emptyInsights;
  }
  const url = `${BaseURL()}/insights`;
  try {
    const apiCall = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })
    const data: Insights = await apiCall.json();
    return data;
  }
  catch {
    alert("There was an error.")
    return emptyInsights;
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