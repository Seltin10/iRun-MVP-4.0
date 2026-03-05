import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email e senha sao obrigatorios" }, { status: 400 })
  }

  const user = {
    id: `user-${Date.now()}`,
    email: email,
    name: email.split("@")[0],
    plan_type: "premium",
    lgpd_consent: true,
  }

  const response = NextResponse.json({ success: true, user })

  // Always use secure:true for v0/Vercel (HTTPS), sameSite:none for cross-origin
  response.cookies.set("user_session", JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
}
