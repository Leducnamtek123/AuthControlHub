'use client';

import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-2">
            <div className="absolute top-4 right-4 flex items-center">
              <Link href="/auth/login">
                <button className="relative text-blueGray-500 text-base cursor-pointer p-2 group">
                  <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-x-3 absolute inset-y-1 left-0 flex items-center -translate-y">
                    <FontAwesomeIcon 
                      icon={faArrowLeft} 
                      className="text-blueGray-500 text-xm"/>
                  </span>
                  <span className="ml-3 text-base">Login</span>
                </button>
              </Link>
            </div>
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign up with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img alt="Github" className="w-5 mr-1" src="/img/github.svg" />
                  Github
                </button>
                <button
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img alt="Google" className="w-5 mr-1" src="/img/google.svg" />
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign up with credentials</small>
              </div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
