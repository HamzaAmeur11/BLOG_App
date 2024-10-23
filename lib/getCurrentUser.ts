import { getServerSession } from 'next-auth';

export async function getCurrentUser() {
    const session = await getServerSession();
    console.log('SESSION :',session);
    
    if (session) {
        return session.user;
    } else {
        return null;
    }
}