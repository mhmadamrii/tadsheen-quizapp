export type Answer = { id: number; value: string };

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
  static_answer: string;
  correctAnswerId: string;
};
