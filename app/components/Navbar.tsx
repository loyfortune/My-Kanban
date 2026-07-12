"use client";

import { PiKanban } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { FiUser } from "react-icons/fi";
import dynamic from "next/dynamic";

 const supabase = createClient();

 const ThemeSwitcher = dynamic(
   () => import("./ThemeSwitcher"),
   {
     ssr: false,
   }
 ); 

export default function Navbar() {
  const profiledropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  async function getUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
      return null;
    }
    setUser(user);
  };
    getUser();
        const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

    const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace('/');
    router.refresh();
    if (error) {
      console.log(error);
    }
  }

  function handleProfileClick() {
    const dropdown = profiledropdownRef.current;

    if (dropdown?.classList.contains('hidden')) {
      dropdown?.classList.remove('hidden');
      dropdown?.classList.add('flex');
    }
    else {
      dropdown?.classList.remove('flex');
      dropdown?.classList.add('hidden');
    }
  };

  return (
    <div className='py-5 bg-transparent relative z-10 w-full'>
      <div className='flex justify-between w-[90%] max-w-362.5 mx-auto'>
        <Link href={'/'} className= 'dark:text-white flex gap-1 items-center text-lg sm:text-2xl font-bold uppercase'>
        <h1>My Kanban</h1>
        <PiKanban className="dark:text-gray-100"/>
        </Link>

          {user && (
        <div className='flex items-center gap-3'>            
          <button onClick={handleProfileClick} className="w-11 cursor-pointer h-11 rounded-full">
            <FiUser className="w-6 h-6 dark:text-white"/>
          </button>
          <div ref={profiledropdownRef} className='hidden absolute top-15 right-10 w-full max-w-60 sm:max-w-70
           p-4 dark:bg-gray-800 bg-white text-gray-900 dark:text-gray-100 rounded-md gap-y-3 justify-center flex-col shadow-md'>
            <div className='flex gap-3 items-center'>
              <FiUser className="w-6 h-6"/>
            <span className='flex flex-col'><p className='text-sm sm:text-base font-bold'>{user?.user_metadata.name}</p>
             <p className='text-xs sm:text-sm text-gray-400'>{user?.user_metadata.email}</p></span>
            </div>
            <div className="flex gap-3 items-center">
              <PiKanban className="w-5 h-5"/>
              <Link href={'/myKanban'} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">My board</Link>
            </div>
            <div className='flex gap-3 items-center'>
              <PiSignOut className="w-5 h-5"/>
            <button onClick={handleSignOut} className='dark:text-gray-400 text-gray-500 hover:text-gray-800 dark:hover:text-gray-100
             cursor-pointer'>Sign Out</button>
            </div>
          </div>   
          <ThemeSwitcher />
        </div>                   
          )}

        {!user && (
          <div className="flex items-center gap-3">
          <Link href={'/auth/sign-in'} className='tracking-tight 
          hover:underline'>Sign In &#8594;
          </Link>
          <ThemeSwitcher />
          </div>
        )}
      </div>
    </div>
  );
};
