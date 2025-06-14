import NextAuth, { NextAuthOptions, Account } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { User as NextAuthUser } from "next-auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { Account as UserAccount } from "@/models/account";

// Add custom fields to Next Auth User
interface ExtendedUser extends Omit<NextAuthUser, 'id'> {
  id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'ainewshub',
    collections: {
      Users: 'users',
      Accounts: 'accounts',
      Sessions: 'sessions',
      VerificationTokens: 'verification_tokens',
    }
  }),
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDatabase();
        
        if (user?.email) {
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            const existingAccount = await UserAccount.findOne({
              userId: existingUser._id,
              provider: account?.provider
            });
            
            if (!existingAccount) {
              return `/auth/error?error=duplicate_email&provider=${account?.provider}`;
            }
          }
        }
        
        return true;
      } catch (error) {
        console.error("Sign In Error:", error);
        return false;
      }
    },
    async session({ session, user, token }) {
      try {
        if (session.user) {
          if (token?.sub) {
            (session.user as ExtendedUser).id = token.sub;
          } else if (user?.id) {
            (session.user as ExtendedUser).id = user.id;
          } else if ((user as any)?._id) {
            (session.user as ExtendedUser).id = (user as any)._id.toString();
          }
        }
        return session;
      } catch (error) {
        console.error("Session Error:", error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      try {
        if (user) {
          token.userId = user.id;
        }
        return token;
      } catch (error) {
        console.error("JWT Error:", error);
        return token;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };