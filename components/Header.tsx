import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="relative h-20 w-20">
      <Image
        objectFit="contain"
        src="https://avatars.githubusercontent.com/u/96020697?v=4"
        layout="fill"
      />
    </div>
  );
}

export default Header;
