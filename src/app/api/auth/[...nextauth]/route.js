import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDatabase();
        const currentUser = await User.findOne({ email: session.user.email });

        if (currentUser) {
          session.user = {
            ...session.user,
            plan: currentUser.plan,
            plan_id: currentUser.plan_id,
            credits: currentUser.credits,
          };
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
      return session;
    },
    async signIn({ user }) {
      try {
        await connectToDatabase();
        const currentUser = await User.findOne({ email: user.email });
        
        if (!currentUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            credits: 2,
            plan: "free",
            plan_id: 1,
          });
        } else {
          await User.updateOne(
            { email: currentUser.email },
            {
              name: user.name,
              image: user.image,
            }
          );
        }
        return true;
      } catch (error) {
        console.log("Error Signing in user with oAuth", error);
        return false;
      }
    },
  },
  // Add additional NextAuth.js configuration here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
