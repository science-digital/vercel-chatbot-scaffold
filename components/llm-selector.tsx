import { useState } from 'react'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export function LLMSelector() {
  const llmOptions = [
    { value: 'gpt4', label: 'ChatGPT-4o' },
    { value: 'gpt35', label: 'ChatGPT-3.5' },
    { value: 'claude35', label: 'Claude 3.5 Sonnet' },
    { value: 'palm2', label: 'PaLM 2' },
    { value: 'llama2', label: 'LLaMA 2' }
  ]

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(llmOptions[0]?.value || '')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? (llmOptions.find(option => option.value === value)?.label ??
              'Select LLM...')
            : 'Select LLM...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search LLM..." />
          <CommandEmpty>No LLM found.</CommandEmpty>
          <CommandGroup>
            {Array.isArray(llmOptions) &&
              llmOptions.length > 0 &&
              llmOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={currentValue => {
                    if (
                      currentValue &&
                      llmOptions.some(opt => opt.value === currentValue)
                    ) {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandList />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
