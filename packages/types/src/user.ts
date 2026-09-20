export type UserRole =
  | "CLIENT"
  | "FREELANCER"
  | "STUDENT"
  | "INSTITUTE_ADMIN"
  | "INSTITUTE_INSTRUCTOR"
  | "ENTERPRISE_RECRUITER"
  | "SUPER_ADMIN";

export type TVETTrack = "BTEB" | "NSDA" | "BOTH" | "NONE";

export interface UserSessionPayload {
  uid: string;
  phoneNumber?: string;
  email?: string;
  roles: UserRole[];
  activeRole: UserRole;
  tenantId?: string;
  isVerifiedTVETPro: boolean;
}
