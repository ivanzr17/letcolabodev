"use server"
import { redirect } from 'next/navigation';

const redirectTo = (path: string) => {
    redirect(path);
};

export default redirectTo