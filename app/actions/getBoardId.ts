import { createClient } from "@/utils/supabase/server";

export const getBoardIdForUser = async () => {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user){
        throw new Error ('Unauthorized');
    }
    const userId = user.id as string | null

    const {data: board, error} = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

    if(error){
        throw error
    }

    return board ? board.id : null
}