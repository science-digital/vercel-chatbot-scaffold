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
import { LLMSelector } from '@/components/llm-selector'

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
          <DialogTitle>AI Agent Configuration</DialogTitle>
          <DialogDescription>
            Configure the foundational model and persona.
          </DialogDescription>
        </DialogHeader>

        <h3 className="mt-3 -mb-3 font-bold">LLM:</h3>
        <LLMSelector />

        <div className="grid gap-4 py-4">
          <h3 className="-mb-3 font-bold">
            Custom instructions / agent persona:
          </h3>
          <Textarea
            placeholder="e.g. assume the persona of a bioinformatics researcher specializing in genomic data analysis. You are familiar with tools like BLAST, R, and Python for large-scale data processing. You use tool-calling to invoke highly specialised tools to handle tasks wherever possible"
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
