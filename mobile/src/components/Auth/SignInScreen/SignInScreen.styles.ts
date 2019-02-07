import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  optionsContainer: {
    flex: 2,
    backgroundColor: "white",
  },
  usernameField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordField: {
    flex: 4,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});
