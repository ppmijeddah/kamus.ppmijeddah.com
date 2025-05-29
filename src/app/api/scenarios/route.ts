import { NextResponse } from "next/server";
import { getAllScenarios } from "@/services/db/scenarios";
import { transformScenariosToDomain } from "@/services/db/scenarios/transform";

export const dynamic = "error";

export async function GET() {
  try {
    const dtoScenarios = await getAllScenarios();
    const domainScenarios = transformScenariosToDomain(dtoScenarios);
    return NextResponse.json(domainScenarios);
  } catch (error) {
    console.error("Failed to fetch scenarios:", error);
    return NextResponse.json(
      { message: "Error fetching scenarios" },
      { status: 500 },
    );
  }
}
