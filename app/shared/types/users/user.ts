export type UserMenu = {
    id: number;
    parentId: number;
    title: string;
    link: string;
    isDeleted: boolean;
  }
export type TUserLocal = {
  email: string;
  isVerified: boolean;
  isVolunteer: boolean;
  menus: UserMenu[];
  roles: string[];
  userName: string;
}