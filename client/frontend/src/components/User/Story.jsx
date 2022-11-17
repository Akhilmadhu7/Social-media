import React from "react";

function Story() {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ];
  return (
    <div className="mb-2  p-2 overflow-x-auto w-screen lg:w-full flex gap-5">
      <div className="relative w-[3.5rem] rounded-full bg-puple-600 inline-block ">
        <div className="bg-gradient-to-tr from-indigo-600 to-rose-500 p-[0.2rem] rounded-full overflow-hidden w-[4rem] h-[4rem]">
          <div className=" rounded-full bg-white overflow-hidden  inline-block">
            <img
              className="rounded-full p-[3px]"
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              alt="story"
            />
          </div>
        </div>
        <button className="absolute bottom-6 left-10 bg-blue-500 h-6 w-6 rounded-full text-white text-xl font-semibold border-2 border-white flex justify-center items-center font-mono hover:bg-blue-700">
          +
        </button>
        <small>user</small>
      </div>

      {a.map((element) => {
        return (
          <div className=" w-[3.5rem] rounded-full bg-puple-600 inline-block ">
            <div className="bg-gradient-to-tr from-indigo-600 to-rose-500 p-[0.2rem] rounded-full overflow-hidden w-[4rem] h-[4rem]">
              <div className=" rounded-full bg-white overflow-hidden  inline-block">
                <img
                  className="rounded-full p-[3px]"
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  alt="story"
                />
              </div>
            </div>
            <small>user</small>
          </div>
        );
      })}
    </div>
  );
}

export default Story;
