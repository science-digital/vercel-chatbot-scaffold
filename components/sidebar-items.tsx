'use client'

import { Chat } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

import { removeChat, shareChat } from '@/app/actions'

import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface SidebarItemsProps {
  chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null

  return (
    <AnimatePresence>
      <Card className="p-1 mb-4">
        <CardContent className="m-0 p-0">
          {chats.map(
            (chat, index) =>
              chat && (
                <motion.div
                  key={chat?.id}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                >
                  <SidebarItem index={index} chat={chat}>
                    <SidebarActions
                      chat={chat}
                      removeChat={removeChat}
                      shareChat={shareChat}
                    />
                  </SidebarItem>
                </motion.div>
              )
          )}
        </CardContent>
      </Card>
    </AnimatePresence>
  )
}
