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

  // Use httpOnly:false for v0 iframe compatibility
  response.cookies.set("user_session", JSON.stringify(user), {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
}
