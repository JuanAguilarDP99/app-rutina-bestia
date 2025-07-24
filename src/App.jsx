import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Checkbox } from "./components/ui/checkbox";
import { Bell, Dumbbell, Utensils, CalendarCheck, BookOpen, PlayCircle } from "lucide-react";
import { Progress } from "./components/ui/progress";

const workouts = [
  {
    day: "Día 1",
    title: "Pecho en Llamas",
    exercises: [
      { name: "Press banca plano con barra", video: "https://www.youtube.com/watch?v=rT7DgCr-3pg" },
      { name: "Press inclinado con mancuernas", video: "https://www.youtube.com/watch?v=8iPEnn-ltC8" },
      { name: "Press en máquina", video: "https://www.youtube.com/watch?v=bNpeM4RNVUQ" },
      { name: "Aperturas planas", video: "https://www.youtube.com/watch?v=eozdVDA78K0" },
      { name: "Peck deck / polea", video: "https://www.youtube.com/watch?v=LsXRj89cWa0" },
      { name: "Fondos", video: "https://www.youtube.com/watch?v=2z8JmcrW-As" }
    ]
  },
  // Puedes extender más días con sus respectivos videos...
];

const meals = [
  {
    title: "Desayuno",
    items: ["4 huevos + 2 claras", "Avena (1/2 taza)", "1 fruta (banano, manzana)"]
  },
  {
    title: "Almuerzo",
    items: ["200g pollo o carne", "1-2 tazas arroz/papa", "Brócoli, espinaca o pimiento"]
  },
  {
    title: "Cena",
    items: ["Tortilla de claras + atún + verduras", "Queso bajo grasa"]
  }
];

const dailyTips = [
  "Enfócate en la forma, no en el peso.",
  "Come dentro de los 30 minutos después de entrenar.",
  "La constancia supera la motivación.",
  "Dormir bien es igual de importante que entrenar.",
  "Haz estiramientos ligeros post-entreno para recuperarte mejor."
];

export default function App() {
  const [checkedDays, setCheckedDays] = useState([]);
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      if ((hour === 9 || hour === 13 || hour === 20) && minute === 0) {
        alert("¡Hora de comer!");
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress((checkedDays.length / workouts.length) * 100);
    setTipIndex(Math.floor(Math.random() * dailyTips.length));
  }, [checkedDays]);

  return (
    <div className="p-4">
      <Tabs defaultValue="rutina" className="w-full">
        <TabsList className="grid grid-cols-5 gap-2 mb-4">
          <TabsTrigger value="rutina"><Dumbbell className="inline mr-1" />Rutina</TabsTrigger>
          <TabsTrigger value="alimentacion"><Utensils className="inline mr-1" />Comidas</TabsTrigger>
          <TabsTrigger value="progreso"><CalendarCheck className="inline mr-1" />Progreso</TabsTrigger>
          <TabsTrigger value="glosario"><BookOpen className="inline mr-1" />Glosario</TabsTrigger>
          <TabsTrigger value="tip"><Bell className="inline mr-1" />Consejo</TabsTrigger>
        </TabsList>

        <TabsContent value="rutina">
          {workouts.map((day, i) => (
            <Card key={i} className="mb-4">
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{day.day}: {day.title}</h2>
                  <Checkbox
                    checked={checkedDays.includes(day.day)}
                    onCheckedChange={() => {
                      setCheckedDays((prev) =>
                        prev.includes(day.day)
                          ? prev.filter((d) => d !== day.day)
                          : [...prev, day.day]
                      );
                    }}
                  />
                </div>
                <ul className="list-disc ml-4">
                  {day.exercises.map((ex, j) => (
                    <li key={j} className="mb-1 flex items-center gap-2">
                      <a href={ex.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        <PlayCircle className="inline w-4 h-4 mr-1" /> {ex.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="alimentacion">
          {meals.map((meal, i) => (
            <Card key={i} className="mb-4">
              <CardContent>
                <h2 className="text-lg font-semibold mb-2">{meal.title}</h2>
                <ul className="list-disc ml-4">
                  {meal.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="progreso">
          <Card className="mb-4">
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Registro Semanal</h2>
              <p>Agrega tus medidas cada domingo:</p>
              <ul className="list-disc ml-4 mt-2">
                <li>Peso</li>
                <li>Brazo (relajado y contraído)</li>
                <li>Pecho</li>
                <li>Espalda</li>
                <li>Hombros</li>
                <li>Foto (frontal, lateral, espalda)</li>
              </ul>
              <div className="mt-4">
                <Progress value={progress} />
                <p className="text-sm mt-2">Progreso completado: {Math.round(progress)}%</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glosario">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Términos Técnicos</h2>
              <ul className="list-disc ml-4">
                <li><strong>Drop set:</strong> Bajar el peso y seguir sin descanso.</li>
                <li><strong>Rest-pause:</strong> Descanso breve y repetir al fallo.</li>
                <li><strong>Superset:</strong> Dos ejercicios seguidos sin pausa.</li>
                <li><strong>Fallo muscular:</strong> No poder hacer otra repetición con forma correcta.</li>
                <li><strong>Tempo:</strong> Ritmo de movimiento (Ej. 3-1-2).</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tip">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Consejo Diario</h2>
              <p>{dailyTips[tipIndex]}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

