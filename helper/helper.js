import { Platform } from "react-native";

export const encode = (uri) => {
  if (Platform.OS === "android") return encodeURI(`file://${uri}`);
  else return uri;
};
