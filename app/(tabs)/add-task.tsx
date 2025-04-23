import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { addTask } from "../../lib/store/taskSlice";
import uuid from "react-native-uuid";
import { useAuth } from "../../lib/firebase/authContext";
import { useRouter } from "expo-router";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const [pickerType, setPickerType] = useState<"date" | "deadline" | null>(
    null,
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const handleConfirm = (selectedDate: Date) => {
    if (pickerType === "date") setDate(selectedDate);
    else if (pickerType === "deadline") setDeadline(selectedDate);
    setPickerType(null);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    const newTask = {
      id: uuid.v4() as string,
      title,
      description,
      dateTime: date.toISOString(),
      deadline: deadline.toISOString(),
      priority,
      completed: false,
      userId: user?.uid || "",
    };

    dispatch(addTask(newTask));
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Add New Task</Text>

      <Text style={styles.label}>Title*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setPickerType("date")}
      >
        <Text>{formatDate(date)}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Deadline</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setPickerType("deadline")}
      >
        <Text>{formatDate(deadline)}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={pickerType !== null}
        mode="datetime"
        date={pickerType === "date" ? date : deadline}
        onConfirm={handleConfirm}
        onCancel={() => setPickerType(null)}
      />

      {/* Priority Selector */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {["low", "medium", "high"].map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.priorityButton}
            onPress={() => setPriority(level as "low" | "medium" | "high")}
          >
            <Text
              style={
                priority === level
                  ? styles.priorityTextActive
                  : styles.priorityText
              }
            >
              {capitalize(level)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleAddTask}
        disabled={!title.trim()}
      >
        <Text style={styles.submitButtonText}>Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#f0f8f8",
  },
  priorityButtonLowActive: {
    backgroundColor: "#B2F0E3",
    borderColor: "#4CD4A0",
  },
  priorityButtonMediumActive: {
    backgroundColor: "#FFF3B0",
    borderColor: "#F7C948",
  },
  priorityButtonHighActive: {
    backgroundColor: "#FFBABA",
    borderColor: "#FF6B6B",
  },
  priorityText: {
    fontSize: 14,
    color: "#555",
  },
  priorityTextActive: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
