import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { updateTask } from '../utils/handle-api';

interface TaskProps {
    text: string;
    updateMode: () => void;
    deleteToDo: () => void;
}

const Task: React.FC<TaskProps> = ({ text, updateMode, deleteToDo }) => {
    return (
        <View style={styles.todo}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.icons}>
                <TouchableOpacity onPress={updateMode}>
                    <Feather name="edit" size={20} color="#fff" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteToDo}>
                    <AntDesign name="delete" size={20} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const TaskItem = ({text, updateMode, deleteToDo}: TaskProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    todo: {
        backgroundColor: '#000',
        paddingVertical: 24,
        paddingHorizontal: 32, // Adjusted from rem
        borderRadius: 5,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    icons: {
        flexDirection: 'row',
        gap: 16,
        marginLeft: 16,
    },
    icon: {
        padding: 2,
    },
});

export default TaskItem;