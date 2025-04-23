import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type SortOption = "deadline-asc" | "priority-desc" | "priority-asc" | null;

export default function FilterScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<SortOption>(null);

  const applyFilters = () => {
    router.push({
      pathname: "/(tabs)/home",
      params: { sortBy: selectedOption },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter Tasks</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="close"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Sorting options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Sort By</Text>

        {/* Deadline - Earliest First */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "deadline-asc" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("deadline-asc")}
        >
          <Text style={styles.optionText}>Deadline (Earliest First)</Text>
          {selectedOption === "deadline-asc" && (
            <Ionicons
              name="checkmark"
              size={20}
              color="#007AFF"
            />
          )}
        </TouchableOpacity>

        {/* Priority - High to Low */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "priority-desc" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("priority-desc")}
        >
          <Text style={styles.optionText}>Priority (High - to - Low)</Text>
          {selectedOption === "priority-desc" && (
            <Ionicons
              name="checkmark"
              size={20}
              color="#007AFF"
            />
          )}
        </TouchableOpacity>

        {/* Priority - Low to High */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "priority-asc" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("priority-asc")}
        >
          <Text style={styles.optionText}>Priority (Low - to -High)</Text>
          {selectedOption === "priority-asc" && (
            <Ionicons
              name="checkmark"
              size={20}
              color="#007AFF"
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.applyButton, !selectedOption && styles.disabledButton]}
          onPress={applyFilters}
          disabled={!selectedOption}
        >
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setSelectedOption(null)}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: "#555",
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "#f5f5f5",
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  resetButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
