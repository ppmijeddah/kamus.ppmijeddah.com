import { NextRequest, NextResponse } from "next/server";
import {
  searchEntries,
  getAllEntries,
  getEntriesByCategory,
} from "@/services/db/dictionary";
import { DictionaryEntry } from "@/domain/dictionary";
import { transformToDomain } from "@/services/db/dictionary/transform";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<{ entries: DictionaryEntry[] } | { error: string }>> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const categoryId = searchParams.get("category");

  try {
    if (query) {
      // If we have a search query, search with that query
      // If categoryId also exists, it's passed to further filter the search results
      const entries = await searchEntries(
        query,
        categoryId ? parseInt(categoryId, 10) : undefined,
      );
      return NextResponse.json({
        entries: entries.map((v) => transformToDomain(v)),
      });
    } else if (categoryId) {
      const entries = await getEntriesByCategory(parseInt(categoryId, 10));
      return NextResponse.json({
        entries: entries.map((v) => transformToDomain(v)),
      });
    } else {
      const entries = await getAllEntries();
      return NextResponse.json({
        entries: entries.map((v) => transformToDomain(v)),
      });
    }
  } catch (error) {
    console.error("Dictionary API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dictionary entries" },
      { status: 500 },
    );
  }
}
