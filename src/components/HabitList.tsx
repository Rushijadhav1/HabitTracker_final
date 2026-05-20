//import { useHabits, type Habit } from "../context/HabitProvider";
import { useHabits, type Habit } from "../context/useHabits"
import  Button  from "./Button"

import {
  format,
  isFuture,
  isSameDay,
  subDays,
  isSameMonth,
} from "date-fns"

type HabitListProps = {
  visibleDates: Date[]
}

export function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits()

  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No Habits yet. Add one above to get started!
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          visibleDates={visibleDates}
        />
      ))}
    </div>
  )
}

type HabitItemProps = {
  habit: Habit
  visibleDates: Date[]
}

function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits()

  // Current streak
  const currentStreak = getCurrentStreak(habit.completion)

  // Best streak
  const bestStreak = getBestStreak(habit.completion)

  // Monthly count
  const monthlyCount = getMonthlyCount(habit.completion)

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {/* Habit Name */}
          <span className="font-medium text-white text-lg">
            {habit.name}
          </span>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 text-sm">
            {/* Current Streak */}
            <span className="text-amber-400">
              🔥 Current: {currentStreak} Day
              {currentStreak !== 1 ? "s" : ""}
            </span>

            {/* Best Streak */}
            <span className="text-pink-400">
              🏆 Best: {bestStreak} Day
              {bestStreak !== 1 ? "s" : ""}
            </span>

            {/* Monthly Count */}
            <span className="text-green-400">
              ✅ {monthlyCount} Days This Month
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <Button
          onClick={() => deleteHabit(habitId)}
          variant="ghost-destructive"
          className="text-sm"
        >
          Delete
        </Button>
      </div>

      {/* Date Buttons */}
     <div className="flex gap-1.5">
  {visibleDates.map((date) => (
    <Button
      key={date.toISOString()}
      disabled={isFuture(date)}
      onClick={() => toggleHabit(habitId, date)}
      className="flex flex-1 flex-col items-center gap-0.5 rounded-lg"
      variant={
        habit.completion.some((d) =>
          isSameDay(d, date)
        )
          ? "primary"
          : "secondary"
      }
    >
      <span className="font-medium">
        {format(date, "EEE")}
      </span>

      <span>{format(date, "d")}</span>
    </Button>
  ))}
</div>
    </div>
  )
}

/* ---------------- CURRENT STREAK ---------------- */

function getCurrentStreak(completion: Date[]) {
  let streak = 0
  let date = new Date()

  while (
    completion.some((c) =>
      isSameDay(new Date(c), date)
    )
  ) {
    streak++
    date = subDays(date, 1)
  }

  return streak
}

function getBestStreak(completion: Date[]) {
  if (completion.length === 0) return 0

  const sortedDates = completion
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime())

  let best = 1
  let current = 1

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1]
    const curr = sortedDates[i]

    if (isSameDay(subDays(curr, 1), prev)) {
      current++
      best = Math.max(best, current)
    } else {
      current = 1
    }
  }

  return best
}

function getMonthlyCount(completion: Date[]) {
  const today = new Date()

  return completion.filter((date) =>
    isSameMonth(new Date(date), today)
  ).length
}