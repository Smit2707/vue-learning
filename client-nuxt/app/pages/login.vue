<template>
  <div>
    <AuthLogin />
  </div>
</template>

<script setup>
// Redirect to todos if already authenticated
const { isAuthenticated } = useAuth();

if (isAuthenticated.value) {
  await navigateTo('/todos');
}

// Define page metadata
definePageMeta({
  layout: false,
  middleware: 'guest'
});
</script>
