import { isSameDay } from "date-fns";
import {  type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = {

  children: ReactNode
}


export function HabitProvider({ children }: HabitProviderProps) {
  const { storedValue: habits, setStoredValue: setHabits } =
  useLocalStorage<Habit[]>("Habit", [])
  function addHabit(name: string) {
    setHabits([...habits, { id: crypto.randomUUID(), name, completion: [] }])
  }

  function deleteHabit(id: string) {
    setHabits(curr => curr.filter(h => h.id !== id))
  }

  function toggleHabit(id: string, date: Date) {
  setHabits(curr =>
    curr.map(h => {
      if (h.id !== id) return h

      const alreadyCompleted = h.completion.some(c =>
        isSameDay(c, date)
      )

      const completion = alreadyCompleted
        ? h.completion.filter(c => !isSameDay(c, date))
        : [...h.completion, date]

      return { ...h, completion }
    })
  )
}

  return <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
    {children}
  </HabitContext>
}


