import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    // Authorization using clerck
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Getting Body
    const { name } = await req.json();
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Create New Store
    const store = await prisma.store.create({ data: { name, userId } });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
