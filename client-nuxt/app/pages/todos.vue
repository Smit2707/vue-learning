<template>
  <div>
    <TodosTodoList />
  </div>
</template>

<script setup>
// Redirect to login if not authenticated
const { isAuthenticated } = useAuth();

if (!isAuthenticated.value) {
  await navigateTo('/login');
}

// Define page metadata
definePageMeta({
  layout: false,
  middleware: 'auth'
});
</script>
