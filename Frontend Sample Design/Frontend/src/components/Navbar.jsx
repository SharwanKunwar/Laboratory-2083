import { motion } from "motion/react";
import { useEffect, useState } from "react";

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
            className="sticky top-0 mx-auto  z-50 bg-white/30  backdrop-blur-md h-16.25 border border-white/30 flex items-center justify-center">

            <div className="flex justify-between items-center w-full h-full gap-8 px-2 ">
                <div className="bg-red-400 w-12.5 h-12.5 rounded-full"></div>
                <div className="bg-gray-50 w-[50%] h-12.5 rounded-full"></div>
            </div>

        </motion.nav>
    );
}

export default Navbar;