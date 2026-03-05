"use client"

import { Activity, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DailyPassiveEarning() {
  const currentPoints = 45
  const maxPoints = 100
  const progressPercentage = (currentPoints / maxPoints) * 100

  return (
    <Card className="bg-gray-50/80 border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-base">Sua Atividade Hoje</h3>
        <span className="text-xs text-muted-foreground ml-auto">(Ganho Automático)</span>
      </div>

      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="relative">
          <Progress value={progressPercentage} className="h-3 bg-gray-200" />
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-y-[6px]">
            <div className="bg-gray-300 rounded-full p-1">
              <Lock className="h-3 w-3 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Label and Context */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-green-700">
            {currentPoints} / {maxPoints} pts diários
          </span>
          <span className="text-xs text-muted-foreground">1 pt a cada 2 min</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Ganhe 1 pt a cada 2 min de atividade física registrada.
        </p>
      </div>
    </Card>
  )
}
