import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  email: string | null;
  name: string | null;
  role: string | null;
  cod_representante: string | null;
}

interface UserDataState {
  token: string | null;
  userInfo: UserInfo;
  setToken: (token: string | null) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  clearStorage: () => void;
}

export const useUserDataStore = create<UserDataState>()(
  persist(
    (set) => ({
      token: null,
      userInfo: {
        email: null,
        name: null,
        role: null,
        cod_representante: null
      },
      setToken: (token) => set({ token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      clearStorage: () => set({
        token: null,
        userInfo: {
          email: null,
          name: null,
          role: null,
          cod_representante: null
        }
      }),
    }),
    {
      name: 'user-data-storage', // Name of the storage item
      storage: createJSONStorage(() => localStorage),
    }
  )
);
