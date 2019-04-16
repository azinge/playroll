import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cover: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey"
  },
  artist: {
    fontFamily: "Avenir",
    fontSize: 17,
    color: "purple",
    fontWeight: "bold"
  },
  noArtist: {
    fontFamily: "Avenir",
    fontSize: 15,
    color: "lightgrey"
  },
  manageRoll: {
    fontFamily: "Avenir",
    fontSize: 13,
    color: "gray"
  },
  spacing: {
    width: "75%",
    marginVertical: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
