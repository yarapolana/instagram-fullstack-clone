export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: 14,
    color: "#000"
  },
  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: "row"
  },
  action: {
    marginRight: 8
  },
  likes: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000"
  },
  description: {
    lineHeight: 18,
    color: "#000"
  },
  hashtags: {
    color: "#eb524c"
  }
});
