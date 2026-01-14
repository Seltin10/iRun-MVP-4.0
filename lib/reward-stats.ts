"use server"

import { sql } from "./db"

export interface RewardStats {
  totalSavings: number
  usedCoupons: number
  preferredPartner: string | null
  activityDays: number
}

export async function getRewardStats(userId: string): Promise<RewardStats> {
  try {
    const savingsResult = await sql`
      SELECT COALESCE(SUM(c.discount_value), 0) as total_savings
      FROM public.user_coupons uc
      JOIN public.coupons c ON uc.coupon_id = c.id
      WHERE uc.user_id = ${userId} AND uc.status = 'used'
    `

    const usedCouponsResult = await sql`
      SELECT COUNT(*) as used_coupons
      FROM public.user_coupons
      WHERE user_id = ${userId} AND status = 'used'
    `

    const preferredPartnerResult = await sql`
      SELECT p.name
      FROM public.user_coupons uc
      JOIN public.coupons c ON uc.coupon_id = c.id
      JOIN public.partners p ON c.partner_id = p.id
      WHERE uc.user_id = ${userId} AND uc.status = 'used'
      GROUP BY p.id, p.name
      ORDER BY COUNT(*) DESC
      LIMIT 1
    `

    const activityResult = await sql`
      SELECT COALESCE(SUM(duration_minutes), 0) as total_minutes
      FROM public.activities
      WHERE user_id = ${userId}
    `

    let externalActivityHours = 0
    if (process.env.EXTERNAL_API_URL && process.env.EXTERNAL_API_KEY) {
      try {
        externalActivityHours = await fetchActivityHoursFromExternalAPI(userId)
      } catch (error) {
        console.log("[v0] Could not fetch from external API, using local data only")
        // Silently fallback to local data
      }
    }

    const localActivityHours = Math.round(Number(activityResult[0]?.total_minutes || 0) / 60)

    const totalActivityHours = localActivityHours + externalActivityHours

    return {
      totalSavings: Number(savingsResult[0]?.total_savings || 0),
      usedCoupons: Number(usedCouponsResult[0]?.used_coupons || 0),
      preferredPartner: preferredPartnerResult[0]?.name || null,
      activityDays: totalActivityHours,
    }
  } catch (error) {
    console.error("[v0] Error getting reward stats:", error)
    return {
      totalSavings: 0,
      usedCoupons: 0,
      preferredPartner: null,
      activityDays: 0,
    }
  }
}

async function fetchActivityHoursFromExternalAPI(userId: string): Promise<number> {
  const externalAPIUrl = process.env.EXTERNAL_API_URL!
  const apiKey = process.env.EXTERNAL_API_KEY!

  try {
    const response = await fetch(`${externalAPIUrl}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Fresh data on each request
    })

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Adjust the property names based on your external API response structure
    const activityHours = data.total_hours || data.activity_hours || data.duration_hours || 0

    return Math.round(activityHours)
  } catch (error) {
    throw error
  }
}
