import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
        id: string;
    }
}

export async function PATCH(request: NextRequest, {params}: Props) {
    const body = await request.json();

    const validation = issueSchema.safeParse(body);

    if(!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue) return NextResponse.json("Issue not found", {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }   
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, {params}: Props) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!issue) return NextResponse.json("Issue not found", {status: 404});

    await prisma.issue.delete({
        where: {id: issue.id}
    });

    return NextResponse.json({});
}