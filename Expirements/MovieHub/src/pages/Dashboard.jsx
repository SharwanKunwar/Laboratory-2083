
function Dashboard() {
    return (
        <>
            <div className="bg-red-400 w-full h-full flex">
                {/* left box  */}
                <div className="bg-yellow-400 w-[25%]">
                    box left
                </div>

                {/* // right box */}
                <div className="bg-blue-400 w-[75%]">
                    <div className="bg-green-400 w-full h-[400px]">slider </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard