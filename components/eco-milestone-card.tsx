import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Leaf, TrendingUp } from "lucide-react"

interface EcoMilestoneCardProps {
  currentCO2: number
  nextLevelCO2: number
  nextLevelName: string
}

export function EcoMilestoneCard({ currentCO2, nextLevelCO2, nextLevelName }: EcoMilestoneCardProps) {
  const progress = Math.min((currentCO2 / nextLevelCO2) * 100, 100)
  const remaining = Math.max(nextLevelCO2 - currentCO2, 0)

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon */}
            <div className="p-2 rounded-lg bg-green-100">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-base sm:text-lg">Subir de Nível ECO+</CardTitle>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Milestone
                </Badge>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Continue economizando CO₂ para alcançar o {nextLevelName}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso para {nextLevelName}</span>
            <span className="font-medium">
              {currentCO2.toFixed(1)} / {nextLevelCO2} kg CO₂
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-green-100" />
        </div>
        <p className="text-sm text-muted-foreground">
          Faltam <span className="font-semibold text-green-600">{remaining.toFixed(1)}kg de CO₂</span> para o{" "}
          {nextLevelName}
        </p>
      </CardContent>
    </Card>
  )
}
