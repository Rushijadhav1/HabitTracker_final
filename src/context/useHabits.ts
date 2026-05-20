import { createContext, useContext } from "react"

export type Habit = {
    id: string | number
    name: string
    completion: Date[]
}

type Context = {
    habits: Habit[]
    addHabit: (name: string) => void
    deleteHabit: (id: string) => void
    toggleHabit: (id: string, dtae: Date) => void
}

export const HabitContext = createContext<null | Context>(null)

export function useHabits() {
    const habitContext = useContext(HabitContext)
    if (habitContext == null) throw new Error("null context")

return habitContext
}