// Hooks / Packages
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
// Types
import { SizePatchParams } from "@/types/props";

export async function PATCH(req: Request, { params }: SizePatchParams) {
  try {
    // User Is authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Body and Params
    const { storeId, sizeId } = params;
    const { name, value } = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value Id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size is required", { status: 400 });
    }

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Update Category
    const size = await prisma.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: SizePatchParams) {
  try {
    // Authorization using clerck
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Params
    const { storeId, sizeId } = params;

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete Category
    const size = await prisma.size.deleteMany({
      where: { id: sizeId, storeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(_req: Request, { params }: SizePatchParams) {
  try {
    // Getting Params
    const { sizeId } = params;

    // Get Category
    const size = await prisma.size.findFirst({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
