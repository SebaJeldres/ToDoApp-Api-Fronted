<template>
  <div class="todo-container">
    <h1 class="title">Tasks</h1>

    <input
      type="text"
      v-model="taskStore.newTask"
      @keyup.enter="taskStore.addTask"
      placeholder="Añade una tarea"
      class="task-input"
    />

    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <input 
          type="checkbox" 
          v-model="task.completed" 
          class="task-checkbox" 
        />
        <span :class="{ completed: task.completed }">{{ task.Task }}</span>
        <button 
          @click="taskStore.deleteTask(task.id)" 
          class="task-remove"
        >
          Borrar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
import { onMounted } from 'vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.getTasks()
  console.log('Tareas cargadas:', taskStore.tasks)
})
</script>

<style scoped>
.todo-container {
  width: 400px;
  margin: 40px auto;
  text-align: center;
}
.title {
  margin-bottom: 1rem;
}
.task-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 1rem;
}
.task-list {
  list-style: none;
  padding: 0;
}
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.task-remove {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
</style>
