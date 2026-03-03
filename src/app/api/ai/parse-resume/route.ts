import { NextResponse } from 'next/server'
export async function POST() {
  return NextResponse.json({ message: 'Parse resume endpoint — coming in Step 3' })
}
