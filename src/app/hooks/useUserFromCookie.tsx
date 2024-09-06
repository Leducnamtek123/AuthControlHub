// hooks/useUserFromCookie.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { UserResponse } from '@/@types';
import { setUserFromSession } from '../redux/slices/auth.slices';

const useUserFromCookie = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userCookie = Cookies.get('user'); // Lấy cookie người dùng
    if (userCookie) {
      try {
        const parsedUser: UserResponse & { token: string } = JSON.parse(userCookie); // Parse dữ liệu người dùng từ cookie
        dispatch(setUserFromSession({ user: parsedUser, token: parsedUser.token })); // Wrap parsedUser in an object
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, [dispatch]);
};

export default useUserFromCookie;
