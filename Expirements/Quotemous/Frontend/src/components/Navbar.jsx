import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiMenuLine, RiDrawLine } from "@remixicon/react";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.nav
            animate={{
                width: scrolled ? "90%" : "100%",
                y: scrolled ? 10 : 0,
                borderRadius: scrolled ? 100 : 0,
                boxShadow: scrolled
                    ? "0px 4px 10px rgba(0,0,0,0.2)"
                    : "none",
            }}
            transition={{
                duration: 0.3, ease: "easeInOut",
            }}
            className="sticky top-0 mx-auto  z-50 bg-white/30 backdrop-blur-2xl h-16.25 border border-white/30 flex items-center justify-center">

            {/* inside div boxes  */}
            <div className="flex justify-between items-center w-full h-full gap-8 px-2 ">
                {/* left  */}
                <div className=" w-[30%] h-full flex justify-start items-center">
                    <div className="bg-white/30 border border-white/30 w-12.5 h-12.5 rounded-full flex justify-center items-center backdrop-blur-2xl text-white"><RiDrawLine /></div>
                    <h1 className="font-medium text-xl text-shadow-sm ml-3 md:block hidden">UnpredictableXCoder</h1>
                </div>
                {/* right  */}
                <div className=" w-[70%] h-full flex justify-end items-center gap-5">

                    <div className="bg-white/30 border border-white/30 backdrop-blur-md w-[50%] h-12.5 rounded-full md:flex items-center justify-center px-6 hidden">
                        <nav className="flex items-center gap-10 text-md  text-black">
                            <a href="#home" className="hover:text-white hover:text-shadow-sm transition-colors duration-300">
                                Home
                            </a>

                            <a href="#about" className="hover:text-white hover:text-shadow-sm transition-colors duration-300">
                                About
                            </a>

                            <a href="#projects" className="hover:text-white hover:text-shadow-sm transition-colors duration-300">
                                Projects
                            </a>

                            <a href="#skills" className="hover:text-white hover:text-shadow-sm transition-colors duration-300">
                                Skills
                            </a>

                            <a href="#contact" className="hover:text-white hover:text-shadow-sm transition-colors duration-300">
                                Contact
                            </a>
                        </nav>
                    </div>

                    <div className=" w-[20%] h-12.5 rounded-full md:flex justify-end items-center hidden ">
                        <div className="w-full h-12.5 flex items-center justify-center gap-4  ">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-indigo-400 transition-all duration-300"
                            >
                                <FaFacebookF size={18} />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <FaGithub size={20} />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-indigo-400 transition-all duration-300"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="md:hidden bg-gray-50/30 backdrop-blur-2xl border border-white/30 shadow-sm w-12.5 h-12.5 rounded-full flex justify-center items-center"><RiMenuLine /></div>
                </div>
            </div>

        </motion.nav>
    );
}

export default Navbar;