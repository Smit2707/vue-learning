import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Authentication composable for managing user state and auth operations
 * Provides reactive state and methods for authentication
 */
export function useAuth() {
  const router = useRouter();

  // Reactive state
  const user = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed properties
  const isAuthenticated = computed(() => !!user.value);

  /**
   * Base API configuration
   * @returns {Object} API configuration object
   */
  const apiConfig = {
    baseURL: 'http://localhost:5000/api',
    credentials: 'include',
  };

  /**
   * Handle API errors and set error state
   * @param {Error} err - Error object
   * @param {string} defaultMessage - Default error message
   */
  const handleError = (err, defaultMessage = 'An error occurred') => {
    error.value = err.response?.data?.message || defaultMessage;
    console.error('Auth error:', err);
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    error.value = null;
  };

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User name
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @returns {Promise<boolean>} Success status
   */
  const register = async (userData) => {
    try {
      isLoading.value = true;
      clearError();

      const response = await fetch(`${apiConfig.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...apiConfig,
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      user.value = data.data.user;
      router.push('/login');
      return true;
    } catch (err) {
      handleError(err, 'Registration failed');
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<boolean>} Success status
   */
  const login = async (credentials) => {
    try {
      isLoading.value = true;
      clearError();

      const response = await fetch(`${apiConfig.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...apiConfig,
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      user.value = data.data.user;
      router.push('/todos');
      return true;
    } catch (err) {
      handleError(err, 'Login failed');
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Logout user and clear authentication state
   * @returns {Promise<boolean>} Success status
   */
  const logout = async () => {
    try {
      isLoading.value = true;
      clearError();

      await fetch(`${apiConfig.baseURL}/auth/logout`, {
        method: 'POST',
        ...apiConfig,
      });

      user.value = null;
      router.push('/login');
      return true;
    } catch (err) {
      handleError(err, 'Logout failed');
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Check current authentication status
   * @returns {Promise<boolean>} Authentication status
   */
  const checkAuth = async () => {
    try {
      isLoading.value = true;
      clearError();

      const response = await fetch(`${apiConfig.baseURL}/auth/profile`, {
        ...apiConfig,
      });

      if (!response.ok) {
        user.value = null;
        return false;
      }

      const data = await response.json();
      console.log(data.data.user);
      user.value = data.data.user;
      console.log(user.value);
      return true;
    } catch (err) {
      user.value = null;
      handleError(err, 'Authentication check failed');
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    user,
    isLoading,
    error,
    // Computed
    isAuthenticated,
    // Methods
    register,
    login,
    logout,
    checkAuth,
    clearError,
  };
}
