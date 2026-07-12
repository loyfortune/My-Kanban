import Image from "next/image";
import heroImage from '@/public/hero-image.png';
import Link from "next/link";
import Button from "./ui/Button";


const Hero = () => {
    return(
        <div className='bg-white dark:bg-gray-900 dark:text-gray-100 h-screen w-full overflow-hidden -mt-18.75 text-gray-900'>
            <div className='flex h-full items-center justify-center pt-20.5 gap-20 w-[90%] mx-auto max-w-362.5'>
                <div className='grid items-center gap-6 md:grid-cols-2'>
                    <Image alt='product image' src={heroImage} className="mx-auto rounded-xl order-last md:min-w-120 object-contain sm:min-w-125 md:h-125 max-sm:px-5 shadow-lg" />
                    <div className='flex flex-col justify-center max-md:items-center space-y-4 max-md:text-center'>
                        <div className='space-y-2'>
                            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>Visualize Success Daily</h2>
                            <p className='max-w-125 sm:text-lg md:text-xl dark:text-gray-300 text-gray-500'>Take control of your productivity and visualize your success every day.</p>
                        </div>
                    <Link href={'/auth/sign-up'}>
                        <Button regularButton type="button" text="Start planning now &#8594;"/>
                    </Link>                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;