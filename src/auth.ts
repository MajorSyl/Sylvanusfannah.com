import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const adminUsername = () => process.env.ADMIN_GITHUB_USERNAME?.trim().toLowerCase();

export const { handlers, auth, signIn, signOut } = NextAuth(() => ({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  trustHost: true,
  callbacks: {
    /** Only the GitHub account named in ADMIN_GITHUB_USERNAME may sign in. */
    signIn({ profile }) {
      const login = typeof profile?.login === "string" ? profile.login.toLowerCase() : undefined;
      const allowed = adminUsername();
      return Boolean(allowed && login && login === allowed);
    },
    jwt({ token, profile }) {
      if (profile && typeof profile.login === "string") token.login = profile.login;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.login = typeof token.login === "string" ? token.login : undefined;
      return session;
    },
  },
}));

declare module "next-auth" {
  interface Session {
    user: { login?: string; name?: string | null; email?: string | null; image?: string | null };
  }
}
