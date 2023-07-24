// Hooks / Packages
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
// Types
import { BillboardPatchParams } from "@/types/props";

export async function PATCH(req: Request, { params }: BillboardPatchParams) {
  try {
    // User Is authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Body and Params
    const { storeId, billboardId } = params;
    const { label, imageUrl } = await req.json();

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Update Billboard
    const billboard = await prisma.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: BillboardPatchParams) {
  try {
    // Authorization using clerck
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Params
    const { storeId, billboardId } = params;

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete Billboard
    const billboard = await prisma.billboard.deleteMany({
      where: { id: billboardId, storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(_req: Request, { params }: BillboardPatchParams) {
  try {
    // Getting Params
    const { billboardId } = params;

    // Get Billboard
    const billboard = await prisma.billboard.findFirst({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
