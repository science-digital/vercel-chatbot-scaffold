import { auth } from '@/auth'
import Kanban from '@/components/hypothesis-kanban'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import ChatLayout from '../(chat)/layout'

export default async function HypothesisPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/login')
  }

  return (
    <ChatLayout>
      <div className="group w-full overflow-auto pl-10 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <Kanban />
      </div>
    </ChatLayout>
  )
}
