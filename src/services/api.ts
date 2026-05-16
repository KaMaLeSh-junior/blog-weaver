// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Headers
const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic fetch wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(options.headers?.['Authorization'] !== undefined),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.message || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
}

// ============================================
// BLOG POSTS API
// ============================================

export const blogApi = {
  // Get all posts
  getPosts: (params?: { page?: number; limit?: number; category?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    
    const query = queryParams.toString();
    return apiRequest(`/posts${query ? `?${query}` : ''}`);
  },

  // Get single post by slug
  getPostBySlug: (slug: string) => {
    return apiRequest(`/posts/${slug}`);
  },

  // Get featured posts
  getFeaturedPosts: () => {
    return apiRequest('/posts/featured');
  },

  // Search posts
  searchPosts: (query: string) => {
    return apiRequest(`/posts/search?q=${encodeURIComponent(query)}`);
  },

  //Get highlighted posts
  getHighlightedPosts: () => {
    return apiRequest('/blogs/blogHighlights');
  },
};

// ============================================
// CATEGORIES API
// ============================================

export const categoryApi = {
  // Get all categories
  getCategories: () => {
    return apiRequest('/categories');
  },

  // Get category by slug
  getCategoryBySlug: (slug: string) => {
    return apiRequest(`/categories/${slug}`);
  },

  // Get posts by category
  getPostsByCategory: (categorySlug: string, params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return apiRequest(`/categories/${categorySlug}/posts${query ? `?${query}` : ''}`);
  },
};

// ============================================
// AUTH API
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authApi = {
  // Login
  login: (credentials: LoginCredentials) => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Sign up
  signUp: (credentials: SignUpCredentials) => {
    return apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout
  logout: () => {
    localStorage.removeItem('auth_token');
    return apiRequest('/auth/logout', {
      method: 'POST',
      headers: getHeaders(true),
    });
  },

  // Get current user
  getCurrentUser: () => {
    return apiRequest<AuthUser>('/auth/me', {
      headers: getHeaders(true),
    });
  },

  // Forgot password
  forgotPassword: (email: string) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: (token: string, password: string) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },
};

// ============================================
// SUBSCRIPTION API
// ============================================

export interface SubscriptionPayload {
  email: string;
  name?: string;
}

export const subscriptionApi = {
  // Subscribe to newsletter
  subscribe: (payload: SubscriptionPayload) => {
    return apiRequest('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Unsubscribe
  unsubscribe: (email: string) => {
    return apiRequest('/subscriptions/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// ============================================
// PUSH NOTIFICATIONS API
// ============================================

export const notificationApi = {
  // Register device for push notifications
  registerDevice: (token: string) => {
    return apiRequest('/notifications/register', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: getHeaders(true),
    });
  },

  // Unregister device
  unregisterDevice: (token: string) => {
    return apiRequest('/notifications/unregister', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: getHeaders(true),
    });
  },

  // Get notification preferences
  getPreferences: () => {
    return apiRequest('/notifications/preferences', {
      headers: getHeaders(true),
    });
  },

  // Update notification preferences
  updatePreferences: (preferences: Record<string, boolean>) => {
    return apiRequest('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
      headers: getHeaders(true),
    });
  },
};

// ============================================
// CONTACT API
// ============================================

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactApi = {
  // Submit contact form
  submit: (payload: ContactPayload) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

// ============================================
// COMMENTS API
// ============================================

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface CreateCommentPayload {
  postId: string;
  content: string;
  parentId?: string;
}

export const commentApi = {
  // Get comments for a post
  getComments: (postId: string) => {
    return apiRequest<Comment[]>(`/posts/${postId}/comments`);
  },

  // Create a comment
  createComment: (payload: CreateCommentPayload) => {
    return apiRequest<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: getHeaders(true),
    });
  },

  // Delete a comment
  deleteComment: (commentId: string) => {
    return apiRequest(`/comments/${commentId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
  },
};

// Default export with all APIs
export default {
  blog: blogApi,
  category: categoryApi,
  auth: authApi,
  subscription: subscriptionApi,
  notification: notificationApi,
  contact: contactApi,
  comment: commentApi,
};
