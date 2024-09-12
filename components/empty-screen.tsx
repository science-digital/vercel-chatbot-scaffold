import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Science Digital - User Interface (UI) Prototype
        </h1>
        <p className="leading-normal text-muted-foreground">
          The purpose of this prototype is to demonstrate some very basic
          structure and functionality of the Science Digital platform's UI.
        </p>
        <p className="leading-normal text-muted-foreground">
          It is not intended to be a fully functional product.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can interact with the system via text prompt, or nagivating to
          various pages using the navigation menu on the left
        </p>
      </div>
    </div>
  )
}
