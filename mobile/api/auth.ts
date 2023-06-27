import * as SecureStore from 'expo-secure-store';

export const deleteAuthToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync("authtoken");
}

const setAuthToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync("authtoken", token);
}

export const GetAuthToken = async (): Promise<string> => {
  let result = await SecureStore.getItemAsync("authtoken");
  if (result) {
    return result;
  } else {
    return ""
  }
}

export const userHasValidAuthToken = async (): Promise<boolean> => {
  const authToken = await GetAuthToken();
  const url = `http://localhost:3000/token_validators/`;

  if(authToken == null) {
    return false;
  }

  try {
    const apiCall = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    })
    const data = await apiCall.json();
    if (data.valid_token) {
      return true;
    } else {
      return false;
    } 
  }
  catch {
    alert("There was an error.")
    return false;
  }
}

export const login = async (username: string, password: string): Promise<boolean> => {
  const url = "http://localhost:3000/logins/";
  const body = {
    username: username,
    password: password,
  };

  try {
    const apiCall = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await apiCall.json()
    if (data['token']) {
      await setAuthToken(data['token'])
      return true;
    } else {
      alert('Invalid Username or Password');
      return false
    }
  } catch (e) {
    alert('There was an error connecting to the server. Try again later.');
    return false
  }
}