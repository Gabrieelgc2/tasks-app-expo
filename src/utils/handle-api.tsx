import axios from 'axios';

 const baseURL = process.env.EXPO_PUBLIC_API_URL

export interface TaskItem {
  _id: string;
  text: string;
  completed?: boolean;
  dueDate?: string;
}

export const getAllTasks = (setTasks: any, setLoading?: any) => {
  if (setLoading) setLoading(true);
  axios.get(baseURL)
    .then(({ data }) => {
    console.log("DADOS REAIS DO BANCO:", data[0]);
      setTasks(data);
      if (setLoading) setLoading(false);
    })
    .catch((err) => {
      console.log("Erro ao buscar:", err.message);
      if (setLoading) setLoading(false);
    });
};

export const addTask = (text: string, completed: boolean, dueDate: string, setTasks: any, onSuccess: any) => {
  axios.post(`${baseURL}/save`, { text, completed, dueDate })
    .then(() => {
      onSuccess();
      getAllTasks(setTasks);
    })
    .catch((err) => console.log("Erro ao adicionar:", err.message));
};

export const updateTask = (taskId: string, text: string, completed: boolean, dueDate: string, setTasks: any, onSuccess: any) => {
  axios.post(`${baseURL}/update`, { _id: taskId, text, completed, dueDate })
    .then(() => {
      onSuccess();
      getAllTasks(setTasks);
    })
    .catch((err) => console.log("Erro ao atualizar:", err.message));
};

export const deleteTask = (_id: string, setTasks: any) => {
  axios.post(`${baseURL}/delete`, { _id })
    .then(() => getAllTasks(setTasks))
    .catch((err) => console.log("Erro ao deletar:", err.message));
};