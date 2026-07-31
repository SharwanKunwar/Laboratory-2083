
function App() {
  return (
    <>
      <div className="w-screen h-screen bg-black  flex items-center justify-center">
        <div className="w-[97%] h-[95%]  bg-gray-50/70 backdrop-blur-md rounded-lg shadow-lg flex items-center justify-center">
          {/* rigth box  */}
          <div className="w-full h-full rounded-l-lg overflow-hidden">

          </div>
          {/* left box  */}
          <div className=" h-full bg-gray-50 rounded-r-lg">
            {/* box1-top */}
            <div className=" "><video src="./video/v01.mp4" autoPlay loop muted ></video></div>
            {/* box2-bottom */}
            <div className="border border-green-400">bottom</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
