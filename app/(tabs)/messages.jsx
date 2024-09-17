import SearchBar from "@/components/SearchBar";
import Colors from "@/constants/Colors";
import React from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";

const MessagesScreen = () => {
  const conversations = [
    {
      id: 1,
      name: "Test test",
      lastMessage: "Zdravo, kako si?",
      time: "10:00 AM",
      unread: 2,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Aleksandar Saicic",
      lastMessage: "Cena?",
      time: "10:05 AM",
      unread: 0,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <View style={styles.container} className="bg-white">
      <SearchBar />
      <FlatList
        data={conversations}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const ConversationItem = ({ conversation }) => {
  return (
    <View style={styles.conversationContainer} className="mt-2 border-gray-200">
      <Image source={{ uri: conversation.image }} style={styles.image} />
      <View style={styles.conversationInfo}>
        <Text style={styles.name}>{conversation.name}</Text>
        <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
      </View>
      <View style={styles.timeAndUnread}>
        <Text style={styles.time}>{conversation.time}</Text>
        {conversation.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{conversation.unread}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
  conversationContainer: {
    padding: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderBottomWidth: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  timeAndUnread: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  unreadBadge: {
    backgroundColor: "#007aff",
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
  },
  unreadText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default MessagesScreen;
