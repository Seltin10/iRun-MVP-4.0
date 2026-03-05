import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { sql } from "@/lib/db"
import { DashboardHeader } from "@/components/dashboard-header"
import { BottomNav } from "@/components/bottom-nav"
import { Suspense } from "react"
import { MissionCard } from "@/components/mission-card"
import { WalletHeader } from "@/components/wallet-header"
import { EcoMilestoneCard } from "@/components/eco-milestone-card"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import Link from "next/link"

export default async function GoalsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const userStats = await sql`
    SELECT 
      COALESCE(SUM(points_earned), 0) as total_points,
      COALESCE(SUM(co2_saved), 0) as total_co2_saved
    FROM public.user_activities
    WHERE user_id = ${session.id}
  `

  const totalPoints = Number(userStats[0]?.total_points || 450) // Default 450 for demo
  const totalCO2 = Number(userStats[0]?.total_co2_saved || 15) // Default 15kg for demo

  // Determine ECO+ level based on CO2 saved
  let ecoLevel = "Bronze"
  let ecoLevelColor = "text-amber-700"
  let nextLevelCO2 = 25
  let nextLevelName = "Nível Prata"

  if (totalCO2 >= 50) {
    ecoLevel = "Nível Ouro"
    ecoLevelColor = "text-yellow-500"
    nextLevelCO2 = 100
    nextLevelName = "Nível Platina"
  } else if (totalCO2 >= 25) {
    ecoLevel = "Nível Prata"
    ecoLevelColor = "text-slate-400"
    nextLevelCO2 = 50
    nextLevelName = "Nível Ouro"
  } else {
    ecoLevel = "Nível Bronze"
    ecoLevelColor = "text-amber-700"
    nextLevelCO2 = 25
    nextLevelName = "Nível Prata"
  }

  // Get all active goals with user progress
  const goalsWithProgress = await sql`
    SELECT 
      g.id,
      g.title,
      g.description,
      g.goal_type,
      g.activity_type,
      g.target_value,
      g.target_unit,
      g.required_plan,
      ugp.current_value,
      ugp.is_completed,
      ugp.period_start,
      ugp.period_end
    FROM public.goals g
    LEFT JOIN public.user_goal_progress ugp ON g.id = ugp.goal_id 
      AND ugp.user_id = ${session.id}
      AND (
        (g.goal_type = 'daily' AND ugp.period_start::date = CURRENT_DATE) OR
        (g.goal_type = 'weekly' AND ugp.period_start::date = date_trunc('week', CURRENT_DATE)::date) OR
        (g.goal_type = 'monthly' AND ugp.period_start::date = date_trunc('month', CURRENT_DATE)::date) OR
        (g.goal_type = 'caloric' AND ugp.is_completed = false)
      )
    WHERE g.is_active = true
    ORDER BY g.goal_type, g.target_value
  `

  const dailyGoals = goalsWithProgress.filter((g: any) => g.goal_type === "daily")

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader user={session} />
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 space-y-6">
        <WalletHeader points={totalPoints} ecoLevel={ecoLevel} ecoLevelColor={ecoLevelColor} co2Saved={totalCO2} />

        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Hub de Conquistas</h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Complete missões e ganhe pontos para trocar por recompensas
          </p>
        </div>

        <div className="space-y-4">
          {dailyGoals.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhuma missão disponível</p>
          ) : (
            <>
              {dailyGoals.map((goal: any) => (
                <MissionCard key={goal.id} goal={goal} userPlan={session.plan_type} userId={session.id} />
              ))}

              {/* ECO+ Milestone Card - Card Type 3 */}
              <EcoMilestoneCard currentCO2={totalCO2} nextLevelCO2={nextLevelCO2} nextLevelName={nextLevelName} />
            </>
          )}
        </div>

        <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 pointer-events-none">
          <div className="container mx-auto max-w-md pointer-events-auto">
            <Link href="/rewards">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                <Gift className="mr-2 h-5 w-5" />
                Ir para o Shopping de Recompensas
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Suspense fallback={<div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t" />}>
        <BottomNav />
      </Suspense>
    </div>
  )
}
