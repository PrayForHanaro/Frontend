export const BACKEND_ENDPOINTS = {
  auth: {
    login: '/apis/auth/login',
    refresh: '/apis/auth/refresh',
    logout: '/apis/auth/logout',
    signup: '/apis/auth/signup',
  },
  user: {
    meHome: '/apis/user/users/me/home',
    list: '/apis/user/users/list',
  },
  activity: {
    list: '/apis/activity/activities',
  },
  prayer: {
    receiversMe: '/apis/prayer/prayers/me',
  },
} as const;
