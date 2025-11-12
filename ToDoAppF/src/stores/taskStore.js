import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [],
        newTask: "",
    }),

    actions:{
        async getTask() {
            try {

                const response = await axios.get(apiUrl);
                this.task = response.data;

            } catch (error) {

                console.error("Error al traer las tareas: "+error);
            }
        },


        async addTask() {
            try {

              const response = await axios.post(apiUrl, {
                    tittle: this.newTask,
                    completed: false
               });
               this.task.push(response.data);
               this.newTask = "";
                

            } catch (error) {
                console.error("Error al añadir la tarea "+error);
            }
        },
        async updateTask(task) {
            try {
                await axios.put('${apiUrl}/${task.id}', task);

            } catch (error) {
                console.log("No se actualizo la tarea "+error);
            }
        },
        async deletaTask(id) {
            try {
                await axios.delete('$(apiUrl)/${id}');
                this.task = this.task.filter((task) => task.id !== id);
            } catch (error) {
                console.log("No se elimino correctamente "+error);
            }
        },
    }


})