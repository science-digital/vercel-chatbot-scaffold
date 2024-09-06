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
import { Cross2Icon, PaperPlaneIcon } from '@radix-ui/react-icons'

interface TextHighlighterProps {
  children: React.ReactNode
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({ children }) => {
  const [showPopover, setShowPopover] = useState(false)
  const [popoverText, setPopoverText] = useState<string | null>(null)
  const [selectedRange, setSelectedRange] = useState<Range | null>(null)
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLSpanElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      if (selectedText.trim()) {
        // Adjust the range to fully enclose any partially selected nodes
        adjustRangeForWrapping(range)

        // Store the selected range for future reference
        setSelectedRange(range.cloneRange())

        // Create a span element with a highlight class
        const highlightSpan = document.createElement('span')
        highlightSpan.style.backgroundColor = 'yellow'
        highlightSpan.style.cursor = 'pointer'

        try {
          // Wrap the adjusted range's contents with the highlight span
          range.surroundContents(highlightSpan)

          // When the user clicks the highlighted text, show the Popover
          highlightSpan.onclick = () => {
            handleClickHighlight(range)
          }

          // Store the highlighted element for clearing later
          setHighlightedElement(highlightSpan)

          // Show the Popover near the highlighted text
          setPopoverText(selectedText)
          setShowPopover(true)

          // Clear the selection
          selection.removeAllRanges()
        } catch (error) {
          console.error('Failed to wrap contents:', error)
        }
      }
    }
  }

  // Function to adjust range so it fully wraps nodes if the selection is partial
  const adjustRangeForWrapping = (range: Range) => {
    // Expand the start of the range if it's a partial selection of a node
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      // If starting in a text node, find the start of that node's parent element
      if (range.startOffset === 0) {
        range.setStartBefore(range.startContainer.parentNode!)
      }
    } else {
      range.setStartBefore(range.startContainer)
    }

    // Expand the end of the range if it's a partial selection of a node
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      // If ending in a text node, find the end of that node's parent element
      if (range.endOffset === (range.endContainer as Text).length) {
        range.setEndAfter(range.endContainer.parentNode!)
      }
    } else {
      range.setEndAfter(range.endContainer)
    }
  }

  const handleClickHighlight = (range: Range) => {
    setPopoverText(range.toString())
    setShowPopover(true)
  }

  const clearSelection = () => {
    if (highlightedElement && selectedRange) {
      // Unwrap the highlighted element by replacing it with its original content
      const parent = highlightedElement.parentNode
      while (highlightedElement.firstChild) {
        parent?.insertBefore(highlightedElement.firstChild, highlightedElement)
      }
      parent?.removeChild(highlightedElement)

      // Clear highlight state
      setShowPopover(false)
      setPopoverText(null)
      setSelectedRange(null)
      setHighlightedElement(null)
    }
  }

  return (
    <div onMouseUp={handleTextSelection} className="relative">
      {children}

      {showPopover && popoverText && (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
          <PopoverTrigger asChild>
            <span ref={popoverRef} />
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start">
            <div>
              <div>This relates to:</div>
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
            <div className="flex items-center justify-between">
              <Button
                className="mt-6"
                variant="outline"
                onClick={clearSelection}
              >
                Clear
                <Cross2Icon className="w-4 h-4 ml-2" />
              </Button>
              <Button className="mt-6">
                Send
                <PaperPlaneIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

export default TextHighlighter
