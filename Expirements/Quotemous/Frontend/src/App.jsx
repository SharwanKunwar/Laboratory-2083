import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center w-full bg-gray-50 md:px-5 scrollbar-hide">

      <div className="w-[100%] min-h-[2000px] bg-sky-400 rounded-b-lg mb-5 relative ">
        <Navbar />
        <div className="bg-red-400 w-full h-screen">
          box
        </div>
      </div>
    </div>
  );
}

export default App;