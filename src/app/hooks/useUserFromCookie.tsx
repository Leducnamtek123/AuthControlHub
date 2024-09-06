// // hooks/useUserFromCookie.ts
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';
// import { UserResponse } from '@/@types';

// const useUserFromCookie = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const userCookie = Cookies.get('user'); // Lấy cookie người dùng
//     if (userCookie) {
//       try {
//         const parsedUser: UserResponse = JSON.parse(userCookie); // Parse dữ liệu người dùng từ cookie
//         dispatch(setUserFromSession({
//           user: { ...parsedUser, role: parsedUser.role || 'default_role' },
//           userResponse: parsedUser
//         })); // Cập nhật người dùng vào Redux store
//       } catch (error) {
//         console.error('Failed to parse user cookie:', error);
//       }
//     }
//   }, [dispatch]);
// };

// export default useUserFromCookie;
