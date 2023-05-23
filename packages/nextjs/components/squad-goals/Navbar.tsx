import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="max-w-[1980px] mx-auto p-3 flex justify-between items-center">
      {/* logo */}
      <div>
        <img src="/logo.png" alt="squad goals logo" className="h-10" />
      </div>
      {/* navigation  */}
      <div className="hidden lg:flex items-center gap-5">
        <div className="cursor-pointer flex-center">
          <div>app</div>
          <div>
            <img src="/app.png" alt="" className="w-10" />
          </div>
        </div>
        <div className="cursor-pointer flex-center">
          <div>challenges</div>
          <div>
            <img src="/challenge.png" alt="" className="w-10" />
          </div>
        </div>
        <div className="cursor-pointer flex-center">
          <div>launch</div>
          <div>
            <img src="/launch.png" alt="" className="w-10" />
          </div>
        </div>
        <div className="cursor-pointer flex-center">
          <div>dashboard</div>
          <div>
            <img src="/dashboard.png" alt="" className="w-10" />
          </div>
        </div>
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
    </div>
  );
};

export default Navbar;
