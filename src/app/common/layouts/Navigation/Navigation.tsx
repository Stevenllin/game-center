import React from 'react';
import { HiCreditCard } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { IoMan } from "react-icons/io5";

const Navigation: React.FC = () => {
  return (
    <nav>
      <div className="h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="my-4">
          <HiCreditCard />
        </div>
        <div className="my-4">
          <FaRegCircle />
        </div>
        <div className="my-4">
          <BsGridFill />
        </div>
        <div className="my-4">
          <IoMan />
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
