import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Task from './src/components/Task';
import { addTask, deleteTask, getAllTasks, updateTask, TaskItem } from './src/utils/handle-api';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  const updateMode = (_id: string, text: string) => {
    setIsUpdating(true);
    setText(text);
    setTaskId(_id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../tasks-app-expo/tasks/images/image.png')}
      />
        <Text style={styles.header}>Tarefas</Text>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma tarefa"
            value={text}
            maxLength={10}
            onChangeText={(val) => setText(val)}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={
              isUpdating
                ? () => updateTask(taskId, text, setTasks, setText, setIsUpdating)
                : () => addTask(text, setText, setTasks)
            }
          >
            <Text style={styles.addButtonText}>
              {isUpdating ? "Atualizar" : "Adicionar"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {tasks.map((item) => (
            <Task
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteTask(item._id, setTasks)}
            />
          ))}
        </ScrollView>
        
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    gap: 10
  },
  header: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  top: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomRightRadius: 500,
    fontSize: 10,
    fontWeight: `bold`,
    width: 40,
  },
  addButton: {
    flex: 0.3,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  list: {
    marginTop: 16,
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
