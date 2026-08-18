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
                duration: 0.3,
                ease: "easeInOut",
            }}
            className="sticky top-0 mx-auto  z-50 bg-gray-100/80 backdrop-blur-md h-[65px] border border-white/30 flex items-center justify-center"
        >
            <div className="flex items-center gap-8">
                <span className="font-bold">Logo</span>
                <span>Home</span>
                <span>Projects</span>
                <span>About</span>
            </div>
        </motion.nav>
    );
}

export default Navbar;