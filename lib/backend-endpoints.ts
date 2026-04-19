export const BACKEND_ENDPOINTS = {
  auth: {
    login: '/apis/auth/login',
    refresh: '/apis/auth/refresh',
    logout: '/apis/auth/logout',

    signup: '/apis/user/users/signup',
  },
  user: {
    meHome: '/apis/user/users/me/home',
  },
  activity: {
    list: '/apis/activity/activities',
  },
} as const;
