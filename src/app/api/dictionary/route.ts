import { NextRequest, NextResponse } from "next/server";
import { searchEntries, getAllEntries } from "@/services/db/dictionary";
import { DictionaryEntry } from "@/domain/dictionary";
import { transformToDomain } from "@/services/db/dictionary/transform";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<{ entries: DictionaryEntry[] } | { error: string }>> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  try {
    if (query) {
      const entries = await searchEntries(query);
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
