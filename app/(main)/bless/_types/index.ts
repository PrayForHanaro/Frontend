export type BlessTarget = {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  daysOfPrayer: number;
  totalAmount: number;
  dailyAmount: number;
};

export type BlessMessage = {
  id: string;
  targetId: string;
  date: string;
  dayOfWeek: string;
  points: number;
  content: string;
};

export type BibleVerse = {
  text: string;
  reference: string;
};

export type RegisteredAccount = {
  id: string;
  targetId: string;
  targetName: string;
  targetRelation: string;
  accountNumber: string;
};

export type OnceBlessFormData = {
  message: string;
  amount: number;
  accountNumber: string;
  recipientName: string;
  recipientRelation: string;
};
