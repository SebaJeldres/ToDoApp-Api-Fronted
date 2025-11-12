import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    newTask: "",
  }),

  actions: {
    // Obtener todas las tareas
    async getTasks() {
      try {
        const response = await axios.get(apiUrl);
        this.tasks = response.data.Task;
      } catch (error) {
        console.error("Error al traer las tareas: " + error);
      }
    },

    // Agregar una nueva tarea
    async addTask() {
      if (!this.newTask.trim()) return;

      try {
        const response = await axios.post(apiUrl, {
          task: this.newTask,
          completed: false,
        });
        this.tasks.push(response.data.data);
        this.newTask = "";
      } catch (error) {
        console.error("Error al añadir la tarea: " + error);
      }
    },

    // Actualizar una tarea
    async updateTask(task) {
      try {
        await axios.put(`${apiUrl}/${task.id}`, task);
        // Actualiza el array local
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) this.tasks[index] = task;
      } catch (error) {
        console.log("No se actualizó la tarea: " + error);
      }
    },

    // Eliminar una tarea
    async deleteTask(id) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.log("No se eliminó correctamente: " + error);
      }
    },
  },
});
