import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen md:px-10 flex justify-center items-center w-full bg-linear-to-br from-fuchsia-600 via-purple-600 to-indigo-600 scrollbar-hide">

      <div className="w-full min-h-[2000px] bg-white/30 backdrop-blur-sm mb-5 shadow-sm border-t-0 border border-gray-50/30 rounded-b-lg relative ">
        <Navbar />
        <div className=" w-full h-screen  flex justify-center items-center">
          quotes are apper here
        </div>
      </div>
    </div>
  );
}

export default App;