import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Leaf } from "lucide-react"

interface WalletHeaderProps {
  points: number
  ecoLevel: string
  ecoLevelColor: string
  co2Saved: number
}

export function WalletHeader({ points, ecoLevel, ecoLevelColor, co2Saved }: WalletHeaderProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Points Balance */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Coins className="h-5 w-5 text-yellow-500" />
              <p className="text-sm font-medium text-muted-foreground">Saldo iRun</p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-foreground">
              {points} <span className="text-lg sm:text-xl font-normal text-yellow-500">pts</span>
            </p>
          </div>

          {/* Right: ECO+ Status */}
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <p className="text-sm font-medium text-muted-foreground">Status ECO+</p>
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <Badge
              variant="secondary"
              className={`text-base sm:text-lg font-semibold px-3 py-1 ${ecoLevelColor} bg-gradient-to-r from-slate-100 to-slate-200`}
            >
              {ecoLevel}
            </Badge>
          </div>
        </div>

        {/* Subtext: CO2 savings */}
        <div className="mt-4 pt-4 border-t border-blue-100">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            Você economizou <span className="font-semibold text-green-600">{co2Saved}kg de CO₂</span> este mês
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
