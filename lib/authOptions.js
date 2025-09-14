import GoogleProvider from 'next-auth/providers/google';
import { supabase } from './supabaseClient';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (!data) {
                await supabase
                    .from('users')
                    .insert({
                        id: user.id,
                    });
            }

            return true;
        },
        async session({ session, token }) {
            const userId = token.sub;

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            session.user.id = userId;
            
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};