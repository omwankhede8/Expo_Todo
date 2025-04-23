import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types/taskTypes";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../lib/store/taskSlice";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => dispatch(toggleTask(task.id))}
      >
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Priority: {task.priority}</Text>
          <Text style={styles.metaText}>Deadline: {task.deadline}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteTask(task.id))}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: "#666",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 12,
    color: "#888",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 24,
    color: "red",
  },
});

export default TaskItem;
