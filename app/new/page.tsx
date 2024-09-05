import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function NewPage() {
  const session = await auth()
  if (session) {
    redirect('/')
  }
  redirect('/login')
}
