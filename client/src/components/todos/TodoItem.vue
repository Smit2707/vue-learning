<template>
  <li class="p-4 hover:bg-gray-50 transition-colors duration-150">
    <div class="flex items-start space-x-3">
      <!-- Checkbox -->
      <div class="flex items-center h-5">
        <input
          :id="`todo-${todo.id}`"
          :checked="todo.completed"
          @change="handleToggle"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
        />
      </div>

      <!-- Todo Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <label
              :for="`todo-${todo.id}`"
              class="text-sm font-medium text-gray-900 cursor-pointer"
              :class="{ 'line-through text-gray-500': todo.completed }"
            >
              {{ todo.title }}
            </label>
            <p
              v-if="todo.description"
              class="mt-1 text-sm text-gray-500"
              :class="{ 'line-through': todo.completed }"
            >
              {{ todo.description }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2 ml-4">
            <!-- Status Badge -->
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                todo.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800',
              ]"
            >
              {{ todo.completed ? 'Completed' : 'Active' }}
            </span>

            <!-- Delete Button -->
            <button
              @click="handleDelete"
              class="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 p-1 rounded"
              title="Delete todo"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Metadata -->
        <div class="mt-2 flex items-center text-xs text-gray-400">
          <span>Created {{ formatDate(todo.createdAt) }}</span>
          <span v-if="todo.updatedAt !== todo.createdAt" class="ml-2">
            • Updated {{ formatDate(todo.updatedAt) }}
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

/**
 * TodoItem component for displaying individual todo items
 * Handles todo interactions and displays todo information
 */

// Props
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(['toggle', 'delete', 'edit']);

/**
 * Handle todo toggle
 */
const handleToggle = () => {
  emit('toggle', props.todo._id || props.todo.id);
};

/**
 * Handle todo deletion
 */
const handleDelete = () => {
  emit('delete', props.todo._id || props.todo.id);
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }
};
</script>
