export interface Gift {
  id: number
  title: string
  message: string
  musicType: string
  status: "Pending" | "Completed"
  songUrl?: string
}

