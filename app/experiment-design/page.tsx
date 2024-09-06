import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'
import ChatLayout from '../(chat)/layout'
import ExperimentSteps from '@/components/experiment-steps'

export default async function ExperimentDesignPage() {
  const session = (await auth()) as Session

  if (!session) {
    redirect('/login')
  }

  const initialSteps = [
    {
      title: 'Step 1',
      desc: 'The system might recommend a method.',
      actions: ['Recommendation rationale']
    },
    {
      title: 'Step 2',
      desc: 'The system might recommend a tool. E.g. Gene Whisperer: an AI agent that supports researchers in finding answers related to genes by cross-referencing scientific literature with relevant genomics databases.',
      actions: ['View developer page']
    },
    {
      title: 'Step 3',
      desc: 'The system might recommend a dataset.',
      actions: ['View contributor page']
    }
  ]

  return (
    <ChatLayout>
      <div className="group w-full overflow-auto pl-10 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <ExperimentSteps initialSteps={initialSteps} />
      </div>
    </ChatLayout>
  )
}
