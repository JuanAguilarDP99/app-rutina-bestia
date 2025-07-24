import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Progress } from "./components/ui/progress";
import { Button } from "./components/ui/button";

const TOTAL_WEEKS = 5;
const DAYS_PER_WEEK = 6;

const generateInitialProgress = () => {
  const saved = localStorage.getItem("weeklyProgress");
  return saved ? JSON.parse(saved) : Array(TOTAL_WEEKS).fill().map(() => Array(DAYS_PER_WEEK).fill(false));
};

export default function App() {
  const [progress, setProgress] = useState(generateInitialProgress);
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    localStorage.setItem("weeklyProgress", JSON.stringify(progress));
  }, [progress]);

  const handleCheck = (dayIndex) => {
    const updated = [...progress];
    updated[currentWeek][dayIndex] = !updated[currentWeek][dayIndex];
    setProgress(updated);
  };

  const weeklyCompletion = () => {
    const completed = progress[currentWeek].filter(Boolean).length;
    return Math.round((completed / DAYS_PER_WEEK) * 100);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Semana {currentWeek + 1}</h1>

      <div className="mb-4">
        <Progress value={weeklyCompletion()} />
        <p className="text-center text-sm mt-2">Progreso semanal: {weeklyCompletion()}%</p>
      </div>

      <div className="space-y-3">
        {progress[currentWeek].map((checked, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between">
              <span>Día {i + 1}</span>
              <Checkbox checked={checked} onCheckedChange={() => handleCheck(i)} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
          className="disabled:opacity-50"
          disabled={currentWeek === 0}
        >
          Semana anterior
        </Button>
        <Button
          onClick={() => setCurrentWeek((prev) => Math.min(prev + 1, TOTAL_WEEKS - 1))}
          className="disabled:opacity-50"
          disabled={currentWeek === TOTAL_WEEKS - 1}
        >
          Semana siguiente
        </Button>
      </div>
    </div>
  );
}


