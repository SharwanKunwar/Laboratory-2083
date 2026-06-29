import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Link, Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

        <div className="w-[97%] h-[95%]  bg-blue-400/80 rounded-lg shadow-md backdrop-blur-2xl flex justify-center items-center gap-5">
          <div className="w-[300px] h-[500px] bg-white/80 rounded-lg shadow-md backdrop-blur-2xl flex justify-center items-center p-0">

            <div className="w-full h-full flex flex-col border border-gray-300 justify-center items-center gap-3 bg-slate-500 overflow-y-auto py-40px rounded-lg shadow-md backdrop-blur-2xl hide-scrollbar pt-40px">

              <Link to="/login3" className="w-full flex justify-center ">
                <button className="bg-gray-50 border border-gray-300 w-[90%] font-bold py-3 rounded-md">LoginPageTest01</button>
              </Link>


            </div>

          </div>

          <div className="w-[700px] h-[500px] bg-white/80 rounded-lg shadow-md backdrop-blur-2xl flex justify-center items-center">
            <Outlet />
          </div>

        </div>

      </div>

    </>
  )
}

export default App
