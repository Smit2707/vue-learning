<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white shadow rounded-lg mb-8 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Todos</h1>
            <p class="mt-1 text-sm text-gray-500">
              Welcome back, {{ user?.name || '' }}!
            </p>
          </div>
          <button
            @click="logout"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <!-- Add Todo Form -->
      <div class="bg-white shadow rounded-lg mb-8 p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Add New Todo</h2>
        <form @submit.prevent="addTodo" class="space-y-4">
          <div>
            <input
              v-model="newTodo.title"
              type="text"
              placeholder="What needs to be done?"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isAddingTodo"
              required
            />
          </div>
          <div>
            <textarea
              v-model="newTodo.description"
              placeholder="Add a description (optional)"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :disabled="isAddingTodo"
            />
          </div>
          <button
            type="submit"
            :disabled="isAddingTodo || !newTodo.title.trim()"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ isAddingTodo ? 'Adding...' : 'Add Todo' }}
          </button>
        </form>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="rounded-md bg-red-50 p-4 mb-8">
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ error }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white shadow rounded-lg mb-8 p-6">
        <div class="flex space-x-4">
          <button
            @click="filter = 'all'"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md',
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            All ({{ todos.length }})
          </button>
          <button
            @click="filter = 'active'"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md',
              filter === 'active'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Active ({{ activeTodos.length }})
          </button>
          <button
            @click="filter = 'completed'"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md',
              filter === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Completed ({{ completedTodos.length }})
          </button>
        </div>
      </div>

      <!-- Todo List -->
      <div class="bg-white shadow rounded-lg">
        <div v-if="isLoading" class="p-8 text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
          ></div>
          <p class="mt-2 text-gray-500">Loading todos...</p>
        </div>

        <div v-else-if="filteredTodos.length === 0" class="p-8 text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No todos found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{
              filter === 'completed'
                ? 'No completed todos yet'
                : 'Get started by adding a new todo'
            }}
          </p>
        </div>

        <ul v-else class="divide-y divide-gray-200">
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo._id"
            :todo="todo"
            @toggle="toggleTodo"
            @delete="deleteTodo"
            @edit="editTodo"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import TodoItem from './TodoItem.vue';

/**
 * TodoList component for managing todos
 * Handles todo CRUD operations and filtering
 */

// Use auth composable
const { user, logout, error, clearError } = useAuth();

console.log(user);

// State
const todos = ref([]);
const isLoading = ref(true);
const isAddingTodo = ref(false);
const filter = ref('all');

// New todo form
const newTodo = reactive({
  title: '',
  description: '',
});

// Computed properties
const activeTodos = computed(() =>
  todos.value.filter((todo) => !todo.completed)
);
const completedTodos = computed(() =>
  todos.value.filter((todo) => todo.completed)
);
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return activeTodos.value;
    case 'completed':
      return completedTodos.value;
    default:
      return todos.value;
  }
});

// API configuration
const apiConfig = {
  baseURL: 'http://localhost:5000/api',
  credentials: 'include',
};

/**
 * Handle API errors
 * @param {Error} err - Error object
 * @param {string} defaultMessage - Default error message
 */
const handleError = (err, defaultMessage = 'An error occurred') => {
  error.value = err.response?.data?.message || defaultMessage;
  console.error('Todo error:', err);
};

/**
 * Fetch all todos from the server
 */
const fetchTodos = async () => {
  try {
    isLoading.value = true;
    clearError();

    const response = await fetch(`${apiConfig.baseURL}/todos`, apiConfig);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch todos');
    }

    todos.value = data.data.todos;
  } catch (err) {
    handleError(err, 'Failed to load todos');
  } finally {
    isLoading.value = false;
  }
};

/**
 * Add a new todo
 */
const addTodo = async () => {
  if (!newTodo.title.trim()) return;

  try {
    isAddingTodo.value = true;
    clearError();

    const response = await fetch(`${apiConfig.baseURL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...apiConfig,
      body: JSON.stringify({
        title: newTodo.title.trim(),
        description: newTodo.description.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add todo');
    }

    // Add new todo to the list
    todos.value.unshift(data.data.todo);

    // Reset form
    newTodo.title = '';
    newTodo.description = '';
  } catch (err) {
    handleError(err, 'Failed to add todo');
  } finally {
    isAddingTodo.value = false;
  }
};

/**
 * Toggle todo completion status
 * @param {string} todoId - Todo ID to toggle
 */
const toggleTodo = async (todoId) => {
  try {
    clearError();

    const response = await fetch(
      `${apiConfig.baseURL}/todos/${todoId}/toggle`,
      {
        method: 'PATCH',
        ...apiConfig,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to toggle todo');
    }

    // Update todo in the list
    const todoIndex = todos.value.findIndex(
      (todo) => todo._id === todoId || todo.id === todoId
    );
    if (todoIndex !== -1) {
      todos.value[todoIndex] = data.data.todo;
    }
  } catch (err) {
    handleError(err, 'Failed to toggle todo');
  }
};

/**
 * Delete a todo
 * @param {string} todoId - Todo ID to delete
 */
const deleteTodo = async (todoId) => {
  if (!confirm('Are you sure you want to delete this todo?')) return;

  try {
    clearError();

    const response = await fetch(`${apiConfig.baseURL}/todos/${todoId}`, {
      method: 'DELETE',
      ...apiConfig,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete todo');
    }

    // Remove todo from the list
    todos.value = todos.value.filter(
      (todo) => todo._id !== todoId && todo.id !== todoId
    );
  } catch (err) {
    handleError(err, 'Failed to delete todo');
  }
};

/**
 * Edit a todo (placeholder for future implementation)
 * @param {Object} todo - Todo to edit
 */
const editTodo = (todo) => {
  // TODO: Implement edit functionality
  console.log('Edit todo:', todo);
};

// Load todos on component mount
onMounted(() => {
  fetchTodos();
});
</script>
