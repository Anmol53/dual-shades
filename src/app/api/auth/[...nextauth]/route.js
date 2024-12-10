import connectToDatabase from "@/lib/mongoose";
import Plan from "@/models/Plan";
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
        const currentUser = await User.findOne({
          email: session.user.email,
        }).populate("plan");

        if (currentUser) {
          session.user = {
            ...session.user,
            plan: currentUser.plan,
            usage: currentUser.usage,
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
          const freePlan = await Plan.findOne({
            type: "free",
            status: "active",
          });

          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            plan: freePlan._id,
            usage: {
              total_usage: 0,
              current_month_usage: 0,
              last_used_date: null,
            },
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
  theme: {
    logo: "/icons/apple-icon.png",
  },
  pages: {
    signIn: "/auth/signin",
  },
  // Add additional NextAuth.js configuration here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
