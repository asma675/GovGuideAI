import GlowCard from "@/components/GlowCard";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { tasks, completedCount, totalMinutesFocused } = useTasks();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("a11y-settings") || "{}")
