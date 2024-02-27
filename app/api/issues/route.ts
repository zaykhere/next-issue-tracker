import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client"
import { issueSchema } from "../../validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if(!validation.success) {
    return NextResponse.json(validation.error.errors, {status: 400})
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json(newIssue, {status: 201})
  } catch (error) {
    console.log(error);
    return NextResponse.json("Interval Server Error", {status: 500})
  }
  
}