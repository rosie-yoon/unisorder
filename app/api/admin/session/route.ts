import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminUserCount } from "@/lib/admin-users";

export async function GET(request: NextRequest) {
  const [user, userCount] = await Promise.all([getAdminSession(request), getAdminUserCount()]);

  return NextResponse.json({
    authenticated: Boolean(user),
    needsSetup: userCount === 0,
    user,
  });
}
