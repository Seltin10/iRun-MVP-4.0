"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Ticket } from "lucide-react"
import { useState } from "react"

interface QuestOption {
  id: string
  label: string
  icon: React.ElementType
}

type TierType = "bronze" | "silver" | "gold"

interface QuestCardProps {
  title: string
  tier: TierType
  badgeText: string
  reward: string
  options: QuestOption[]
  defaultOption?: string
}

const tierStyles = {
  bronze: {
    badgeClass: "bg-blue-600 text-white hover:bg-blue-700",
    iconColor: "text-gray-600",
    selectedColor: "border-blue-600 bg-blue-50",
    selectedIconColor: "text-blue-600",
    selectedTextColor: "text-blue-900",
    checkmarkBg: "bg-blue-600",
    rewardClass: "bg-green-50 border-green-200",
    rewardIconColor: "text-green-600",
    rewardTextColor: "text-green-800",
  },
  silver: {
    badgeClass: "bg-gradient-to-r from-slate-400 to-slate-500 text-white hover:from-slate-500 hover:to-slate-600",
    iconColor: "text-slate-600",
    selectedColor: "border-slate-600 bg-slate-50",
    selectedIconColor: "text-slate-600",
    selectedTextColor: "text-slate-900",
    checkmarkBg: "bg-slate-600",
    rewardClass: "bg-green-50 border-green-200",
    rewardIconColor: "text-green-600",
    rewardTextColor: "text-green-800",
  },
  gold: {
    badgeClass: "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700",
    iconColor: "text-amber-600",
    selectedColor: "border-amber-600 bg-amber-50",
    selectedIconColor: "text-amber-600",
    selectedTextColor: "text-amber-900",
    checkmarkBg: "bg-amber-600",
    rewardClass: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300",
    rewardIconColor: "text-amber-600",
    rewardTextColor: "text-amber-900",
  },
}

export function QuestCard({ title, tier, badgeText, reward, options, defaultOption }: QuestCardProps) {
  const [selectedOption, setSelectedOption] = useState(defaultOption)
  const styles = tierStyles[tier]

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
          <Badge className={`${styles.badgeClass} shrink-0`}>{badgeText}</Badge>
        </div>
        <p className="text-sm text-gray-600 font-medium">Escolha seu objetivo de hoje:</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = selectedOption === option.id

            return (
              <div key={option.id}>
                <Label
                  htmlFor={option.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? `${styles.selectedColor} shadow-sm`
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Icon className={`h-5 w-5 ${isSelected ? styles.selectedIconColor : styles.iconColor}`} />
                  <span
                    className={`flex-1 text-sm font-medium ${isSelected ? styles.selectedTextColor : "text-gray-700"}`}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className={`flex items-center justify-center h-5 w-5 rounded-full ${styles.checkmarkBg}`}>
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </Label>
              </div>
            )
          })}
        </RadioGroup>

        <div
          className={`relative flex items-center gap-2 pt-2 px-4 py-3 rounded-lg border-2 border-dashed ${styles.rewardClass}`}
        >
          <Ticket className={`h-5 w-5 ${styles.rewardIconColor} shrink-0`} />
          <span className={`text-sm font-semibold ${styles.rewardTextColor}`}>Recompensa: {reward}</span>
        </div>
      </CardContent>
    </Card>
  )
}
