import React, { PropsWithChildren } from "react";
import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen mx-auto relative font-source-sans-pro">
      <Head>
        <title>Squad Goals</title>
      </Head>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
