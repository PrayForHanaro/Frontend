export type ActivityItem = {
  id: number;
  category: '봉사모집' | '동행찾기' | '교회행사';
  title: string;
  location: string;
  schedule: string;
  currentCount: number;
  maxCount: number;
  point: number;
  isApplied: boolean;
  isOwner: boolean;
  status: 'RECRUITING' | 'CLOSED' | 'CANCELLED';
};

export type ActivityMember = {
  id: number;
  name: string;
  initial: string;
  isLeader?: boolean;
};

export type ActivityDetail = ActivityItem & {
  description: string;
  imageUrls: string[];
  members: ActivityMember[];
};

export type ActivityCreatePayload = {
  category: '봉사모집' | '동행찾기' | '교회행사';
  meetingType: 'single' | 'recurring';
  recurringType: 'daily' | 'weekday' | 'monthly';
  title: string;
  description: string;
  location: string;
  maxMembers: number;
  pointAmount?: number;
  singleDate: string;
  singleTime: string;
  recurringStartDate: string;
  recurringEndDate: string;
  recurringTime: string;
  recurringWeekdays: string[];
  recurringMonthDays: number[];
  imageUrls: string[];
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || '요청에 실패했습니다.');
  }

  return result.data;
}

export async function getActivities() {
  const response = await fetch('/api/activity', {
    method: 'GET',
    cache: 'no-store',
  });

  return parseResponse<ActivityItem[]>(response);
}

export async function getActivity(activityId: string) {
  const response = await fetch(`/api/activity/${activityId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  return parseResponse<ActivityDetail>(response);
}

export async function createActivity(payload: ActivityCreatePayload) {
  const response = await fetch('/api/activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<ActivityDetail>(response);
}

export async function applyActivity(activityId: string) {
  const response = await fetch(`/api/activity/${activityId}/apply`, {
    method: 'POST',
  });

  return parseResponse<ActivityDetail>(response);
}
