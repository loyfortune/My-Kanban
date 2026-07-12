import { createClient } from "@/utils/supabase/server";
import KanbanBoard from "../components/KanbanBoard"
import { redirect } from "next/navigation";
import { Task } from "@/types/types";

const page = async () => {
  const supabase = await createClient();

  const {
        data: { user },
  } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('Unauthorized');
  }
  const userId = user.id;

  const { data: board, error } = await supabase
  .from('boards')
  .select(`*, tasks(
    id,
    name,
    status,
    created_at)`)
    .eq('user_id', userId)
    .maybeSingle();

    if (error){
      throw error;
    }

    if (!board){
      redirect('/onboarding');
    }

  return (
    <>
    <KanbanBoard key={board.tasks.map((task: Task) => task.id).join('-')}
     board={board}/>
    </>
  )
}

export default page