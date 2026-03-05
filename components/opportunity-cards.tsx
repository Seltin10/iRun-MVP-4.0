"use client"

import { Trophy, Award, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function OpportunityCards() {
  return (
    <div className="space-y-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Mural de Desafios</h2>
        <p className="text-xs text-muted-foreground">(Bônus Extra)</p>
      </div>

      {/* BRONZE TIER - Simple White Card */}
      <Card className="bg-white border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-600" />
            <h3 className="font-medium text-base">Bronze</h3>
          </div>
          <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-sm font-bold px-3 py-1">+50 Pts</Badge>
        </div>

        <RadioGroup defaultValue="" className="space-y-2">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="walk-30" id="walk-30" />
            <Label htmlFor="walk-30" className="cursor-pointer flex-1 text-sm">
              30 min Caminhada
            </Label>
          </div>
        </RadioGroup>
      </Card>

      {/* SILVER TIER - Silver Border/Accent */}
      <Card className="bg-white border-2 border-gray-400 shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium text-base text-gray-800">Prata</h3>
          </div>
          <Badge className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 border-gray-400 text-sm font-bold px-3 py-1">
            +150 Pts
          </Badge>
        </div>

        <RadioGroup defaultValue="" className="space-y-2">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <RadioGroupItem value="run-10" id="run-10" />
            <Label htmlFor="run-10" className="cursor-pointer flex-1 text-sm text-gray-800">
              10 km Corrida
            </Label>
          </div>
        </RadioGroup>
      </Card>

      {/* GOLD TIER - Premium Dark Navy/Black with Gold */}
      <Card className="bg-gradient-to-br from-slate-900 to-black border-2 border-yellow-500 shadow-xl p-5 relative overflow-hidden">
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-400/10 to-yellow-500/5 animate-pulse pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h3 className="font-bold text-base text-yellow-400">Ouro</h3>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 border-yellow-400 text-sm font-bold px-3 py-1 shadow-lg">
            +500 Pts
          </Badge>
        </div>

        <RadioGroup defaultValue="" className="space-y-2 relative z-10">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
            <RadioGroupItem value="half-marathon" id="half-marathon" className="border-yellow-400" />
            <Label htmlFor="half-marathon" className="cursor-pointer flex-1 text-sm text-white">
              Meia Maratona (21km)
            </Label>
          </div>
        </RadioGroup>
      </Card>
    </div>
  )
}
