import React from "react";

function CheckOut({ orderState = false }) {
  let displayState = orderState ? "Success" : "Failure";
  return (
    <div className="max-w-screen-lg mx-auto md:gap-8 pt-20 px-8 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="md:pr-20 text-center md:text-left">
          <h1 className="text-3xl my-5 font-bold ">{displayState}</h1>
          <h1 className="text-3xl my-5 font-bold ">Coming soon...</h1>
          <div className="text-sm">
            We are working hard to deliver best possible experience. The website
            is currently under construction.
            <span className="underline my-5"> It goes live in:</span>
          </div>
          <div></div>
          <div className="my-5">
            <div className="text-sm text-gray-800 my-5">
              Let me know when your website is live.
            </div>
            <div className="my-5 flex justify-between">
              <input
                className="mr-3 w-full border border-gray-400 rounded py-1 px-2 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
                placeholder="Email address"
              />
              <button className="bg-indigo-400 hover:bg-indigo-600  text-gray-50 py-1 px-4 rounded text-sm whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            alt="Image placeholder"
            src="/assets/comingSoon/illustration.svg"
          />
        </div>
      </div>
      <div className="text-center text-sm">
        <div>+ 1 526 220 0459</div>
        <div>contact@example.com</div>
      </div>
    </div>
  );
}

export default function checkout() {
  let orderState = false;
  return (
    <div>
      <CheckOut orderState={orderState} />
      <CheckOut orderState={!orderState} />
    </div>
  );
}
