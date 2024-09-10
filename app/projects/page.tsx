import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import Projects from '@/components/projects'

export default async function ProjectsPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="group w-full overflow-auto pl-10 pt-10 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <Projects />
    </div>
  )
}
