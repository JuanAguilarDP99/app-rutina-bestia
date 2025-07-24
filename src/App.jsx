import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Checkbox } from "./components/ui/checkbox";
import { Progress } from "./components/ui/progress";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const routineData = {
  day1: ["Press de banca con barra", "Press inclinado con mancuernas", "Fondos en paralelas"],
  day2: ["Remo con barra", "Jalón al pecho", "Peso muerto"],
  day3: ["Elevaciones laterales", "Press militar", "Encogimientos con mancuernas"],
  day4: ["Curl con barra", "Curl martillo", "Curl concentrado"],
  day5: ["Extensiones de tríceps", "Press cerrado", "Patada de tríceps"],
  day6: ["Circuito full body con mancuernas", "Burpees", "Planchas"]
};

const TOTAL_WEEKS = 5;
const DAYS_PER_WEEK = 6;

export default function App() {
  const [activeTab, setActiveTab] = useState("rutina");
  const [checkedDays, setCheckedDays] = useState(() => {
    const saved = localStorage.getItem("checkedDays");
    return saved ? JSON.parse(saved) : Array(TOTAL_WEEKS).fill([]);
  });
  const [currentWeek, setCurrentWeek] = useState(0);
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    localStorage.setItem("checkedDays", JSON.stringify(checkedDays));
  }, [checkedDays]);

  const handleCheck = (weekIndex, dayIndex) => {
    const newChecked = [...checkedDays];
    if (!newChecked[weekIndex]) newChecked[weekIndex] = [];
    if (newChecked[weekIndex].includes(dayIndex)) {
      newChecked[weekIndex] = newChecked[weekIndex].filter(i => i !== dayIndex);
    } else {
      newChecked[weekIndex].push(dayIndex);
    }
    setCheckedDays(newChecked);
  };

  const getProgress = (weekIndex) => {
    const completed = checkedDays[weekIndex]?.length || 0;
    return Math.round((completed / DAYS_PER_WEEK) * 100);
  };

  return (
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full mb-4">
          <TabsTrigger value="rutina">Rutina</TabsTrigger>
          <TabsTrigger value="alimentacion">Alimentación</TabsTrigger>
          <TabsTrigger value="progreso">Progreso</TabsTrigger>
          <TabsTrigger value="glosario">Glosario</TabsTrigger>
          <TabsTrigger value="tip">Consejo</TabsTrigger>
        </TabsList>

        <TabsContent value="rutina">
          <div className="flex justify-between items-center mb-2">
            <Button onClick={() => setCurrentWeek(w => Math.max(w - 1, 0))}>⟵ Semana {currentWeek}</Button>
            <h2 className="text-xl font-bold">Semana {currentWeek + 1}</h2>
            <Button onClick={() => setCurrentWeek(w => Math.min(w + 1, TOTAL_WEEKS - 1))}>Semana {currentWeek + 2} ⟶</Button>
          </div>

          <Progress value={getProgress(currentWeek)} className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(DAYS_PER_WEEK)].map((_, dayIndex) => {
              const key = `Semana${currentWeek}-Dia${dayIndex}`;
              const isChecked = checkedDays[currentWeek]?.includes(dayIndex);
              const exercises = routineData[`day${dayIndex + 1}`] || [];
              return (
                <Card key={key} className="cursor-pointer" onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}>
                  <CardContent className="p-4 bg-white text-black rounded-xl shadow-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Día {dayIndex + 1}</h3>
                      <Checkbox checked={isChecked} onCheckedChange={() => handleCheck(currentWeek, dayIndex)} />
                    </div>
                    {expandedDay === dayIndex && (
                      <ul className="mt-2 list-disc pl-5 text-sm">
                        {exercises.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="alimentacion">
          <Card><CardContent className="p-4">🍽️ Aquí irán las recetas y sugerencias alimenticias.</CardContent></Card>
        </TabsContent>

        <TabsContent value="progreso">
          <Card><CardContent className="p-4">📈 Aquí se podrá registrar y visualizar el progreso semanal.</CardContent></Card>
        </TabsContent>

        <TabsContent value="glosario">
          <Card><CardContent className="p-4">📖 Definiciones: dropset, hipertrofia, rest-pause, etc.</CardContent></Card>
        </TabsContent>

        <TabsContent value="tip">
          <Card><CardContent className="p-4">💡 Tip del día: "No es magia, es constancia."</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


