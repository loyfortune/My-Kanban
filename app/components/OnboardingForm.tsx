"use client";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createNewBoard, createTask } from "../actions/boardActions";
import Button from "./ui/Button";
import SyncLoader  from "react-spinners/SyncLoader";
import toast from 'react-hot-toast';
import Input from "./ui/Input";


const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const OnboardingForm = ({user, boardId}:
     {user: string | null | undefined;
     boardId: string | null;}) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentBoardId, setCurrentBoardId] = useState(boardId);
    const router = useRouter();

    useEffect(() => {
        if (boardId !== null) {
            router.replace('/myKanban');
        }
    }, []);

    const stepOneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const id = await createNewBoard(formData);

        setCurrentBoardId(id);
        setStep(2);
    };

    const stepTwoSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            router.replace('/myKanban');
            toast.success(`welcome to your new board ${user}`)
            setLoading(false);
        }, 5000);
    };

    const goBack = () => {
        setStep(1);
    };

    return (
    <motion.div initial='hidden' animate='visible' exit={'exit'}
     variants={variants} transition={{duration: 0.5}} className="flex
     flex-col h-full items-center justify-center pt-20.5 w-[90%] mx-auto
     max-w-362.5 text-gray-900 dark:text-gray-50">
        {step === 1 && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
            transition={{duration: 0.5}} className="w-full">
                <h1 className="mb-10 text-lg sm:text-2xl md:text-3xl font-semibold
                border-l-4 dark:border-gray-400 dark:text-gray-50 border-gray-600 pl-1">
                Give your board a name</h1>
                <form className="flex flex-col gap-10 items-center" onSubmit={stepOneSubmit}>
                    <Input type="text" name="boardname" placeholder="My Board Name..."
                    disabled={loading}/>
                    <Button regularButton text="Continue" type="submit"/>
                </form>
            </motion.div>
        )}

        {step === 2 && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
            transition={{duration: 0.5}} className="w-full"
            >
                <h1 className="mb-10 text-lg sm:text-2xl md:text-3xl font-semibold
                border-l-4 dark:border-gray-400 dark:text-gray-50
                border-gray-600 pl-1">
                Add first Task</h1> 
                <form className="flex flex-col gap-10 items-center" action={createTask}
                 onSubmit={stepTwoSubmit}>
                <Input type="text" name="task" placeholder="My First Task..."
                disabled={loading}/>
                <input type="hidden" value={currentBoardId ?? ''} name="boardId"/>

                <div className="flex justify-between w-4/5 mb-10">
                    <Button regularButton type="button" text='&#8592; Go Back' onClick={goBack}
                    disabled={loading}/>
                    <Button regularButton text="Continue" type="submit" disabled={loading}/>
                </div>
                {loading ? (
                    <div className="flex gap-3 items-center dark:text-gray-400 text-gray-600">
                        <SyncLoader color={'#000'}/>
                        <span>Getting Your Bord Ready</span>
                    </div>
                ): null}
                </form>

            </motion.div>
        )}
    </motion.div>
    );
};

export default OnboardingForm