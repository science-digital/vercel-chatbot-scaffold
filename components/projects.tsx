'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DotsVerticalIcon, PlusIcon } from '@radix-ui/react-icons'

interface User {
  name: string
  avatar: string
}

interface Project {
  id: string
  name: string
  description: string
  users: User[]
  dateCreated: Date
  dateUpdated: Date
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Genomic Annotation',
      description:
        'Genome annotation plays a pivotal role in seed design and optimisation by providing comprehensive insights into the genetic makeup of plants.',
      users: [
        { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' }
      ],
      dateCreated: new Date('2023-01-15'),
      dateUpdated: new Date('2023-06-20')
    },
    {
      id: '2',
      name: 'Digitisation of National Collection & Autonomous Labs',
      description:
        'Biological collections provide a unique record of species diversity, distribution and biological interactions across space and time. ',
      users: [
        { name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
        { name: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Eve', avatar: 'https://i.pravatar.cc/150?img=5' }
      ],
      dateCreated: new Date('2023-03-10'),
      dateUpdated: new Date('2023-06-18')
    }
  ])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <Link href={`projects/${project.id}`}>
                  <CardTitle className="text-xl font-bold mb-2">
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </Link>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex space-x-2 mb-4">
                {project.users.map((user, index) => (
                  <Avatar key={index}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Created: {formatDate(project.dateCreated)}</p>
                <p>Last updated: {formatDate(project.dateUpdated)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
