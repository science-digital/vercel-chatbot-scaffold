import * as React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { SidebarList } from '@/components/sidebar-list'
import { buttonVariants } from '@/components/ui/button'
import { IconPlus } from '@/components/ui/icons'

interface ChatHistoryProps {
  userId?: string
}

export async function ChatHistory({ userId }: ChatHistoryProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pr-4 mt-5">
        {/* <h4 className="text-sm font-medium">Ideation</h4> */}
        <Link
          href={'/'}
          // onClick={() => setActiveTab(tab.id)}
          className={`w-full text-left px-4 pt-4 pb-2 mb-2 rounded transition-colors duration-150 ease-in-out ${
            ''
            // activeTab === tab.id
            //   ? 'bg-blue-500 text-white'
            //   : 'hover:bg-gray-200'
          }`}
        >
          Ideation
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 justify-end bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'
          )}
        >
          <IconPlus className=" stroke-2" />
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList userId={userId} />
      </React.Suspense>
    </div>
  )
}
