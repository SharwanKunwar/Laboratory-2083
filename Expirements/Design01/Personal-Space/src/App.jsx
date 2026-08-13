import { useState } from "react";

import {
  RiChromeLine,
  RiGithubLine,
  RiGoogleLine,
  RiYoutubeLine,
  RiChat3Line,
  RiMailLine,
  RiFileEditLine,
  RiTerminalBoxLine,
  RiFolderLine,
} from "react-icons/ri";


// =====================================================
// IMPORTANT SITES
// =====================================================

const importantSites = [
  {
    name: "Google",
    icon: RiGoogleLine,
    url: "https://www.google.com",
  },
  {
    name: "YouTube",
    icon: RiYoutubeLine,
    url: "https://www.youtube.com",
  },
  {
    name: "GitHub",
    icon: RiGithubLine,
    url: "https://github.com",
  },
  {
    name: "ChatGPT",
    icon: RiChat3Line,
    url: "https://chatgpt.com",
  },
  {
    name: "Gmail",
    icon: RiMailLine,
    url: "https://mail.google.com",
  },
];


// =====================================================
// SYSTEM CALLS
// =====================================================

const systemActions = [
  {
    name: "Chrome",
    icon: RiChromeLine,
    endpoint: "/api/manager/open-chrome",
  },
  {
    name: "Editor",
    icon: RiFileEditLine,
    endpoint: "/api/manager/open-editor",
  },
  {
    name: "Terminal",
    icon: RiTerminalBoxLine,
    endpoint: "/api/manager/open-terminal",
  },
  {
    name: "Files",
    icon: RiFolderLine,
    endpoint: "/api/manager/open-files",
  },
];


// =====================================================
// APP
// =====================================================

function App() {

  const [status, setStatus] = useState("Ready");


  // ===================================================
  // OPEN IMPORTANT SITE
  // ===================================================

  const openSite = (url) => {

    window.open(url, "_blank");

  };


  // ===================================================
  // CALL SPRING BOOT API
  // ===================================================

  const callSystemApi = async (action) => {

    setStatus(`Opening ${action.name}...`);

    try {

      const response = await fetch(
        `http://localhost:8080${action.endpoint}`,
        {
          method: "POST",
        }
      );


      // If backend returns an error
      if (!response.ok) {

        throw new Error(
          `HTTP Error: ${response.status}`
        );

      }


      const data = await response.text();

      console.log("Backend Response:", data);

      setStatus(data);


    } catch (error) {

      console.error(
        "System API Error:",
        error
      );

      setStatus(
        `Failed to open ${action.name}`
      );

    }

  };


  return (
    <>


      {/* ================================================= */}
      {/* FULL SCREEN BACKGROUND */}
      {/* ================================================= */}

      <div
        className="
          w-screen
          h-screen

          bg-black

          flex
          items-center
          justify-center

          bg-cover
          bg-center
          bg-no-repeat
        "

        style={{
          backgroundImage:
            "url('/bg_images/b01.png')",
        }}
      >


        {/* ================================================= */}
        {/* MAIN GLASS CONTAINER */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-col

            items-center
            justify-center

            w-[97%]
            h-[95%]

            bg-white/15

            backdrop-blur-2xl
            backdrop-saturate-200

            border
            border-white/20

            rounded-2xl

            shadow-[
              0_20px_60px_rgba(0,0,0,0.35),
              inset_0_1px_2px_rgba(255,255,255,0.5)
            ]
          "
        >


          {/* ================================================= */}
          {/* TOP SECTION */}
          {/* ================================================= */}

          <div
            className="
              flex

              w-full
              h-[70%]
            "
          >


            {/* ================================================= */}
            {/* LEFT BOX - IMPORTANT SITES */}
            {/* ================================================= */}

            <div
              className="
                w-[40%]
                h-full
                p-10
              "
            >

              <div
                className="
                  w-full
                  h-full

                  bg-white/90

                  rounded-md

                  border
                  border-white/70

                  shadow-[
                    0_10px_30px_rgba(255,255,255,0.18),
                    inset_0_1px_2px_rgba(255,255,255,0.9)
                  ]

                  p-6

                  overflow-auto
                "
              >


                {/* TITLE */}

                <h2
                  className="
                    text-xl
                    font-semibold
                    text-gray-800
                    mb-5
                  "
                >
                  Important Sites
                </h2>


                {/* SITES GRID */}

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-4
                  "
                >

                  {importantSites.map((site) => {

                    const Icon = site.icon;


                    return (

                      <button
                        key={site.name}

                        onClick={() =>
                          openSite(site.url)
                        }

                        className="
                          aspect-square

                          flex
                          flex-col

                          items-center
                          justify-center

                          gap-2

                          rounded-md

                          bg-white/70

                          border
                          border-white

                          text-gray-600

                          shadow-[
                            2px_2px_8px_rgba(0,0,0,0.12),
                            inset_0_1px_2px_rgba(255,255,255,0.9)
                          ]

                          transition-all
                          duration-200

                          hover:-translate-y-1

                          hover:bg-white

                          hover:text-black

                          hover:shadow-[
                            4px_8px_15px_rgba(0,0,0,0.15)
                          ]

                          active:scale-95
                        "
                      >

                        <Icon
                          className="text-3xl"
                        />

                        <span
                          className="
                            text-xs
                            font-medium
                          "
                        >
                          {site.name}
                        </span>

                      </button>

                    );

                  })}

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* MIDDLE VIDEO */}
            {/* ================================================= */}

            <div
              className="
                w-[20%]
                h-full
                p-3
              "
            >

              <video
                src="/video/v01.mp4"

                className="
                  w-full
                  h-full

                  rounded-md

                  object-cover

                  border
                  border-white/30

                  shadow-[
                    0_10px_30px_rgba(255,255,255,0.15),
                    0_10px_30px_rgba(0,0,0,0.25)
                  ]
                "

                autoPlay
                loop
                muted
                playsInline
              />

            </div>


            {/* ================================================= */}
            {/* RIGHT BOX - SYSTEM CALLS */}
            {/* ================================================= */}

            <div
              className="
                w-[40%]
                h-full
                p-10
              "
            >

              <div
                className="
                  w-full
                  h-full

                  bg-white/90

                  rounded-md

                  border
                  border-white/70

                  shadow-[
                    0_10px_30px_rgba(255,255,255,0.18),
                    inset_0_1px_2px_rgba(255,255,255,0.9)
                  ]

                  p-6

                  overflow-auto
                "
              >


                {/* TITLE */}

                <h2
                  className="
                    text-xl
                    font-semibold
                    text-gray-800
                    mb-5
                  "
                >
                  System Calls
                </h2>


                {/* SYSTEM GRID */}

                <div
                  className="
                    grid
                    grid-cols-4
                    gap-4
                  "
                >

                  {systemActions.map((action) => {

                    const Icon = action.icon;


                    return (

                      <button
                        key={action.name}

                        onClick={() =>
                          callSystemApi(action)
                        }

                        className="
                          aspect-square

                          flex
                          flex-col

                          items-center
                          justify-center

                          gap-2

                          rounded-md

                          bg-white/70

                          border
                          border-white

                          text-gray-600

                          shadow-[
                            2px_2px_8px_rgba(0,0,0,0.12),
                            inset_0_1px_2px_rgba(255,255,255,0.9)
                          ]

                          transition-all
                          duration-200

                          hover:-translate-y-1

                          hover:bg-white

                          hover:text-black

                          hover:shadow-[
                            4px_8px_15px_rgba(0,0,0,0.15)
                          ]

                          active:scale-95
                        "
                      >

                        <Icon
                          className="text-2xl"
                        />

                        <span
                          className="
                            text-xs
                            font-medium
                          "
                        >
                          {action.name}
                        </span>

                      </button>

                    );

                  })}

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* BOTTOM COMMAND / ASSISTANT PANEL */}
          {/* ================================================= */}

          <div
            className="
              w-full
              h-[30%]

              px-10
              py-5
            "
          >

            <div
              className="
                w-full
                h-full

                bg-white/90

                rounded-md

                border
                border-white/70

                shadow-[
                  0_10px_30px_rgba(255,255,255,0.18),
                  inset_0_1px_2px_rgba(255,255,255,0.9)
                ]

                flex
                flex-col

                items-center
                justify-center

                gap-3
              "
            >

              <span
                className="
                  text-gray-400
                  text-sm
                "
              >
                Command / Assistant Panel
              </span>


              {/* STATUS */}

              <span
                className="
                  text-gray-700
                  text-sm
                  font-medium
                "
              >
                {status}
              </span>

            </div>

          </div>


        </div>

      </div>

    </>
  );
}


export default App;