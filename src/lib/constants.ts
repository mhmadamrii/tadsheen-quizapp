import {
  Book,
  FlaskRoundIcon as Flask,
  Clock,
  Radio,
  Globe,
} from "lucide-react";

export const QUIZZEZ_CATEGORY = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your general knowledge",
    icon: Book,
    t: "general_knowledge",
    t_desc: "general_knowledge_desc",
  },
  {
    id: 2,
    title: "Science Quiz",
    description: "Explore the wonders of science",
    icon: Flask,
    t: "science_quiz",
    t_desc: "science_quiz_desc",
  },
  {
    id: 3,
    title: "History Trivia",
    description: "Journey through historical events",
    icon: Clock,
    t: "history_trivia",
    t_desc: "history_trivia_desc",
  },
  {
    id: 4,
    title: "Pop Culture",
    description: "How well do you know pop culture?",
    icon: Radio,
    t: "pop_culture",
    t_desc: "pop_culture_desc",
  },
  {
    id: 5,
    title: "Geography Challenge",
    description: "Test your knowledge of world geography",
    icon: Globe,
    t: "geography_challenge",
    t_desc: "geography_challenge_desc",
  },
];
