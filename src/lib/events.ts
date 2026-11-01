export interface UpcomingEvent {
  _id: string
  title: string
  category: string
  location: string
  date: string
  time?: string
  thumbnail?: string
  description: string
  organizerEmail?: string
  volunteers?: number
}

const categoryLabels: Record<string, string> = {
  "winter-relief": "Winter Relief",
  environment: "Cleanup",
  plantation: "Plantation",
  health: "Health Camp",
  "food-drive": "Food Drive",
  donation: "Donation",
  education: "Education",
  "emergency-relief": "Emergency Relief",
}

export function categoryLabel(category: string): string {
  return categoryLabels[category] ?? category
}
