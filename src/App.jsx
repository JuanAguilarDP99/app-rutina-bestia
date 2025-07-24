import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Checkbox } from "./components/ui/checkbox";
import { Progress } from "./components/ui/progress";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const routineData = {
  day1: [
    { name: "Press de banca con barra", video: "https://www.youtube.com/watch?v=SCVCLChPQFY" },
    { name: "Press inclinado con mancuernas", video: "https://www.youtube.com/watch?v=8iPEnn-ltC8" },
    { name: "Fondos en paralelas", video: "https://www.youtube.com/watch?v=0AUGkch3tzc" },
  ],
  day2: [
    { name: "Remo con barra", video: "https://www.youtube.com/watch?v=vT2GjY_Umpw" },
    { name: "Jalón al pecho", video: "https://www.youtube.com/watch?v=CAwf7n6Luuc" },
    { name: "Peso muerto", video: "https://www.youtube.com/watch?v=ytGaGIn3SjE" },
  ],
  day3: [
    { name: "Elevaciones laterales", video: "https://www.youtube.com/watch?v=kDqklk1ZESo" },
    { name: "Press militar", video: "https://www.youtube.com/watch?v=B-aVuyhvLHU" },
    { name: "Encogimientos con mancuernas", video: "https://www.youtube.com/watch?v=6TSP1TRMUzs" },
  ],
  day4: [
    { name: "Curl con barra", video: "https://www.youtube.com/watch?v=kwG2ipFRgfo" },
    { name: "Curl martillo", video: "https://www.youtube.com/watch?v=zC3nLlEvin4" },
    { name: "Curl concentrado", video: "https://www.youtube.com/watch?v=ul2zP73L7j4" },
  ],
  day5: [
    { name: "Extensiones de tríceps", video: "https://www.youtube.com/watch?v=vB5OHsJ3EME" },
    { name: "Press cerrado", video: "https://www.youtube.com/watch?v=JHDK0pZ5YH4" },
    { name: "Patada de tríceps", video: "https://www.youtube.com/watch?v=6SSIxhh0Aqs" },
  ],
  day6: [
    { name: "Circuito full body con mancuernas", video: "https://www.youtube.com/watch?v=aRYn1yxQJ_Y" },
    { name: "Burpees", video: "https://www.youtube.com/watch?v=dZgVxmf6jkA" },
    { name: "Planchas", video: "https://www.youtube.com/watch?v=pSHjTRCQxIw" },
  ],
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
            const isExpanded = expandedDay === dayIndex;

            return (
              <Card
                key={key}
                className="cursor-pointer"
                onClick={() => setExpandedDay(isExpanded ? null : dayIndex)}
              >
                <CardContent className="p-4 bg-white text-black rounded-xl shadow-md">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Día {dayIndex + 1}</h3>
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => handleCheck(currentWeek, dayIndex)}
                    />
                  </div>

                  {/* Animación simple */}
                  <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-[600px] mt-2" : "max-h-0"
                  }`}
                  >
                    <ul className="list-disc pl-5 text-sm">
                      {exercises.map((ex, i) => (
                        <li key={i} className="mb-1">
                          {ex.name}{" "}
                          <a
                            href={ex.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline ml-2"
                          >
                            Ver
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
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


