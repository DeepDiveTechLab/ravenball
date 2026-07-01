import { NextResponse } from "next/server";
import { z } from "zod";

const WaitlistSchema = z.object({
  email: z.string().email(),
  type: z.string().optional(),
  items: z.array(z.unknown()).optional(),
});

// Almacen minimo en memoria para v1 (sin base de datos todavia).
// TODO fase 2: persistir en Postgres/Supabase + notificacion por email/WhatsApp Business API.
const seen = new Set<string>();

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalido" }, { status: 400 });
  }

  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Correo invalido", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  seen.add(parsed.data.email.toLowerCase());
  return NextResponse.json({ ok: true }, { status: 200 });
}
