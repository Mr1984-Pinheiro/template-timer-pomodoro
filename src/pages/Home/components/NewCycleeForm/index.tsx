import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
  })
  
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm () {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
          task: "",
          minutesAmount: 0,
        }
      })

      
    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            placeholder='Dê um nome para o seu projeto' 
            id="task" 
            list='task-suggestions'
            disabled={!!activeCycle}
            {...register('task')}
            />

          <datalist id='task-suggestions'>
            <option value='Projeto 1' />
            <option value='Projeto 2' />
            <option value='Projeto 3' />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
          placeholder='00' 
          type="number" 
          id="minutesAmount"
          step={5}
          min={1}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
    )
}