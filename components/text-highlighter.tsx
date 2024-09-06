import React, { useState, useRef } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select'
import { Cross2Icon } from '@radix-ui/react-icons'

interface TextHighlighterProps {
  children: React.ReactNode
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({ children }) => {
  const [showPopover, setShowPopover] = useState(false)
  const [popoverText, setPopoverText] = useState<string | null>(null)
  const [selectedRange, setSelectedRange] = useState<Range | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      if (selectedText.trim()) {
        // Store the selected range so we can refer to it later
        setSelectedRange(range.cloneRange())

        // Create a span element with a highlight class
        const highlightSpan = document.createElement('span')
        highlightSpan.style.backgroundColor = 'yellow'
        highlightSpan.style.cursor = 'pointer'
        highlightSpan.textContent = selectedText

        // When the user clicks the highlighted text, show the Popover
        highlightSpan.onclick = () => {
          handleClickHighlight(range)
        }

        // Replace the selected text with the span element in the DOM
        range.deleteContents()
        range.insertNode(highlightSpan)

        // Clear the selection
        selection.removeAllRanges()

        // Show the Popover near the highlighted text
        setPopoverText(selectedText)
        setShowPopover(true)
        positionPopover(range)
      }
    }
  }

  const positionPopover = (range: Range) => {
    const rect = range.getBoundingClientRect()
    if (popoverRef.current) {
      popoverRef.current.style.top = `${rect.top + window.scrollY}px`
      popoverRef.current.style.left = `${rect.left}px`
    }
  }

  const handleClickHighlight = (range: Range) => {
    setPopoverText(range.toString())
    setShowPopover(true)
    positionPopover(range)
  }

  return (
    <div onMouseUp={handleTextSelection} className="relative">
      {children}

      {showPopover && popoverText && (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <span ref={popoverRef} />
          </PopoverTrigger>
          <PopoverContent side="top">
            <div>
              <div>Snip to:</div>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Hypothesis (General)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Hypothesis</SelectLabel>
                    <SelectItem value="est">General</SelectItem>
                    <SelectItem value="cst">Background</SelectItem>
                    <SelectItem value="mst">Variables</SelectItem>
                    <SelectItem value="pst">Predictions</SelectItem>
                    <SelectItem value="akst">Testability</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Experiment Design</SelectLabel>
                    <SelectItem value="gmt">General</SelectItem>
                    <SelectItem value="cet">Methodology</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-6" variant="destructive">
              Clear
              <Cross2Icon className="w-4 h-4 ml-2" />
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default TextHighlighter
