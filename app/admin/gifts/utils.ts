export async function uploadSong(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to upload file")
  }

  const { url } = await response.json()
  return url
}

