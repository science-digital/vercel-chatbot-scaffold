import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

interface Reccomendation {
  name: string
  description: string
  category: string
  url: string
}

interface AnalysisTools {
  topic: string
  recommendations: Reccomendation[]
}

export function AnalysisTools({
  props: { topic, recommendations }
}: {
  props: AnalysisTools
}) {
  console.log('props', { topic, recommendations })

  if (!topic) return null
  return (
    <div className="container mx-auto">
      <h3 className="text-xl font-bold mb-6">Tools for {topic}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((tool, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="p-4">
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription className="text-xs">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Badge variant="secondary" className="text-xs">
                {tool.category}
              </Badge>
            </CardContent>
            <CardFooter className="p-4">
              <Button asChild className="w-full">
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AnalysisToolsLoading({
  props: { topic, recommendations = [] }
}: {
  props: AnalysisTools
}) {
  // Create an array of 6 items to match the number of tools in the main component
  const skeletonItems = Array(6).fill(null)

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-6">Tools for {topic ?? 'error'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonItems.map((_, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-5 w-20" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
