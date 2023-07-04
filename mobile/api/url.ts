import {Platform} from 'react-native'
import { useProduction } from '../utils/ApiUtils'

export const BaseURL = () => {
  console.log(useProduction())
  if(useProduction()) {
    return "https://liftingbuddy-91d262180055.herokuapp.com"
  }
  if(Platform.OS === 'ios') {
    return "http://localhost:3000"
  } else {
    return 'http://10.0.2.2:3000';
  }
}