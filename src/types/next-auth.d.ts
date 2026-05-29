import { AccountRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      accountRole: AccountRole;
      candidateId?: string;
      chapterId?: number;
      enterprisePartnerId?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    accountRole: AccountRole;
    candidateId?: string;
    chapterId?: number;
    enterprisePartnerId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accountRole: AccountRole;
    candidateId?: string;
    chapterId?: number;
    enterprisePartnerId?: string;
  }
}
