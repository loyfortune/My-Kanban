import SignUpForm from '@/app/components/sign-upForm'
import GoogleBtn from '@/app/components/signWithGoogleBtn'

    export default function SignUpPage() {
    return (
        <>
        <div className="px-6 py-24 w-full">
    <div className='max-w-112.5 h-150 my-auto mx-auto dark:bg-gray-800 bg-white rounded-sm shadow-lg dark:text-white text-neutral-950'>
     <div className='w-full mx-auto py-16'>
         <h1 className='text-2xl pl-4 sm:text-3xl font-bold'>Sign Up</h1>
        <GoogleBtn />
        <p className="flex justify-center my-4 dark:text-white text-neutral-900 font-semibold">or</p>

        <SignUpForm />
     </div>
    </div>
    </div>
        </>
    )
}