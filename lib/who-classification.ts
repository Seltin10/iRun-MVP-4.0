/**
 * WHO Physical Activity Classification
 * Based on WHO guidelines for physical activity levels
 */

export interface ActivityData {
  activity_type: string
  duration_minutes: number
  date: string
}

export type ActivityIntensity = "light" | "moderate" | "vigorous"

export interface WHOClassification {
  classification: "insufficient" | "active" | "highly_active"
  moderateMinutesPerWeek: number
  vigorousMinutesPerWeek: number
  equivalentMinutes: number
  riskLevel: "high" | "medium" | "low"
  recommendation: string
  color: string
}

/**
 * Classify activity intensity based on type
 */
function getActivityIntensity(activityType: string): ActivityIntensity {
  const activityMap: Record<string, ActivityIntensity> = {
    running: "vigorous",
    cycling: "moderate",
    swimming: "vigorous",
    walking: "light",
    jogging: "moderate",
    hiking: "moderate",
    yoga: "light",
    strength_training: "vigorous",
    sports: "vigorous",
  }
  return activityMap[activityType.toLowerCase()] || "moderate"
}

/**
 * Calculate WHO classification based on weekly activity
 * Moderate intensity = 1 minute equivalent
 * Vigorous intensity = 2 minutes equivalent
 */
export function classifyWHOActivity(activities: ActivityData[]): WHOClassification {
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Filter activities from the last 7 days
  const weeklyActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate >= oneWeekAgo && activityDate <= now
  })

  let moderateMinutes = 0
  let vigorousMinutes = 0

  weeklyActivities.forEach((activity) => {
    const intensity = getActivityIntensity(activity.activity_type)

    if (intensity === "vigorous") {
      vigorousMinutes += activity.duration_minutes
    } else if (intensity === "moderate") {
      moderateMinutes += activity.duration_minutes
    }
  })

  // WHO conversion: 1 minute vigorous = 2 minutes moderate
  const equivalentMinutes = moderateMinutes + vigorousMinutes * 2

  let classification: "insufficient" | "active" | "highly_active"
  let riskLevel: "high" | "medium" | "low"
  let recommendation: string
  let color: string

  // WHO Classification logic
  if (moderateMinutes >= 150 || vigorousMinutes >= 75 || equivalentMinutes >= 150) {
    if (moderateMinutes >= 300 || vigorousMinutes >= 150 || equivalentMinutes >= 300) {
      classification = "highly_active"
      riskLevel = "low"
      recommendation =
        "Excelente! Você está acima das recomendações da OMS. Mantenha a consistência e evite sobrecarga."
      color = "bg-emerald-50"
    } else {
      classification = "active"
      riskLevel = "low"
      recommendation = "Ótimo! Você atende as recomendações da OMS de atividade física semanal. Continue assim!"
      color = "bg-blue-50"
    }
  } else {
    classification = "insufficient"
    riskLevel = "high"
    recommendation =
      "Você está insuficientemente ativo. Aumentar a atividade reduz riscos de DCNT (diabetes, obesidade, doenças cardiovasculares)."
    color = "bg-orange-50"
  }

  return {
    classification,
    moderateMinutesPerWeek: moderateMinutes,
    vigorousMinutesPerWeek: vigorousMinutes,
    equivalentMinutes,
    riskLevel,
    recommendation,
    color,
  }
}

/**
 * iRun Activity Classification System
 * Corporate-focused metric (0-100 scale) for epidemiological reporting
 * No gamification - used only for internal corporate dashboards
 */

export interface ActivityClassification {
  totalMinutesPerWeek: number
  score: number // 0-100
  level: "sedentary" | "insufficient" | "adequate" | "highly_active"
  color: string
  description: string
}

/**
 * Calculate total minutes from all activities (regardless of intensity)
 */
export function classifyActivityLevel(activities: ActivityData[]): ActivityClassification {
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const weeklyActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate >= oneWeekAgo && activityDate <= now
  })

  const totalMinutes = weeklyActivities.reduce((sum, activity) => sum + activity.duration_minutes, 0)

  // Sedentary: 0-49 (0-49 min/week)
  // Insufficient: 50-74 (50-149 min/week)
  // Adequate: 75-99 (150-299 min/week)
  // Highly Active: 100 (300+ min/week)
  let score: number
  let level: "sedentary" | "insufficient" | "adequate" | "highly_active"
  let color: string
  let description: string

  if (totalMinutes < 50) {
    score = Math.floor((totalMinutes / 50) * 25)
    level = "sedentary"
    color = "bg-red-50"
    description = "Sedentário"
  } else if (totalMinutes < 150) {
    score = 25 + Math.floor(((totalMinutes - 50) / 100) * 25)
    level = "insufficient"
    color = "bg-yellow-50"
    description = "Insuficientemente Ativo"
  } else if (totalMinutes < 300) {
    score = 50 + Math.floor(((totalMinutes - 150) / 150) * 25)
    level = "adequate"
    color = "bg-green-50"
    description = "Adequadamente Ativo"
  } else {
    score = 100
    level = "highly_active"
    color = "bg-emerald-50"
    description = "Altamente Ativo"
  }

  return {
    totalMinutesPerWeek: totalMinutes,
    score: Math.min(100, score),
    level,
    color,
    description,
  }
}
