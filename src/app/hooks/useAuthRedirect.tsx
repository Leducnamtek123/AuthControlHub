import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setUserFromLocalStorage, fetchUserDetailsAsync } from '../redux/slices/auth.slices';

const useAuthRedirect = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if the user is authenticated
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      const accessToken = parsedUser.accessToken;

      if (!accessToken) {
        // If there's no accessToken, redirect to login
        router.push('/auth/login');
        return;
      }

      if (!isAuthenticated && !loading) {
        // If not authenticated and not loading, redirect to login
        dispatch(fetchUserDetailsAsync()); // Ensure to dispatch action to verify user details
      }
    } else {
      // If no user info in localStorage, redirect to login
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, dispatch, router]);

  // Optionally handle error states
  useEffect(() => {
    if (error) {
      console.error('Error during authentication:', error);
      router.push('/auth/login');
    }
  }, [error, router]);
};

export default useAuthRedirect;
