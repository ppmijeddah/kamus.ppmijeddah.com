import { Category } from "@/domain/dictionary";
import { orderCategoriesByRank } from "@/modules/search-filter/services/categories";
import { getAllCategories } from "@/services/db/categories";
import { transformToDomain } from "@/services/db/categories/transform";
import { NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<Category[] | { error: string }>
> {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(
      orderCategoriesByRank(categories.map((v) => transformToDomain(v))),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
