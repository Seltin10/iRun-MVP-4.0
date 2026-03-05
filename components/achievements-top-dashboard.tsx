"use client"

import { Coins, Leaf, Info, TreeDeciduous, Cloud, Car } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function AchievementsTopDashboard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const points = 450
  const expirationDate = new Date("2027-01-14")
  const daysUntilExpiration = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const isExpiringSoon = daysUntilExpiration < 30

  return (
    <div className="space-y-4">
      <div className="relative w-full min-h-[420px]" style={{ perspective: "1000px" }}>
        <div
          className={`relative w-full transition-transform duration-700 ease-in-out`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT FACE */}
          <Card
            className="min-h-[420px] bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white p-6 shadow-xl overflow-hidden relative flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <button
              onClick={() => setIsFlipped(true)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Ver impacto ambiental"
            >
              <Info className="h-4 w-4 text-white" />
            </button>

            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                {/* LEFT: Points Balance with Validity */}
                <div className="flex flex-col items-start justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-6 w-6 text-yellow-300" />
                    <span className="text-base opacity-90">Saldo Atual</span>
                  </div>
                  <div className="text-8xl font-bold tabular-nums mb-2">{points}</div>
                  <div className="text-xl font-medium text-yellow-300 mb-3">iRun Points</div>
                  <div className={`text-sm ${isExpiringSoon ? "text-orange-300 font-semibold" : "text-white/70"}`}>
                    Pontos válidos até: {expirationDate.toLocaleDateString("pt-BR")}
                  </div>
                </div>

                {/* RIGHT: ECO+ Status with Activity Ring */}
                <div className="flex flex-col items-center sm:items-end justify-center">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="relative w-44 h-44 group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full transition-transform hover:scale-105"
                    aria-label="Tap to flip ECO+ status"
                  >
                    {/* Circular Progress Ring */}
                    <svg className="w-44 h-44 -rotate-90" viewBox="0 0 120 120">
                      {/* Background Circle */}
                      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8" />
                      {/* Progress Circle (75% filled) */}
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="rgba(192, 192, 192, 1)"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 54 * 0.75} ${2 * Math.PI * 54}`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Leaf className="h-12 w-12 text-gray-300 mb-1 animate-pulse" />
                      <span className="text-xs text-white/90 font-medium">Tap to Flip</span>
                    </div>
                  </button>

                  <div className="text-center sm:text-right mt-3">
                    <div className="text-base font-semibold">ECO+ Prata</div>
                    <div className="text-sm text-white/70">75% para Ouro</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* BACK FACE */}
          <Card
            className="absolute top-0 left-0 w-full min-h-[420px] bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 text-white p-6 pb-8 shadow-xl overflow-hidden flex items-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFlipped(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Voltar para saldo"
            >
              <Info className="h-4 w-4 text-white" />
            </button>

            <div className="w-full">
              <div>
                <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-300" />
                  Seu Impacto Real
                </h3>
                <p className="text-xs text-white/70 mb-6">Eco-impacto acumulado</p>

                {/* Impact Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="bg-green-500 p-2 rounded-full">
                      <TreeDeciduous className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3 Árvores</div>
                      <div className="text-xs text-white/80">Salvas do desmatamento</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <Cloud className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">15kg CO₂</div>
                      <div className="text-xs text-white/80">Evitado na atmosfera</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className="bg-purple-500 p-2 rounded-full">
                      <Car className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2 dias</div>
                      <div className="text-xs text-white/80">Sem carro equivalente</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Link href="/partners" className="block">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg shadow-md">
          Você tem {points} pts! Troque por recompensas agora
        </Button>
      </Link>
    </div>
  )
}
