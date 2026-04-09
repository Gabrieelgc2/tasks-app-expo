import { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, SafeAreaView, Platform,
  StatusBar as RNStatusBar, Pressable, ActivityIndicator, Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

import TaskList from './src/components/TaskList';
import { addTask, deleteTask, getAllTasks, updateTask, TaskItem } from './src/utils/handle-api';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    getAllTasks(setTasks, setLoading);
  }, []);

  const openAddModal = () => {
    setIsUpdating(false);
    setText("");
    setCompleted(false);
    setDueDate(new Date());
    setModalVisible(true);
  };

const updateMode = (_id: string, taskText: string, isCompleted?: boolean, date?: string) => {
  setIsUpdating(true);
  setTaskId(_id);
  setText(taskText);
  setCompleted(isCompleted || false);

  
  if (date) {
    setDueDate(new Date(date));
  } else {
    setDueDate(new Date()); 
  }
  
  setModalVisible(true);
};

  const handleSave = () => {

    console.log("Botão Salvar clicado! Texto:", text)
    if (text.trim().length < 3) {
      return;
    }

    const onSuccess = () => {
      setModalVisible(false);
      setText("");
      setCompleted(false);
      setIsUpdating(false);
    };

    if (isUpdating) {
      updateTask(taskId, text, completed, dueDate.toISOString(), setTasks, onSuccess);
    } else {
      addTask(text, completed, dueDate.toISOString(), setTasks, onSuccess);
    }
  }; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Minhas Tarefas</Text>
        </View>

        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [styles.mainButton, pressed && styles.buttonPressed]}
            onPress={openAddModal}
          >
            <Text style={styles.buttonText}>+ Nova Tarefa</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]}
            onPress={() => setTasks([])}
          >
            <Text style={styles.buttonText}>Limpar Tudo</Text>
          </Pressable>
        </View>

        <TaskList tasks={tasks} onUpdate={updateMode} onDelete={(id) => deleteTask(id, setTasks)} />

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{isUpdating ? "Editar Tarefa" : "Nova Tarefa"}</Text>

              <TextInput
                style={styles.input}
                placeholder="O que precisa ser feito?"
                value={text}
                onChangeText={(val) => setText(val)}
              />

              <View style={styles.formRow}>
                <Text>Concluída:</Text>
                <Checkbox value={completed} onValueChange={setCompleted} color="#000" />
              </View>

              <View style={styles.formRow}>
                <Text>Data Limite:</Text>
                <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerTrigger}>
                  <Text>{dueDate.toLocaleDateString('pt-BR')}</Text>
                </Pressable>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setDueDate(date);
                  }}
                />
              )}

              <View style={styles.modalButtons}>
                <Pressable onPress={() => setModalVisible(false)} style={styles.btnCancel}>
                  <Text>Cancelar</Text>
                </Pressable>
                <Pressable onPress={handleSave} style={styles.btnSave}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {loading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: { flex: 1, 
    backgroundColor: '#FFF', 
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 
  },

  container: { flex: 1,
     paddingHorizontal: 20
     },

  headerContainer: { alignItems: 'center',
     marginVertical: 20 
    },

  header: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },

  actionRow: { flexDirection: 'row',
     gap: 10, 
     marginBottom: 10 
    },

  mainButton: { flex: 2, 
    backgroundColor: '#000', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center' 
  },

  deleteButton: { 
    flex: 1, 
    backgroundColor: '#FF5252', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  
  buttonPressed: { 
    transform: [{ scale: 0.97 }],
   opacity: 0.8 
  },

  buttonText: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center'
   },

  modalContent: { 
    width: '85%',
     backgroundColor: '#FFF', 
     borderRadius: 15,
     padding: 20 
    },

  modalTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
     },

  input: { 
    borderWidth: 1, 
    borderColor: '#DDD',
    borderRadius: 8, 
    padding: 12,
    marginBottom: 15 
    },

  formRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
     marginBottom: 15 
    },

  datePickerTrigger: { 
    padding: 10,
     backgroundColor: '#EEE', 
     borderRadius: 5 },

  modalButtons: { 
    flexDirection: 'row',
     justifyContent: 'flex-end',
      gap: 10, 
      marginTop: 10 },

  btnCancel: { 
    padding: 12
   },
  btnSave: 
  { 
    backgroundColor: '#000', 
    paddingVertical: 12, 
    paddingHorizontal: 20,
    borderRadius: 8 
  }
});