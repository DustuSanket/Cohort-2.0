import React from "react";

const Card = () => {
  return (
    <div className="px-5 py-5">
      <div className="h-85 w-60 bg-white rounded-3xl px-2.5 py-2.5 ">
        <img
          className="rounded-3xl h-[100%] object-cover z-99"
          src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
