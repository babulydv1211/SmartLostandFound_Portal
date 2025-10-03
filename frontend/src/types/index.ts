export type User = {
  id: string
  name: string
  email: string
}

export type AuthResponse = {
  token: string
  user: User
}

export type LostFoundFormValues = {
  title: string
  description: string
  location: string
  occurredAt: string
  image?: string
}

export type ItemRecord = {
  _id: string
  type: "lost" | "found"
  title: string
  description: string
  location: string
  occurredAt: string
  image?: string
  reporterName: string
  reporterEmail: string
  createdAt: string
  matchConfidence?: number
}

export type CommentRecord = {
  _id: string
  studentName: string
  message: string
  course: string
  createdAt: string
}
