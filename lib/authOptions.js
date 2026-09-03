import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isLawyer: { label: "Is Lawyer", type: "text" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db();

          const collection =
            credentials.isLawyer === "true"
              ? db.collection("lawyers")
              : credentials.email === "lawchatbot17@gmail.com"
              ? db.collection("admin")
              : db.collection("users");

          const user = await collection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const ok = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!ok) {
            throw new Error("Wrong password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role:
              credentials.isLawyer === "true"
                ? "lawyer"
                : user.email === "lawchatbot17@gmail.com"
                ? "admin"
                : "user",
          };
        } catch (err) {
          console.error("AUTH ERROR:", err);
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
