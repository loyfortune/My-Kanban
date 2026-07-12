import { createClient } from "@/utils/supabase/client";
import { getBoardIdForUser } from "../actions/getBoardId";
import OnboardingForm from "../components/OnboardingForm";

  const supabase = createClient();
    async function getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
      return null;
    }
    return user;
  }

const page = async () => {
    const boardId = await getBoardIdForUser()
    const user = await getUser();
    const userName = user?.user_metadata.first_name ||
    user?.user_metadata?.full_name?.split(" ")[0] || 'User';

    return (
        <div className="h-screen relative w-full -mt-18.75 overflow-hidden dark:text-neutral-50 text-gray-900">
          <OnboardingForm user={userName} boardId={boardId}/>
        </div>
    );
}

export default page;