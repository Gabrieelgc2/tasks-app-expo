import React from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Feather, AntDesign } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';

interface TaskItemProps {
  text: string;
  completed?: boolean;
  dueDate?: string;
  updateMode: () => void;
  deleteToDo: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ text, completed, dueDate, updateMode, deleteToDo }) => {
  return (
    <View style={styles.todo}>
      <View style={styles.content}>
        <Checkbox
          value={completed}
          disabled={true} 
          color={completed ? '#4CAF50' : '#757575'}
          style={styles.checkbox}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.text, completed && styles.completedText]}>
            {text || "Tarefa sem título"}
          </Text>
          {dueDate && (
            <Text style={styles.dueDateText}>
              📅 Vencimento: {new Date(dueDate).toLocaleDateString('pt-BR')}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.icons}>
        <Pressable onPress={updateMode} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Feather name="edit" size={20} color="#fff" style={styles.icon} />
        </Pressable>
        <Pressable onPress={deleteToDo} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <AntDesign name="delete" size={20} color="#fff" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 15,
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
  dueDateText: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    padding: 4,
  },
});

export default TaskItem;