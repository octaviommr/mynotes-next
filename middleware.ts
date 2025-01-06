import NextAuth from "next-auth"

// create an Auth.js object to be used in middleware
const { auth } = NextAuth({
  pages: {
    /* 
      Define the custom sign in page to be used in place of the built-in one. 
      
      Unauthenticated users will be redirected to this URL when trying to access a page that requires authentication (a
      "callbackUrl" search param containing the page URL will be appended, so we can return the user back to it after a
      successful sign in).
    */
    signIn: "/login",
  },
  callbacks: {
    // set up the callback used to verify if a request can access a page
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth
      const requiresAuthentication = nextUrl.pathname.startsWith("/notes")

      if (requiresAuthentication) {
        return isLoggedIn
      } else if (isLoggedIn) {
        /*
          Redirect logged in users to the note board page if they try to access pages meant only for unauthenticated users
          (log in, sign up or homepage)
        */
        return Response.redirect(new URL("/notes", nextUrl))
      }

      return true
    },
  },
  providers: [],
})

export { auth as middleware }

/*
  Make sure we match all request paths except for the ones starting with:
  - api (API routes)
  - _next/static (static files)
  - _next/image (image optimization files)
  - favicon.ico, sitemap.xml, robots.txt (metadata files)
*/
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
