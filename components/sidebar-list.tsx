import { clearChats, getChats } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

const routes = [
  // { id: 'ideate', label: 'Ideate', description: 'Generate and explore new ideas' },
  {
    id: 'hypothesis',
    label: 'Hypothesis',
    description: 'Formulate testable predictions'
  },
  {
    id: 'experiment-design',
    label: 'Experiment Design',
    description: 'Plan your research methodology'
  },
  {
    id: 'experiment-execution',
    label: 'Experiment Execution',
    description: 'Conduct your experiments'
  },
  { id: 'analysis', label: 'Analysis', description: 'Interpret your results' },
  { id: 'outputs', label: 'Outputs', description: 'Present your findings' }
]

export async function SidebarList({ userId }: SidebarListProps) {
  let chats = await loadChats(userId)

  if (!chats || 'error' in chats) {
    // redirect('/')
    chats = []
  } else {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {chats?.length ? (
            <div className="space-y-2 px-2">
              <SidebarItems chats={chats} />
            </div>
          ) : (
            <div className="p-2 text-center">
              <p className="text-sm text-muted-foreground">
                <Button variant="link" asChild>
                  <Link href="/login">Login</Link>
                </Button>{' '}
                or Sign up
              </p>
            </div>
          )}
          {routes.map(tab => (
            <button
              key={tab.id}
              // onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2 mb-2 rounded transition-colors duration-150 ease-in-out ${
                ''
                // activeTab === tab.id
                //   ? 'bg-blue-500 text-white'
                //   : 'hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between p-4">
          <ThemeToggle />
          <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />
        </div>
      </div>
    )
  }
}
