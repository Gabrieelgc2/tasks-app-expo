import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TaskItem from "./TaskItem";
import { TaskItem as TaskItemType } from "../utils/handle-api";

interface TaskListProps {
  tasks: TaskItemType[];
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TaskItem
          text={item.text}
          updateMode={() => onUpdate(item._id, item.text)}
          deleteToDo={() => onDelete(item._id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
});

export default TaskList;