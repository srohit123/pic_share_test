export type userType = {
  username: string;
};

export interface Image {
  id: string;
  title: string;
  url: string;
  user: userType;
  created_date: string;
  updated_date?: string;
  favouriteImage?:
    | { created_date: string; id: string; updated_date: string }[]
    | [];
}
