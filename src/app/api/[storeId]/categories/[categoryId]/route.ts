// Hooks / Packages
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
// Types
import { CategoryPatchParams } from "@/types/props";

export async function PATCH(req: Request, { params }: CategoryPatchParams) {
  try {
    // User Is authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Body and Params
    const { storeId, categoryId } = params;
    const { name, billboardId } = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Update Category
    const category = await prisma.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: CategoryPatchParams) {
  try {
    // Authorization using clerck
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Params
    const { storeId, categoryId } = params;

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete Category
    const category = await prisma.category.deleteMany({
      where: { id: categoryId, storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(_req: Request, { params }: CategoryPatchParams) {
  try {
    // Getting Params
    const { categoryId } = params;

    // Get Category
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
