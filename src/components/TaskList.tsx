import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TaskItem from "./TaskItem";
import { TaskItem as TaskItemType } from "../utils/handle-api";

interface TaskListProps {
  tasks: TaskItemType[];
  onUpdate: (id: string, text: string, completed?: boolean, dueDate?: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {

  
  const validTasks = Array.isArray(tasks) 
    ? tasks.filter((item: TaskItemType) => item && item._id && item.text)
    : [];

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={validTasks}
      keyExtractor={(item: TaskItemType, index) => item._id ? item._id.toString() : index.toString()}
      renderItem={({ item }) => (
        <TaskItem
          text={item.text}
          completed={item.completed}
          dueDate={item.dueDate}
          updateMode={() => onUpdate(item._id, item.text, item.completed, item.dueDate)}
          deleteToDo={() => onDelete(item._id)}
        />
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
        </View>
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
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
});

export default TaskList;