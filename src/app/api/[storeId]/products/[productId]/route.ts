// Hooks / Packages
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
// Types
import { ProductPatchParams } from "@/types/props";
import { Image } from "@prisma/client";

export async function PATCH(req: Request, { params }: ProductPatchParams) {
  try {
    // User Is authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Body and Params
    const { storeId, productId } = params;

    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
      images,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price  is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color URL is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size URL is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Update Product and delete images
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        colorId,
        sizeId,
        categoryId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    console.log("images:", [...images]);

    // Update Product again add images
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map(({ url }: Image) => ({ url }))],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: ProductPatchParams) {
  try {
    // Authorization using clerck
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthonticated", { status: 401 });
    }

    // Getting Params
    const { storeId, productId } = params;

    if (!productId) {
      return new NextResponse("Product is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Is user authorized
    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete Product
    const product = await prisma.product.deleteMany({
      where: { id: productId, storeId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(_req: Request, { params }: ProductPatchParams) {
  try {
    // Getting Params
    const { productId } = params;

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
