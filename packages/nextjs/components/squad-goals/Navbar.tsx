import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import truncateEthAddress from "truncate-eth-address";
import { useAccount } from "wagmi";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const { isConnected: isWalletConnected, address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(isWalletConnected);
  }, [isWalletConnected]);

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="max-w-[1980px] mx-auto p-3 flex justify-between items-center">
      {/* logo */}
      <Link href={"/"}>
        <img src="/logo.png" alt="squad goals logo" className="h-10" />
      </Link>
      {/* navigation  */}
      <div className="hidden lg:flex items-center gap-5">
        <Link
          href={"/app"}
          className={`${pathname === "/app" ? "border-b-2 border-black" : ""} cursor-pointer flex-center`}
        >
          <div>app</div>
          <div>
            <img src="/app.png" alt="" className="w-10" />
          </div>
        </Link>
        <div className="cursor-pointer flex-center">
          <div>challenges</div>
          <div>
            <img src="/challenge.png" alt="" className="w-10" />
          </div>
        </div>
        <Link
          href={"/launch"}
          className={`${pathname === "/launch" ? "border-b-2 border-black" : ""} cursor-pointer flex-center`}
        >
          <div className="cursor-pointer flex-center">
            <div>launch</div>
            <div>
              <img src="/launch.png" alt="" className="w-10" />
            </div>
          </div>
        </Link>

        {isConnected ? (
          <Link
            href={"/dashboard"}
            className={`${pathname === "/dashboard" ? "border-b-2 border-black" : ""} cursor-pointer flex-center`}
          >
            {" "}
            <div className="cursor-pointer flex-center">
              <div>{truncateEthAddress(address || "")}</div>
              <div>
                <img src="/dashboard.png" alt="" className="w-10" />
              </div>
            </div>
          </Link>
        ) : (
          <div>
            <ConnectButton />
          </div>
        )}
      </div>

      {/* drawer for mobile */}
      <div className="block lg:hidden">
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          style={{ backgroundColor: "#212121" }}
          className=""
        >
          <div className="text-white block px-3 py-4 text-xl cursor-pointer hover:bg-primary transition">app</div>
          <div className="text-white block px-3 py-4 text-xl cursor-pointer hover:bg-primary transition">
            challenges
          </div>
          <div className="text-white block px-3 py-4 text-xl cursor-pointer hover:bg-primary transition">launch</div>
          <div className="text-white block px-3 py-4 text-xl cursor-pointer hover:bg-primary transition">dashboard</div>
        </Drawer>
      </div>

      {/* drawer */}
      <div onClick={toggleDrawer} className="block lg:hidden cursor-pointer text-2xl">
        <GiHamburgerMenu />
      </div>

      {isConnected ? (
        <div className="z-[100] fixed bottom-2 right-2 block">
          <ConnectButton />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
