import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import TaskItem from "../../components/TaskItem";
import { useAuth } from "../../lib/firebase/authContext";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function HomeScreen() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { user, signOut } = useAuth();
  const router = useRouter();

  const params = useLocalSearchParams();
  const [sortBy, setSortBy] = useState<"default" | "priority" | "deadline">(
    (params.sortBy as "priority" | "deadline") || "default",
  );

  // Sorting logic
  const userTasks = tasks
    .filter((task) => task.userId === user?.uid)
    .sort((a, b) => {
      switch (sortBy) {
        case "deadline-asc":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "priority-desc":
          return (
            { high: 3, medium: 2, low: 1 }[b.priority] -
            { high: 3, medium: 2, low: 1 }[a.priority]
          );
        case "priority-asc":
          return (
            { high: 3, medium: 2, low: 1 }[a.priority] -
            { high: 3, medium: 2, low: 1 }[b.priority]
          );
        default:
          return 0;
      }
    });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text>{user?.email}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={signOut}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/filter-screen")}
          style={styles.filterButton}
        >
          <Ionicons
            name="filter"
            size={24}
            color="#007AFF"
          />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {userTasks.length !== 0 ? (
        <FlatList
          data={userTasks}
          renderItem={({ item }) => <TaskItem task={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      ) : (
        <View style={styles.Addcontainer}>
          <Text style={styles.AddText}> Click on Add Tasks </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/add-task")}
      >
        <Text style={styles.addButtonText}>Add Task...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  Addcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  AddText: {
    fontSize: 32,
    color: "grey",
    fontWeight: "700",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  filterText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
