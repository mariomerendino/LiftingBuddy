import {Platform} from 'react-native'

export const BaseURL = () => {
  if(Platform.OS === 'ios') {
    return "http://localhost:3000"
  } else {
    return 'http://10.0.2.2:3000';
  }
}