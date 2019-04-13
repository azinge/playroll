import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  },
  textContainer: {
    flexDirection: "row",
    marginVertical: 10,
    // paddingHorizontal: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    flex: 1,
    alignItems: "center"
  },
  disabledText: {
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: "#999594"
  },
  enabledText: {
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: "#993399"
  },
  darkModeSwitch: {
    marginLeft: 10,
    marginBottom: 5
  }
});
