import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadSong(file: File): Promise<string> {
  if (!file) {
    throw new Error('No file provided')
  }

  if (!file.type.includes('audio')) {
    throw new Error('File must be an audio file')
  }

  try {
    const fileName = `${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}-musicasagift.mp3`
    console.log('Uploading file:', fileName)

    const { data, error } = await supabase.storage
      .from('songs')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase storage upload error:', error)
      throw new Error(error.message)
    }

    console.log('File uploaded successfully:', data)

    const { data: { publicUrl } } = supabase.storage
      .from('songs')
      .getPublicUrl(fileName)

    console.log(publicUrl)

    console.log('Generated public URL:', publicUrl)
    return publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

