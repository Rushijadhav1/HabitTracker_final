
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "./Button";
import { useHabits } from "../context/useHabits";

export function Habitform() {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { addHabit } = useHabits();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

if (name.trim() === "") return;

addHabit?.(name);
setName("");
setError("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;

// allow only letters and spaces
if (/^[A-Za-z\s]*$/.test(value)) {
  setName(value);
  setError("");
} else {
  setError("Only characters are allowed, numbers are not accepted");
}
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={handleChange}
          className="flex-1 rounded-lg bg-zinc-800 border border-zinc-500 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a new habit..."
        />

    <Button
      type="submit"
      disabled={name.trim() === ""}
      className="rounded-lg px-4 py-2 font-medium"
    >
      Add Habit
    </Button>
  </div>

  {error && (
    <p className="text-sm text-red-500 font-medium">
      {error}
    </p>
  )}
</form>
  );
}