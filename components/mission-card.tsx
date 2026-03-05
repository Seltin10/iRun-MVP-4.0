"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Lock, Flame, Zap, Target } from "lucide-react"
import { useState } from "react"

interface Goal {
  id: number
  title: string
  description: string
  goal_type: string
  activity_type: string
  target_value: number
  target_unit: string
  required_plan: string
  current_value: number | null
  is_completed: boolean | null
}

const planHierarchy: Record<string, number> = {
  free: 0,
  basic: 1,
  premium: 2,
  sports: 3,
}

// Calculate points based on goal type
function calculatePoints(goalType: string, targetValue: number): number {
  if (goalType === "daily") return 50
  if (goalType === "weekly") return 150
  if (goalType === "monthly") return 300
  if (goalType === "caloric") return Math.floor(targetValue / 10) // 1 point per 10 kcal
  return 50
}

export function MissionCard({ goal, userPlan, userId }: { goal: Goal; userPlan: string; userId: string }) {
  const [claiming, setClaiming] = useState(false)
  const currentValue = Number(goal.current_value || 0)
  const targetValue = Number(goal.target_value)
  const progress = Math.min((currentValue / targetValue) * 100, 100)
  const isLocked = planHierarchy[userPlan] < planHierarchy[goal.required_plan]
  const isComplete = goal.is_completed || progress >= 100
  const points = calculatePoints(goal.goal_type, targetValue)

  // Determine if this is a sponsored challenge (for demo purposes, mark "premium" goals as sponsored)
  const isSponsored = goal.required_plan === "premium"
  const sponsorMultiplier = isSponsored ? 3 : 1
  const totalPoints = points * sponsorMultiplier

  const activityLabels: Record<string, string> = {
    running: "Corrida",
    cycling: "Ciclismo",
    swimming: "Natação",
    sports_plus: "SPORTS+",
    any: "Qualquer",
  }

  const activityIcons: Record<string, any> = {
    running: Target,
    cycling: Zap,
    swimming: Target,
    sports_plus: Flame,
    any: Target,
  }

  const Icon = activityIcons[goal.activity_type] || Target

  const handleClaimReward = async () => {
    if (!isComplete) return
    setClaiming(true)
    // TODO: Add API call to claim reward
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    setClaiming(false)
  }

  return (
    <Card className={`${isLocked ? "opacity-60" : ""} ${isSponsored ? "border-2 border-yellow-400 shadow-md" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon */}
            <div className={`p-2 rounded-lg ${isComplete ? "bg-green-100" : "bg-blue-50"}`}>
              <Icon className={`h-5 w-5 ${isComplete ? "text-green-600" : "text-blue-600"}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <CardTitle className="text-base sm:text-lg">
                  {goal.goal_type === "daily" && "Meta Diária - "}
                  {goal.title}
                </CardTitle>
                {isLocked && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                {isSponsored && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                    Starbucks
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs sm:text-sm">{goal.description}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {activityLabels[goal.activity_type]}
                </Badge>
                {isSponsored && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                    {sponsorMultiplier}x Pontos
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Reward Button */}
          {!isLocked && (
            <div className="flex flex-col items-end gap-1">
              <Button
                size="sm"
                disabled={!isComplete || claiming}
                onClick={handleClaimReward}
                className={`${
                  isComplete ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                } whitespace-nowrap`}
              >
                {isComplete ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-1" />+{totalPoints} pts
                  </>
                ) : (
                  `+${totalPoints} pts`
                )}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {!isLocked ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">
                  {currentValue.toFixed(goal.target_unit === "kcal" ? 0 : 1)} /{" "}
                  {targetValue.toFixed(goal.target_unit === "kcal" ? 0 : 1)} {goal.target_unit}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            {goal.is_completed ? (
              <p className="text-sm text-green-600 font-medium">Meta concluída! Resgate seus pontos acima.</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Faltam {(targetValue - currentValue).toFixed(goal.target_unit === "kcal" ? 0 : 1)} {goal.target_unit}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Faça upgrade para desbloquear esta missão</p>
        )}
      </CardContent>
    </Card>
  )
}
