import { useEffect, useState } from "react";

const STORAGE_KEY = "focusflow-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalMinutesFocused, setTotalMinutesFocused] = useState(0);

  // Load from localStorage on first render
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setTasks(saved);
      }
    } catch (e) {
      // if parsing fails, just start fresh
      setTasks([]);
    }
  }, []);

  // Whenever tasks change: recalc totals + save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Total minutes
    const minutes = tasks.reduce(
      (sum, t) => sum + (Number(t.minutes) || 0),
      0
    );
    setTotalMinutesFocused(minutes);

    // Simple streak placeholder: 1 if anything completed, else 0
    const completedCount = tasks.filter((t) => t.completed).length;
    setStreak(completedCount > 0 ? 1 : 0);

    // Persist tasks
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
