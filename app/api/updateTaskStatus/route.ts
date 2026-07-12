import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    const supabase = await createClient();
    const body = await req.json()
    const {taskId, newStatus} = body

    const { data: updatedTask, error } = await supabase
    .from('tasks')
    .update({
        status: newStatus
    })
    .eq('id', taskId)
    .select()
    .single();

    if (error) {
        throw error
    }

    return NextResponse.json({updatedTask});
};