/**
 * Authentication middleware
 * Protects routes that require authentication
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, checkAuth } = useAuth();

  // Check auth status if not already authenticated
  if (!isAuthenticated.value) {
    await checkAuth();
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }
});
