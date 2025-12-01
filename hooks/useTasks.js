import { useEffect, useState } from "react";

const STORAGE_KEY = "focusflow-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalMinutesFocused, setTotalMinutesFocused] = useState(0);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setTasks(saved);
    // simple totals
    const minutes = saved.reduce(
      (sum, t) => sum + (Number(t.minutes) || 0),
      0
    );
    const completed = saved.filter((t) => t.completed).length;
    setTotalMinutesFocused(minutes);
    // dummy streak = completed days count (you can improve later)
    setStreak(completed > 0 ? 1 : 0);
  }, []);

  // Save anytime tasks change
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title, minutes) {
    if (!title) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        minutes: Number(minutes) || 0,
        completed: false,
      },
    ]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return {
    tasks,
    addTask,
    toggleTask,
    completedCount,
    streak,
    totalMinutesFocused,
  };
}
