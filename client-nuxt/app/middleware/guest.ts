/**
 * Guest middleware
 * Redirects authenticated users away from guest routes (login, register)
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, checkAuth } = useAuth();

  // Check auth status if not already authenticated
  if (!isAuthenticated.value) {
    await checkAuth();
  }

  // Redirect to todos if already authenticated
  if (isAuthenticated.value) {
    return navigateTo('/todos');
  }
});
