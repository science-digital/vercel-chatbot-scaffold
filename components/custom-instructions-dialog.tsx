'use client'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { GearIcon } from '@radix-ui/react-icons'

export function CustomInstructionsDialog() {
  return (
    <Dialog defaultClosed>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-2 h-8 justify-end bg-zinc-50 px-2 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10"
        >
          <GearIcon className="stroke-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Custom Instructions</DialogTitle>
          <DialogDescription>
            Enter custom instructions for the AI Agent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="e.g. assume the persona of a bioinformatics researcher specializing in genomic data analysis. You are familiar with tools like BLAST, R, and Python for large-scale data processing, you use all available tools to help interpret complex biological data"
            className="min-h-[200px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
