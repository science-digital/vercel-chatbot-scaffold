'use client'

import React, { useEffect, useState } from 'react'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'

import {
  PlusIcon,
  Cross2Icon,
  EyeOpenIcon,
  Pencil1Icon
} from '@radix-ui/react-icons'

interface KanbanCard {
  id: string
  content: string
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

const initialColumns: KanbanColumn[] = [
  {
    id: 'general',
    title: 'Unassigned',
    cards: [
      {
        id: 'card-1',
        content:
          'Enzyme persistence: Scholarship examines how long engineered enzymes remain active in various environmental conditions (soil, water, etc.).'
      }
    ]
  },
  {
    id: 'background',
    title: 'Background',
    cards: [
      {
        id: 'card-2',
        content:
          'Bioaccumulation potential: Research investigates whether degradation products or the enzymes themselves could accumulate in living organisms.'
      }
    ]
  },
  { id: 'variables', title: 'Variables', cards: [] },
  { id: 'predictions', title: 'Predictions', cards: [] },
  { id: 'testability', title: 'Testability', cards: [] },
  { id: 'relevance', title: 'Relevance', cards: [] }
]

function SortableCard(props: {
  id: any
  content:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined
  onDelete: (arg0: any) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="mb-2 cursor-move"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-2 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="truncate text-xs flex-grow">{props.content}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => props.onDelete(props.id)}
            className="ml-2 flex-shrink-0"
          >
            <Cross2Icon className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex justify-between items-center gap-2">
          <Popover className="w-full">
            <PopoverTrigger className="w-full">
              <Button
                size="xs"
                className="text-xs p-1 bg-gray-100 rounded-md flex items-center text-gray-600 w-full basis-1/2"
              >
                <Pencil1Icon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm mb-3">Edit snippet.</p>
              <Button variant="outline">Save</Button>
              <Button variant="outline">Cancel</Button>
            </PopoverContent>
          </Popover>
          <Popover className="w-full">
            <PopoverTrigger className="w-full">
              <Button
                size="xs"
                className="text-xs p-1 bg-gray-100 rounded-md flex items-center text-gray-600 w-full basis-1/2"
              >
                <EyeOpenIcon className="h-4 w-4 mr-2" />
                Source
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm mb-3">Summary of the source here.</p>
              <Button variant="outline">Full source</Button>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}

function Column({
  column,
  cards,
  onAddCard,
  onDeleteCard,
  onViewSource,
  onDeleteColumn
}) {
  const [newCardContent, setNewCardContent] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCard = () => {
    if (newCardContent.trim()) {
      onAddCard(column.id, newCardContent.trim())
      setNewCardContent('')
    }
  }

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  })

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 p-4 rounded-lg flex-shrink-0 w-64"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-2">{column.title}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Cross2Icon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete the column "{column.title}"? This
              action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDeleteColumn(column.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-2 overflow-y-auto max-h-[calc(100vh-250px)] min-h-[100px]">
        <SortableContext
          items={cards.map((card: { id: any }) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card: { id: any; content: any }) => (
            <SortableCard
              key={card.id}
              id={card.id}
              content={card.content}
              onDelete={onDeleteCard}
              onViewSource={onViewSource}
            />
          ))}
        </SortableContext>
      </div>
      <div className="mt-2 flex flex-col">
        <Input
          type="text"
          placeholder="New card"
          value={newCardContent}
          onChange={e => setNewCardContent(e.target.value)}
          className="mb-2 bg-gray-100"
        />
        <Button onClick={handleAddCard} className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </div>
    </div>
  )
}

export default function Component() {
  const [columns, setColumns] = useState(initialColumns)
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // Add a useEffect to handle user-select during drag
  useEffect(() => {
    if (activeId !== null) {
      // Disable text selection
      document.body.style.userSelect = 'none'
    } else {
      // Re-enable text selection
      document.body.style.userSelect = 'auto'
    }

    // Cleanup function to reset user-select when the component is unmounted or drag ends
    return () => {
      document.body.style.userSelect = 'auto'
    }
  }, [activeId])

  const findColumnForCard = (cardId: string) => {
    return columns.find(column => column.cards.some(card => card.id === cardId))
  }

  const handleDragStart = (event: { active: any }) => {
    const { active } = event
    setActiveId(active.id)
  }

  const handleDragOver = (event: { active: any; over: any }) => {
    const { active, over } = event

    if (!over) return

    const activeColumn = findColumnForCard(active.id)
    const overColumn =
      columns.find(col => col.id === over.id) || findColumnForCard(over.id)

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id)
      return

    setColumns(prevColumns => {
      const activeColumnIndex = prevColumns.findIndex(
        col => col.id === activeColumn.id
      )
      const overColumnIndex = prevColumns.findIndex(
        col => col.id === overColumn.id
      )

      return prevColumns.map((column, index) => {
        if (index === activeColumnIndex) {
          return {
            ...column,
            cards: column.cards.filter(card => card.id !== active.id)
          }
        } else if (index === overColumnIndex) {
          const newCard = activeColumn.cards.find(card => card.id === active.id)
          return {
            ...column,
            cards: [...column.cards, newCard]
          }
        } else {
          return column
        }
      })
    })
  }

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event

    if (!over) return

    const activeColumn = findColumnForCard(active.id)
    const overColumn =
      columns.find(col => col.id === over.id) || findColumnForCard(over.id)

    if (!activeColumn || !overColumn) return

    if (activeColumn.id !== overColumn.id) {
      setColumns(prevColumns => {
        const activeColumnIndex = prevColumns.findIndex(
          col => col.id === activeColumn.id
        )
        const overColumnIndex = prevColumns.findIndex(
          col => col.id === overColumn.id
        )

        return prevColumns.map((column, index) => {
          if (index === activeColumnIndex) {
            return {
              ...column,
              cards: column.cards.filter(card => card.id !== active.id)
            }
          } else if (index === overColumnIndex) {
            const newCard = activeColumn.cards.find(
              card => card.id === active.id
            )
            return {
              ...column,
              cards: [...column.cards, newCard]
            }
          } else {
            return column
          }
        })
      })
    } else {
      const oldIndex = activeColumn.cards.findIndex(
        card => card.id === active.id
      )
      const newIndex = activeColumn.cards.findIndex(card => card.id === over.id)

      setColumns(prevColumns => {
        const columnIndex = prevColumns.findIndex(
          col => col.id === activeColumn.id
        )
        const newColumns = [...prevColumns]
        newColumns[columnIndex] = {
          ...activeColumn,
          cards: arrayMove(activeColumn.cards, oldIndex, newIndex)
        }
        return newColumns
      })
    }

    setActiveId(null)
  }

  const handleAddCard = (columnId: string, content: any) => {
    const newCard = { id: `card-${Date.now()}`, content }
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    )
  }

  const handleDeleteCard = (cardId: string) => {
    setColumns(cols =>
      cols.map(col => ({
        ...col,
        cards: col.cards.filter(card => card.id !== cardId)
      }))
    )
  }

  const handleDeleteColumn = (columnId: string) => {
    setColumns(prevColumns => prevColumns.filter(col => col.id !== columnId))
  }

  const handleAddColumn = () => {
    const newColumnId = `column-${Date.now()}`
    const newColumn = {
      id: newColumnId,
      title: `New Column ${columns.length + 1}`,
      cards: []
    }
    setColumns([...columns, newColumn])
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="pt-10 pl-10 pr-10 bg-gray-100 min-h-screen">
        <div className="mb-2">
          <h1 className="text-3xl font-bold mb-2">Hypothesis</h1>
          <p className="text-gray-600">
            Organise artefacts into key areas to shape your hypothesis.
          </p>
          <div className="flex justify-end mb-6 -mt-10">
            <Button onClick={handleAddColumn}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Column
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
              cards={column.cards}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onViewSource={() => {}}
              onDeleteColumn={handleDeleteColumn}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <Card className="mb-2 cursor-move">
            <CardContent className="p-2 text-xs">
              {
                columns
                  .flatMap(col => col.cards)
                  .find(card => card.id === activeId)?.content
              }
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
