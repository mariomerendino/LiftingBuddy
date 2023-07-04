import {Platform} from 'react-native'

const isProd = false;
export const BaseURL = () => {
  if(isProd) {
    return "https://liftingbuddy-91d262180055.herokuapp.com"
  }
  if(Platform.OS === 'ios') {
    return "http://localhost:3000"
  } else {
    return 'http://10.0.2.2:3000';
  }
}