'use server';

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createNewBoard(formData: FormData) {
    const supabase = await createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    const userId = user.id;
    const name = formData.get('boardname') as string

    const {data: existingBoard, error} = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

    if (error) {
        throw error;
    }

    if (existingBoard) {
        await supabase
        .from('boards')
        .update({
            name,
        })
        .eq('id', existingBoard.id);
    } else {
        const { data: board, error } = await supabase
        .from('boards')
        .insert({
            name,
            user_id: userId,
        })
        .select('id')
        .single();

        if (error) {
            throw error;
        }
        return board.id;
    }

    revalidatePath('/');
};

export async function createTask(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get('task') as string
    const boardId = formData.get('boardId') as string

    const { 
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    if (!name.trim()){
        return
    }

    if (!boardId) {
        throw new Error("Board ID is required");
    }

    const { error } = await supabase
    .from('tasks')
    .insert({
        name,
        status: 'todo',
        board_id: boardId,
    })
    if (error){
        throw error
    }

    revalidatePath('/myKanban');
};

export async function editTask (formData: FormData) {
    const supabase = await createClient();

    const newTask = formData.get('newTask') as string;
    const taskId = formData.get('taskId') as string;

    if (!newTask.trim()) return;

    const { error } = await supabase
    .from('tasks')
    .update({
        name: newTask,
    })
    .eq('id', taskId);

    if (error) throw error;

    revalidatePath('/myKanban');
};

export async function deleteTask (formData: FormData) {
    const supabase = await createClient();

    const taskId = formData.get('taskId') as string;

    const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

    if (error) throw error;

    revalidatePath('/myKanban');
};