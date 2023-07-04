import Constants from "expo-constants"

export const useProduction = (): boolean => {
  if(Constants?.expoConfig?.extra) {
    return Constants?.expoConfig?.extra["USE_PROD"] === true
  }
  return false
}