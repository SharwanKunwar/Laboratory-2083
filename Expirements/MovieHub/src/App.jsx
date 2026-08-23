

function App() {
  return (
    <>
      <div className="bg-gray-400 backdrop-blur-2xl w-screen h-screen p-10">
        <div
          className="bg-white/30 backdrop-blur-sm w-full h-full rounded-2xl shadow-md bg-cover bg-center"
          style={{ backgroundImage: `url('/bg/b04.jpeg')` }}
        >

          {/* layout container  */}
          <div className="bg-white/30 backdrop-blur-md w-full h-full rounded-2xl border border-white/30 p-5">
            {/* nav  */}
            <div className=" w-full h-[10%] flex ">
              {/* search box */}
              <div className="w-[20%] h-full flex items-center px-5">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none border border-black/10 bg-white/70 backdrop-blur-sm placeholder-neutral-500 focus:border-black/30 transition-all duration-200"
                  />

                  {/* Search icon */}
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
              </div>
              {/* list */}
              <div className="w-[60%] h-full flex items-center justify-end gap-5 px-2 ">
                {/* Item 1 */}
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200"
                >
                  Fiction
                </button>

                {/* Item 2 */}
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200"
                >
                  Non-Fiction
                </button>

                {/* Item 3 */}
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200"
                >
                  Sci-Fi
                </button>

                {/* Item 4 */}
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200"
                >
                  Biography
                </button>

                {/* Item 5 — dropdown */}
                <div className="relative">
                  <select
                    className="appearance-none px-15 py-2 pr-8 rounded-lg text-sm font-medium border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200 outline-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      More
                    </option>
                    <option value="poetry">Poetry</option>
                    <option value="history">History</option>
                    <option value="self-help">Self-Help</option>
                    <option value="fantasy">Fantasy</option>
                  </select>

                  {/* Dropdown arrow icon */}
                  <svg
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {/* notification and profile */}
              <div className="w-[20%] h-full flex items-center justify-end gap-4 px-2 ">
                {/* Notification bell */}
                <button className="relative p-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>

                  {/* Notification dot */}
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
                </button>

                {/* Profile */}
                <button className="flex w-[60%] items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm hover:bg-black/5 transition-all duration-200">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-black/10"
                  />
                  <span className="text-sm font-medium">John Doe</span>
                </button>
              </div>
            </div>

            {/* outlet  */}
            <div className="bg-yellow-400/30 rounded-lg border w-full h-[90%] flex justify-center items-center">outlet</div>
          </div>


        </div>
      </div>
    </>
  )
}

export default App