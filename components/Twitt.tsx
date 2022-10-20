import React from "react";

const Twitt = () => {
  return (
    <li>
      <article className="duration-350 transition ease-in-out hover:bg-[#493a4c]">
        <div className="flex flex-shrink-0 p-4 pb-0">
          <a href="#" className="group block flex-shrink-0">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium leading-6 text-white">
                  Sonali Hirave
                  <span className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                    @ShonaDesign . 16 April
                  </span>
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="pl-16">
          <p className="width-auto flex-shrink text-base font-medium text-white">
            Day 07 of the challenge{" "}
            <a href="#" className="text-blue-400">
              #100DaysOfCode
            </a>
            I was wondering what I can do with{" "}
            <a href="#" className="text-blue-400">
              #tailwindcss
            </a>
            , so just started building Twitter UI using Tailwind and so far it
            looks so promising. I will post my code after completion. [07/100]
            <a href="#" className="text-blue-400">
              {" "}
              #WomenWhoCode #CodeNewbie
            </a>
          </p>

          <div className="pr-6 pt-3 md:flex-shrink">
            <div
              className="h-64 w-full rounded-lg bg-cover bg-center bg-no-repeat"
              style={{
                height: "200px",
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=448&amp;q=80)",
              }}
            >
              <img
                className="h-full w-full opacity-0"
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=448&amp;q=80"
                alt=""
              />
            </div>
          </div>

          <div className="flex items-center py-4">
            <div className="duration-350 flex flex-1 items-center justify-center text-xs text-white text-gray-400 transition ease-in-out hover:text-green-400">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 h-5 w-5"
              >
                <g>
                  <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                </g>
              </svg>
              14 k
            </div>
            <div className="duration-350 flex flex-1 items-center justify-center text-xs text-white text-gray-400 transition ease-in-out hover:text-red-600">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 h-5 w-5"
              >
                <g>
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                </g>
              </svg>
              14 k
            </div>
          </div>
        </div>
        <hr className="border-[#392b3d]" />
      </article>
    </li>
  );
};

export default Twitt;
