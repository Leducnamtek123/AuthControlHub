'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/contexts/LoadingContext";
import { logout, getUserDetails } from "@/app/redux/slices/auth.slices";
import { useEffect } from "react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { setLoading } = useLoading();
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector((state: RootState) => state.auth.userDetails);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await dispatch(logout());
      router.push("/auth/login");
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userDetails?.email || "User Name"}
          </span>
          {/* <span className="block text-xs">{userDetails?.role || "User Role"}</span> */}

          <span className="block text-xs">{"User Role"}</span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden">
          <Image
            width={112}
            height={112}
            // src={userDetails?.avatar || "/images/user/user-01.png"}
            src={"/images/user/user-01.png"}

            style={{ width: "auto", height: "auto" }}
            alt="User"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill="currentColor"
          />
        </svg>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                    fill="currentColor"
                  />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base w-full text-left"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0125 4.29685 18.0125H5.25935V19.4556C5.25935 20.6644 6.25623 21.6219 7.42498 21.6219H15.675C16.8312 21.6219 17.8187 20.6644 17.8187 19.4556V18.0125H18.7712C19.2137 18.0125 19.5565 17.6687 19.5565 17.2219C19.5565 16.775 19.2137 16.4312 18.7712 16.4312H17.8187V11.8594H18.7712C19.2137 11.8594 19.5565 11.4812 19.5565 11.0687C19.5565 10.6219 19.2137 10.2781 18.7712 10.2781H17.8187V5.70624H18.7712C19.2137 5.70624 19.5565 5.36249 19.5565 4.91562C19.5565 4.46874 19.2137 4.12499 18.7712 4.12499H17.8187V2.78437C17.8187 2.04687 17.3937 1.44374 17.6687 1.44374Z"
                    fill="currentColor"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
