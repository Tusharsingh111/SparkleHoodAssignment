import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in product recommendations, leading to unequal exposure of items across different user groups. Initial investigation suggests the training data was not sufficiently diverse.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information when asked about emergency protocols. The model confidently described procedures that contradicted official guidelines, which could lead to harmful actions in an emergency situation.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata during conversation sessions. The information was limited to generic preferences but indicated a potential vulnerability in the privacy filtering system.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  },
  {
    id: 4,
    title: "Automated Content Moderation Failure",
    description: "AI content moderation system failed to flag violent content in a series of user-generated posts. The system had been previously tested against similar content but missed these specific cases due to subtle contextual differences.",
    severity: "High",
    reported_at: "2025-03-25T11:45:00Z"
  },
  {
    id: 5,
    title: "Translation Error in Medical Context",
    description: "AI translation system incorrectly translated medical instructions, potentially leading to incorrect medication dosage information. The error was caught during secondary human review before being provided to patients.",
    severity: "Medium",
    reported_at: "2025-03-18T08:30:00Z"
  }
];