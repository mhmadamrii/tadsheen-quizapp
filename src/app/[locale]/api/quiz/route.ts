import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, language, createdBy, questions } = body;

    if (!title || !createdBy || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        {
          message: "Invalid request data",
        },
        {
          status: 400,
        },
      );
    }

    const newQuiz = await db.quiz.create({
      data: {
        title,
        language,
        createdBy,
      },
    });

    return NextResponse.json(
      {
        message: "Quiz created successfully",
        newQuiz,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
