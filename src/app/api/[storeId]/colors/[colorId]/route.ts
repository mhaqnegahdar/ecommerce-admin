// Hooks / Packages
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
// Types
import { ColorPatchParams } from "@/types/props";

export async function PATCH(req: Request, { params }: ColorPatchParams) {
  try {
    // User Is authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Body and Params
    const { storeId, colorId } = params;
    const { name, value } = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value Id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color is required", { status: 400 });
    }

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Update Category
    const color = await prisma.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: ColorPatchParams) {
  try {
    // Authorization using clerck
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Params
    const { storeId, colorId } = params;

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete Category
    const color = await prisma.color.deleteMany({
      where: { id: colorId, storeId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(_req: Request, { params }: ColorPatchParams) {
  try {
    // Getting Params
    const { colorId } = params;

    // Get Category
    const color = await prisma.color.findFirst({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
