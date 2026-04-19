export const BFF_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
  },
  user: {
    me: '/api/me',
    home: '/api/home',
  },
  activity: {
    list: '/api/activity',
  },
} as const;

export const GATEWAY_ENDPOINTS = {
  user: {
    signup: '/apis/user/users/signup',
    login: '/apis/user/users/login',
    meHome: '/apis/user/users/me/home',
    me: '/apis/user/users/me',
    list: '/apis/user/users/list',
  },
  activity: {
    list: '/apis/activity/activities',
  },
  org: {
    summary(orgId: string | number) {
      return `/apis/org/orgs/${orgId}/summary`;
    },
  },
  prayer: {
    me: '/apis/prayer/prayers/me',
  },
} as const;
