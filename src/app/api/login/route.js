import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  // Use variáveis de ambiente com fallback para valores padrão
  const defaultUsername = process.env.NEXT_PUBLIC_USERNAME || "admin";
  const defaultPassword = process.env.NEXT_PUBLIC_PASSWORD || "123456";

  if (username === defaultUsername && password === defaultPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || "default-secret", {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Login bem-sucedido" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hora
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { message: "Credenciais inválidas" },
    { status: 401 }
  );
}
