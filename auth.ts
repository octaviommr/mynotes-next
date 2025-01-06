import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import UserModel from "./app/models/User"

/*
  Create an Auth.js object for signing in/out users and to provide access to the user session.

  We can't use this same object in middleware too because of "bcrypt", since it relies on Node.js APIs not available
  in Next.js middleware.
*/
export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // specify which fields should be submitted when signing in
      credentials: {
        email: {},
        password: {},
      },

      // set up the callback that handles the authentication logic, using the submitted user credentials
      async authorize(credentials) {
        const { email, password } = credentials

        const user = await UserModel.findOne({ email })

        if (!user) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        )

        if (!passwordsMatch) {
          return null
        }

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],

  callbacks: {
    /*
      Set up the callback that is called whenever we check the session, making sure the user ID is returned (this doesn't
      happen by default for security reasons).

      The "sub" (subject) prop of the token, which contains the user ID, is the claim that identifies the principal that
      is the subject of the token.
    */
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }
    },
  },
})
