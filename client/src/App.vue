<template>
  <div id="app">
    <!-- Global Loading Indicator -->
    <div
      v-if="isCheckingAuth"
      class="fixed inset-0 bg-white flex items-center justify-center z-50"
    >
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
        ></div>
        <p class="mt-2 text-gray-500">Loading...</p>
      </div>
    </div>

    <!-- Router View -->
    <router-view v-else />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

/**
 * Main App component
 * Handles initial authentication check and provides router view
 */

// Use auth composable
const { checkAuth } = useAuth();

// State for initial auth check
const isCheckingAuth = ref(true);

/**
 * Check authentication status on app mount
 */
onMounted(async () => {
  try {
    await checkAuth();
  } catch (error) {
    console.error('Initial auth check failed:', error);
  } finally {
    isCheckingAuth.value = false;
  }
});
</script>

<style>
/* Global styles */
#app {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom animations */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Focus styles for better accessibility */
button:focus,
input:focus,
textarea:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
