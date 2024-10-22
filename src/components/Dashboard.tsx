'use client';

import React from "react";
import { signIn, useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
        {session ? (
            <>
                <h1>HELLO</h1>
                <p>{JSON.stringify(session)}</p>
            </>
        ) : (
            <>
                <p>your not logged in</p>
                <button onClick={() => {signIn('google')}}>Sign in with google</button>
                <button onClick={() => {signIn('github')}}>Sign in with github</button>

            </>
        )};
    </>
  );
};

export default Dashboard;
