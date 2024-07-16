import { useEffect, useState } from "react";
import Input from "./Input";

function Header() {
  const [profileImage, setProfileImage] = useState();
  
  return (
    <div className="header">
      <div>ChatApp</div>
      <Input placeholder="Search..." />
    </div>
  );
}

export default Header;
