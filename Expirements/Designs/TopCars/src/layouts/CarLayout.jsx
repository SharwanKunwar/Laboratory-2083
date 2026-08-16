import { Outlet, useNavigate } from "react-router-dom";
import { CarFront, Menu, X } from "lucide-react";
import { useState } from "react";

function CarLayout() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goHome = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <main className="w-full h-screen overflow-hidden text-[#161513] p-2 sm:p-3 md:p-4">

      <div className="flex flex-col md:flex-row w-full h-full gap-2 sm:gap-3">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <aside
          className={`
            w-full md:w-[260px]
            shrink-0
            bg-[#161513]
            text-[#f3f2ee]
            rounded-xl md:rounded-2xl
            p-4 sm:p-5 md:p-6
            flex flex-col
            transition-all duration-300
            ${
              mobileMenuOpen
                ? "h-auto"
                : "h-[76px] md:h-full"
            }
          `}
        >

          {/* =================================================
              TOP / LOGO
          ================================================== */}

          <div className="flex items-center justify-between">

            <button
              onClick={goHome}
              className="text-left"
            >

              <div className="flex items-center gap-2 mb-1">

                <span className="w-2 h-2 rounded-full bg-[#e8432f]" />

                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8a887f]">
                  Showroom
                </span>

              </div>

              <div className="flex items-center gap-2">

                <CarFront
                  size={20}
                  className="sm:w-[22px] sm:h-[22px]"
                />

                <h1
                  className="text-[22px] sm:text-[26px] md:text-[28px] leading-none font-extrabold uppercase"
                  style={{
                    letterSpacing: "-0.02em",
                  }}
                >
                  TopCars
                </h1>

              </div>

              {/* Desktop description */}

              <p className="hidden md:block text-[13px] text-[#8a887f] mt-2">
                Curated inventory, updated daily.
              </p>

            </button>

            {/* Mobile menu button */}

            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="md:hidden w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
              aria-label="Toggle navigation"
            >

              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}

            </button>

          </div>

          {/* =================================================
              MOBILE MENU
          ================================================== */}

          <div
            className={`
              md:hidden
              overflow-hidden
              transition-all duration-300
              ${
                mobileMenuOpen
                  ? "max-h-40 opacity-100 mt-5"
                  : "max-h-0 opacity-0"
              }
            `}
          >

            <nav className="space-y-1">

              <button
                onClick={goHome}
                className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] text-[#c9c6ba] hover:bg-white/5 transition-colors"
              >
                All Cars
              </button>

            </nav>

            <div className="mt-4 pt-4 border-t border-white/10">

              <p className="text-[10px] text-[#6d6b62]">
                Every listing verified on delivery.
              </p>

            </div>

          </div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="hidden md:block space-y-2 mt-8">

            <button
              onClick={goHome}
              className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] text-[#c9c6ba] hover:bg-white/5 transition-colors"
            >
              All Cars
            </button>

          </nav>

          {/* =================================================
              DESKTOP FOOTER
          ================================================== */}

          <div className="hidden md:block mt-auto pt-8 border-t border-white/10">

            <p className="text-[11px] text-[#6d6b62] leading-relaxed">
              Every listing verified on delivery.
              Financing available at checkout.
            </p>

          </div>

        </aside>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="flex-1 min-w-0 min-h-0 h-full overflow-y-auto bg-[#f3f2ee] rounded-xl md:rounded-2xl hide-scrollbar p-2 sm:p-3 md:p-4">

          <Outlet />

        </section>

      </div>

    </main>
  );
}

export default CarLayout;