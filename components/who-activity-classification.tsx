import { classifyActivityLevel, type ActivityData } from "@/lib/who-classification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
  activities: ActivityData[]
}

function getClassificationColors(level: string) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    sedentary: { bg: "bg-red-100", text: "text-red-900", border: "border-red-300" },
    insufficient: { bg: "bg-yellow-100", text: "text-yellow-900", border: "border-yellow-300" },
    adequate: { bg: "bg-green-100", text: "text-green-900", border: "border-green-300" },
    highly_active: { bg: "bg-emerald-600", text: "text-white", border: "border-emerald-700" },
  }
  return colorMap[level] || colorMap.sedentary
}

export function WHOActivityClassification({ activities }: Props) {
  const classification = classifyActivityLevel(activities)
  const colors = getClassificationColors(classification.level)

  return (
    <Card className={`${classification.color} border-0`}>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl">Classificação de Atividade Física</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                Seu nível de atividade conforme recomendações da Organização Mundial da Saúde (OMS)
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <Info className="h-4 w-4 text-slate-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Fórmula de Pontuação iRun</DialogTitle>
                  <DialogDescription>Como é calculada sua classificação de atividade física</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">O que é a Pontuação iRun?</h4>
                    <p className="text-muted-foreground">
                      A pontuação iRun (0–100) é um índice que reflete seu nível de atividade física semanal, baseado
                      nas recomendações da Organização Mundial da Saúde (OMS) para saúde e bem-estar.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Conversão de Minutos para Pontuação</h4>
                    <p className="text-muted-foreground mb-3">
                      Seus minutos de atividade por semana são convertidos em uma pontuação de 0 a 100, seguindo esta
                      fórmula:
                    </p>
                    <div className="bg-white/50 rounded-lg p-3 border border-slate-200 font-mono text-xs mb-3">
                      <p>Pontuação = (Minutos Semanais / 300) × 100</p>
                      <p className="text-muted-foreground mt-2">* Capped at 100 (máximo de 300+ minutos)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Classificações e Escalas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-red-50 rounded border border-red-200">
                        <span className="inline-block w-4 h-4 bg-red-500 rounded flex-shrink-0"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-red-900 text-xs">Sedentário: 0–24 pontos</p>
                          <p className="text-xs text-red-700">0–49 minutos/semana</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                        <span className="inline-block w-4 h-4 bg-yellow-500 rounded flex-shrink-0"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-yellow-900 text-xs">Insuficientemente Ativo: 25–49 pontos</p>
                          <p className="text-xs text-yellow-700">50–149 minutos/semana</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-200">
                        <span className="inline-block w-4 h-4 bg-green-500 rounded flex-shrink-0"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-green-900 text-xs">Adequadamente Ativo: 50–74 pontos</p>
                          <p className="text-xs text-green-700">150–299 minutos/semana</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-emerald-100 rounded border border-emerald-300">
                        <span className="inline-block w-4 h-4 bg-emerald-600 rounded flex-shrink-0"></span>
                        <div className="flex-1">
                          <p className="font-semibold text-emerald-900 text-xs">Altamente Ativo: 75–100 pontos</p>
                          <p className="text-xs text-emerald-700">300+ minutos/semana</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Exemplo Prático</h4>
                    <div className="bg-slate-50 rounded-lg p-3 space-y-1 text-xs">
                      <p>
                        <span className="font-semibold">Se você tem 180 minutos/semana:</span>
                      </p>
                      <p className="text-muted-foreground">(180 / 300) × 100 = 60 pontos</p>
                      <p className="font-semibold text-green-900 mt-2">Classificação: Adequadamente Ativo</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-semibold mb-2 text-blue-900">Recomendação da OMS</h4>
                    <p className="text-xs text-blue-800">
                      Adultos devem fazer pelo menos 150 minutos de atividade física moderada por semana (ou 75 minutos
                      de atividade vigorosa) para manter a saúde e o bem-estar.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Como Aumentar Sua Pontuação?</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs ml-2">
                      <li>Aumente a frequência de suas atividades físicas</li>
                      <li>Pratique atividades mais longas</li>
                      <li>Sincronize suas atividades via Apple Health, Google Fit ou Strava</li>
                      <li>Mantenha consistência ao longo da semana</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Activity className="h-5 w-5 text-slate-600" />
            <CardTitle className="text-lg">Nível de Atividade</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Stats - Total Minutes and Score */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-slate-700">{classification.totalMinutesPerWeek}</div>
            <div className="text-xs text-muted-foreground mt-2">Minutos/Semana</div>
          </div>
          <div className="bg-white/60 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-slate-700">{classification.score}</div>
            <div className="text-xs text-muted-foreground mt-2">Pontuação iRun</div>
          </div>
        </div>

        <div className={`${colors.bg} rounded-lg p-3 text-center border ${colors.border}`}>
          <div className={`text-sm font-semibold ${colors.text}`}>{classification.description}</div>
          <div className={`text-xs ${colors.text} opacity-80 mt-1`}>Classificação Atual</div>
        </div>

        {/* WHO Reference Standards */}
        <div className="bg-white/60 rounded-lg p-3 space-y-2 text-xs text-slate-700">
          <div className="font-semibold mb-2">Referência OMS:</div>
          <div>
            <span className="inline-block w-4 h-4 bg-red-500 rounded mr-2"></span>
            <strong>Sedentário:</strong> 0–49 min/semana
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-yellow-500 rounded mr-2"></span>
            <strong>Insuficiente:</strong> 50–149 min/semana
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-green-500 rounded mr-2"></span>
            <strong>Adequado:</strong> 150–299 min/semana
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-emerald-600 rounded mr-2"></span>
            <strong>Altamente Ativo:</strong> 300+ min/semana
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
