import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Science Digital UI Prototype'
}

const emptyScreen = (
  <div className="mx-auto max-w-2xl px-4">
    <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
      <h1 className="text-lg font-semibold">Analysis</h1>
      <p className="leading-normal text-muted-foreground">
        Explore and interpret your experiment results
      </p>
    </div>
  </div>
)

const exampleMessages = [
  {
    message: 'What tools can I use to analyse my bioinformatics data?'
  }
]

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session) {
    redirect('/login')
  }

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat
        id={id}
        session={session}
        missingKeys={missingKeys}
        emptyScreen={emptyScreen}
        exampleMessages={exampleMessages}
      />
    </AI>
  )
}
