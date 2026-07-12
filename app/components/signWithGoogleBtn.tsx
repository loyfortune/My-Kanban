'use client';

import Image from "next/image";
import goggleIcon from '../../public/2a5758d6-4edb-4047-87bb-e6b94dbbbab0-cover.png';
import { createClient } from "@/utils/supabase/client";

const GoogleBtn = () => {
        const supabase = createClient();
        const provider = 'google';

        async function signInWithGoogle() {
       const { error } = await supabase.auth.signInWithOAuth({
         provider,
         options: {
         },
       })
       
       if (error) {
         console.log(error);
       }
        };

    return (
        <button onClick={signInWithGoogle} className='flex mx-auto w-[94%] py-3 mt-3
        border border-neutral-800 dark:bg-gray-300 dark:text-gray-900 bg-white
        text-neutral-900 rounded cursor-pointer'><Image draggable="false" width={48}
        height={24} alt="" src={goggleIcon} /> Continue with Google</button>
    );
}

export default GoogleBtn;