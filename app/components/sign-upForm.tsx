'use client'

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const supabase = createClient();

    async function signUpNewUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if(error){
        console.log(error);
        setError((error as Error).message);
        return;
      }

      router.push('/auth/sign-in');
    }

    return (
            <form onSubmit={signUpNewUser} className='w-full flex gap-y-3 flex-col p-4'>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className='bg-gray-100 dark:bg-gray-700 p-3 rounded outline-none'/>
             <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className='bg-gray-100 dark:bg-gray-700 p-3 rounded outline-none'/>
             <button className='block py-3 mt-3 bg-neutral-800 dark:bg-gray-300 dark:text-gray-900 text-white rounded cursor-pointer'>Sign Up</button>
             {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            <div className='flex items-center justify-between mt-5 text-sm text-gray-500 dark:text-gray-400'>
                <p><input type="checkbox" className='mr-2'/> Remember me</p>
                <p className='cursor-pointer hover:underline'>Need help?</p>
            </div>
            <p className='my-8'><span className='text-gray-500 dark:text-gray-400'>Already have an Account?</span>{'  '}<span className='cursor-pointer dark:text-white'><Link href='/auth/sign-in'>Sign In</Link></span></p>
         </form>
    );
}

export default SignUpForm;