import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#2d3439",
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: "#2d3439",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 5,
  },
  buttonContainer: {
    display: "flex",
    height: 50,
    width: 200,
    borderRadius: 5,
    backgroundColor: "#700073",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,  // centering not working, so hardcode margin
  },
  signUpText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    margin: 10,
  }
});
