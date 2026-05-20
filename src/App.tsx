import { Header } from "./components/Header"

import { HabitList } from "./components/HabitList"
import { HabitProvider } from "./context/HabitProvider"
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"
import { useState } from "react"
import { Habitform } from "./components/Habitform"

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0)

  const week = addWeeks(new Date(), weekOffset)
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  })

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">

      <HabitProvider>
        <Header visibleDates={visibleDates} 
        onNext={() => setWeekOffset(o => o + 1)}
        onPrev={() => setWeekOffset(o => o - 1)}/>
        <Habitform />
        <HabitList visibleDates={visibleDates}/>
      </HabitProvider>
    </div>
  )
}



