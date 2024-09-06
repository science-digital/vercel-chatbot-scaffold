'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { PlusIcon, MinusIcon, Cross2Icon } from '@radix-ui/react-icons'

type Step = {
  title: string
  desc: string
  actions: string[]
}

type ExperimentStepsProps = {
  initialSteps: Step[]
}

export default function ExperimentSteps({
  initialSteps
}: ExperimentStepsProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps)

  const addStep = () => {
    setSteps([
      ...steps,
      { title: 'New Step', desc: 'Description', actions: ['Action 1'] }
    ])
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const addAction = (stepIndex: number) => {
    setSteps(
      steps.map((step, i) =>
        i === stepIndex
          ? {
              ...step,
              actions: [...step.actions, `Action ${step.actions.length + 1}`]
            }
          : step
      )
    )
  }

  const removeAction = (stepIndex: number, actionIndex: number) => {
    setSteps(
      steps.map((step, i) =>
        i === stepIndex
          ? {
              ...step,
              actions: step.actions.filter((_, j) => j !== actionIndex)
            }
          : step
      )
    )
  }

  return (
    <div className="pt-10 pl-10 pr-10 bg-gray-100 min-h-screen">
      <div className="mb-2">
        <h1 className="text-3xl font-bold mb-2">Experiment Design</h1>
        <p className="text-gray-600">Plan your research methodology</p>
        <div className="flex justify-end mb-6 -mt-10">
          <Button variant="outline" className="mr-3">
            ✨ Generate Draft
          </Button>
          <Button onClick={addStep}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {steps.map((step, stepIndex) => (
          <Card
            key={stepIndex}
            className="relative flex flex-col justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeStep(stepIndex)}
            >
              <Cross2Icon className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <CardDescription className="text-sm">{step.desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="text-sm font-semibold mb-2">Actions:</h4>
              <ul className="list-disc space-y-1">
                {step.actions.map((action, actionIndex) => (
                  <li
                    key={actionIndex}
                    className="flex items-center justify-between text-sm ring-1 ring-gray-200 rounded-md p-2"
                  >
                    <span>{action}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAction(stepIndex, actionIndex)}
                    >
                      <MinusIcon className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addAction(stepIndex)}
              >
                <PlusIcon className="h-3 w-3 mr-1" />
                Add Action
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
