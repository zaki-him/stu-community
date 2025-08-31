import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub(
    {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }
  )],
  callbacks: {
    async session({ session, token }) {
      // attach id from token to session
      if (session.user) {
        session.user.id = token.sub!  // `sub` is the user’s ID from provider
      }
      return session
    },
  }
})