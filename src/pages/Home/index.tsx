import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
  
} from './styles'


import { createContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleeForm'
import { CountDown } from './components/CountDown'



interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined; 
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext =  createContext({} as CyclesContextType )

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   reset()
  // }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  

  function handleInterruptCycle() {
    setCycles(state => state.map((cycle) => {
      if(cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      }else {
        return cycle
      }
    }),
    )

    setActiveCycleId(null)
    
  }
  
  

  // const task = watch('task')
  // const isSubmitDisable = !task

  

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>

        <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}} >
        
        {/* <NewCycleForm />    */}
        <CountDown />  

        </CyclesContext.Provider>   

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /*disabled={isSubmitDisable}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}

        
      </form>
    </HomeContainer>
  )
}