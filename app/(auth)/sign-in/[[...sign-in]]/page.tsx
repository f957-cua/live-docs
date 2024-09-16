import { SignIn } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';

const SignInPage = () => {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default SignInPage;
