"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bike, Waves, Trophy, TrendingUp, Flame, Timer, Lock, Footprints } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

interface Stats {
  total_running: number
  total_cycling: number
  total_swimming: number
  total_calories: number
  running_bronze: number
  running_silver: number
  running_gold: number
  running_diamond: number
  cycling_bronze: number
  cycling_silver: number
  cycling_gold: number
  cycling_diamond: number
  swimming_bronze: number
  swimming_silver: number
  swimming_gold: number
  swimming_diamond: number
  calorie_bronze: number
  calorie_silver: number
  calorie_gold: number
}

interface GoalCard {
  title: string
  metricValue: string
  metricUnit: string
  progress: number
  trophyColor: string
  bottomTitle: string
  bottomContent: React.ReactNode
}

export function StatsCards({ stats }: { stats: Stats }) {
  const [selectedCategory, setSelectedCategory] = useState<"superacao" | "energia" | "foco">("superacao")
  const [selectedSport, setSelectedSport] = useState<"running" | "cycling" | "swimming">("running")

  const categoryLabels = {
    superacao: "Distância",
    energia: "Calorias",
    foco: "Tempo", // updated label from "Foco" to "Tempo"
  }

  const categoryIcons = {
    superacao: TrendingUp,
    energia: Flame,
    foco: Timer,
  }

  const createEffortEquivalenceContent = (runDistance: string, bikeDistance: string, swimDistance: string) => (
    <div className="flex items-center justify-between gap-3">
      <button
        onClick={() => setSelectedSport("running")}
        className={`flex flex-col items-center gap-2 flex-1 p-3 rounded-lg transition-all ${
          selectedSport === "running"
            ? "bg-blue-100 border-2 border-blue-600"
            : "bg-white border-2 border-transparent hover:bg-gray-50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Footprints className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-sm font-semibold text-gray-800">{runDistance}</span>
      </button>
      <div className="text-xs font-medium text-gray-400 pb-6">OU</div>
      <button
        onClick={() => setSelectedSport("cycling")}
        className={`flex flex-col items-center gap-2 flex-1 p-3 rounded-lg transition-all ${
          selectedSport === "cycling"
            ? "bg-green-100 border-2 border-green-600"
            : "bg-white border-2 border-transparent hover:bg-gray-50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Bike className="h-6 w-6 text-green-600" />
        </div>
        <span className="text-sm font-semibold text-gray-800">{bikeDistance}</span>
      </button>
      <div className="text-xs font-medium text-gray-400 pb-6">OU</div>
      <button
        onClick={() => setSelectedSport("swimming")}
        className={`flex flex-col items-center gap-2 flex-1 p-3 rounded-lg transition-all ${
          selectedSport === "swimming"
            ? "bg-cyan-100 border-2 border-cyan-600"
            : "bg-white border-2 border-transparent hover:bg-gray-50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <Waves className="h-6 w-6 text-cyan-600" />
        </div>
        <span className="text-sm font-semibold text-gray-800">{swimDistance}</span>
      </button>
    </div>
  )

  const createEffortEquivalenceWithButton = (
    runDistance: string,
    bikeDistance: string,
    swimDistance: string,
    progress: number,
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setSelectedSport("running")}
          className={`flex flex-col items-center gap-2 flex-1 p-3 rounded-lg transition-all ${
            selectedSport === "running"
              ? "bg-blue-100 border-2 border-blue-600"
              : "bg-white border-2 border-transparent hover:bg-gray-50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Footprints className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{runDistance}</span>
        </button>
        <div className="text-xs font-medium text-gray-400 pb-6">OU</div>
        <button
          onClick={() => setSelectedSport("cycling")}
          className={`flex flex-col items-center gap-2 flex-1 p-3 rounded-lg transition-all ${
            selectedSport === "cycling"
              ? "bg-green-100 border-2 border-green-600"
              : "bg-white border-2 border-transparent hover:bg-gray-50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Bike className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{bikeDistance}</span>
        </button>
        <div className="text-xs font-medium text-gray-400 pb-6">OU</div>
        <button
          onClick={() => setSelectedSport("swimming")}
          className={`flex flex-col items-center gap-2 flex-1 p-3 rounded-lg transition-all ${
            selectedSport === "swimming"
              ? "bg-cyan-100 border-2 border-cyan-600"
              : "bg-white border-2 border-transparent hover:bg-gray-50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
            <Waves className="h-6 w-6 text-cyan-600" />
          </div>
          <span className="text-sm font-semibold text-gray-800">{swimDistance}</span>
        </button>
      </div>
      <button
        disabled={progress < 100}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
          progress === 100
            ? "bg-amber-400 text-gray-900 hover:bg-amber-500 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {progress === 100 ? "Resgate sua recompensa" : "Meta não atingida"}
      </button>
    </div>
  )

  const createRedemptionButton = (progress: number) => (
    <button
      disabled={progress < 100}
      className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
        progress === 100
          ? "bg-amber-400 text-gray-900 hover:bg-amber-500 cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {progress === 100 ? "Resgate sua recompensa" : "Meta não atingida"}
    </button>
  )

  const getGoalCards = (): GoalCard[] => {
    switch (selectedCategory) {
      case "superacao":
        const currentDistance = stats.total_running
        return [
          {
            title: "Meta Bronze",
            metricValue: currentDistance.toFixed(0),
            metricUnit: "",
            progress: Math.min((currentDistance / 5) * 100, 100),
            trophyColor: "text-amber-800",
            bottomTitle: "Equivalência de Esforço",
            bottomContent: createEffortEquivalenceWithButton(
              "3km",
              "10km",
              "3km",
              Math.min((currentDistance / 5) * 100, 100),
            ),
          },
          {
            title: "Meta Prata",
            metricValue: currentDistance.toFixed(0),
            metricUnit: "",
            progress: Math.min((currentDistance / 6) * 100, 100),
            trophyColor: "text-gray-400",
            bottomTitle: "Equivalência de Esforço",
            bottomContent: createEffortEquivalenceWithButton(
              "6km",
              "20km",
              "2km",
              Math.min((currentDistance / 6) * 100, 100),
            ),
          },
          {
            title: "Meta Ouro",
            metricValue: currentDistance.toFixed(0),
            metricUnit: "",
            progress: Math.min((currentDistance / 10) * 100, 100),
            trophyColor: "text-amber-400",
            bottomTitle: "Equivalência de Esforço",
            bottomContent: createEffortEquivalenceWithButton(
              "10km",
              "30km",
              "3km",
              Math.min((currentDistance / 10) * 100, 100),
            ),
          },
          {
            title: "Meta Diamante",
            metricValue: currentDistance.toFixed(0),
            metricUnit: "",
            progress: Math.min((currentDistance / 20) * 100, 100),
            trophyColor: "text-blue-500",
            bottomTitle: "Equivalência de Esforço",
            bottomContent: createEffortEquivalenceWithButton(
              "20km",
              "50km",
              "5km",
              Math.min((currentDistance / 20) * 100, 100),
            ),
          },
        ]

      case "energia":
        return [
          {
            title: "Meta Bronze",
            metricValue: "300",
            metricUnit: "kcal",
            progress: Math.min((300 / 300) * 100, 100),
            trophyColor: "text-amber-800",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((300 / 300) * 100, 100)),
          },
          {
            title: "Meta Prata",
            metricValue: "600",
            metricUnit: "kcal",
            progress: Math.min((600 / 600) * 100, 100),
            trophyColor: "text-gray-400",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((600 / 600) * 100, 100)),
          },
          {
            title: "Meta Ouro",
            metricValue: "900",
            metricUnit: "kcal",
            progress: Math.min((900 / 900) * 100, 100),
            trophyColor: "text-amber-400",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((900 / 900) * 100, 100)),
          },
          {
            title: "Meta Diamante",
            metricValue: "1500",
            metricUnit: "kcal",
            progress: Math.min((1500 / 1500) * 100, 100),
            trophyColor: "text-blue-500",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((1500 / 1500) * 100, 100)),
          },
        ]

      case "foco":
        return [
          {
            title: "Meta Bronze",
            metricValue: "30",
            metricUnit: "minutos",
            progress: Math.min((30 / 30) * 100, 100),
            trophyColor: "text-amber-800",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((30 / 30) * 100, 100)),
          },
          {
            title: "Meta Prata",
            metricValue: "90",
            metricUnit: "minutos",
            progress: Math.min((90 / 90) * 100, 100),
            trophyColor: "text-gray-400",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((90 / 90) * 100, 100)),
          },
          {
            title: "Meta Ouro",
            metricValue: "180",
            metricUnit: "minutos",
            progress: Math.min((180 / 180) * 100, 100),
            trophyColor: "text-amber-400",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((180 / 180) * 100, 100)),
          },
          {
            title: "Meta Diamante",
            metricValue: "300",
            metricUnit: "minutos",
            progress: Math.min((300 / 300) * 100, 100),
            trophyColor: "text-blue-500",
            bottomTitle: "Resgatar Recompensa",
            bottomContent: createRedemptionButton(Math.min((300 / 300) * 100, 100)),
          },
        ]
    }
  }

  const goalCards = getGoalCards()

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center overflow-x-auto pb-2">
        {(["superacao", "energia", "foco"] as const).map((category) => {
          const Icon = categoryIcons[category]
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {categoryLabels[category]}
            </button>
          )
        })}
      </div>

      <div className="space-y-4 transition-all duration-300 ease-in-out">
        {goalCards.map((card, index) => (
          <Card key={index} className="overflow-hidden rounded-2xl shadow-md border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0 bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Trophy className={`h-5 w-5 ${card.trophyColor}`} />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-800">{card.metricValue}</span>
                  {card.metricUnit && <span className="text-gray-600 text-xl font-medium">{card.metricUnit}</span>}
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Progresso</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">{Math.ceil(card.progress)}%</span>
                      {selectedCategory === "superacao" && <Lock className="h-4 w-4 text-gray-400" />}
                    </div>
                  </div>
                  <Progress value={card.progress} className="h-3 bg-gray-100" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{card.bottomTitle}</h3>
                {card.bottomContent}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
