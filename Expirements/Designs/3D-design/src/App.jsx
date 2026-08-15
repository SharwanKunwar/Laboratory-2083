import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Dog from "./components/Dog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: "01",
    image: "tommorwland",
    year: "2020 — ONGOING",
    category: "Digital Experience",
    title: "Tomorrowland",
    description:
      "An immersive digital experience built around music, movement and visual storytelling.",
  },
  {
    id: "02",
    image: "navy",
    year: "2020 — ONGOING",
    category: "Interactive Installation",
    title: "Navy Pier",
    description:
      "A digital experience transforming one of Chicago's most recognizable landmarks.",
  },
  {
    id: "03",
    image: "msi",
    year: "2020 — ONGOING",
    category: "Web Experience",
    title: "MSI Chicago",
    description:
      "Technology and storytelling come together to create an experimental museum experience.",
  },
  {
    id: "04",
    image: "phone",
    year: "2020 — ONGOING",
    category: "Creative Technology",
    title: "This Was Louise's Phone",
    description:
      "A digital story exploring memory, technology and the traces people leave behind.",
  },
  {
    id: "05",
    image: "kikk",
    year: "2018",
    category: "Festival",
    title: "KIKK Festival",
    description:
      "A playful interactive identity created for one of Europe's most experimental digital festivals.",
  },
  {
    id: "06",
    image: "kennedy",
    year: "2020 — ONGOING",
    category: "Cultural Experience",
    title: "The Kennedy Center",
    description:
      "A digital interpretation of culture, performance and contemporary technology.",
  },
  {
    id: "07",
    image: "opera",
    year: "2020 — ONGOING",
    category: "Digital Art",
    title: "Royal Opera of Wallonia",
    description:
      "A visual experience blending classical performance with modern digital interaction.",
  },
];

const services = [
  {
    number: "01",
    title: "Creative Development",
    text: "Websites and digital experiences designed around strong ideas instead of templates.",
  },
  {
    number: "02",
    title: "3D & WebGL",
    text: "Interactive 3D worlds, WebGL experiments and real-time visual experiences.",
  },
  {
    number: "03",
    title: "Motion Design",
    text: "Motion systems that give digital products rhythm, personality and emotion.",
  },
  {
    number: "04",
    title: "Creative Technology",
    text: "We combine design, code and emerging technology to create unusual experiences.",
  },
];

function App() {
  const appRef = useRef(null);
  const cursorRef = useRef(null);
  const projectImageRef = useRef(null);
  const projectImageInnerRef = useRef(null);
  const projectNameRef = useRef(null);
  const projectCategoryRef = useRef(null);
  const projectCounterRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        /* --------------------------------
           HERO
        -------------------------------- */

        const heroTl = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        heroTl
          .from(".hero-kicker", {
            y: 30,
            opacity: 0,
            duration: 1,
          })
          .from(
            ".hero-title-line span",
            {
              yPercent: 110,
              opacity: 0,
              duration: 1.2,
              stagger: 0.08,
            },
            "-=.7"
          )
          .from(
            ".hero-description",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
            },
            "-=.7"
          )
          .from(
            ".hero-bottom",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
            },
            "-=.5"
          );

        /* --------------------------------
           NAV
        -------------------------------- */

        gsap.from(".main-nav", {
          y: -30,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });

        /* --------------------------------
           SCROLL PROGRESS
        -------------------------------- */

        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        /* --------------------------------
           HERO PARALLAX
        -------------------------------- */

        gsap.to(".hero-content", {
          yPercent: 25,
          opacity: 0.35,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        /* --------------------------------
           PROJECT SECTION
        -------------------------------- */

        gsap.from(".projects-heading", {
          y: 80,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top 80%",
          },
        });

        gsap.utils.toArray(".project-row").forEach((row, index) => {
          gsap.from(row, {
            y: 70,
            opacity: 0,
            duration: 1,
            delay: index * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            },
          });
        });

        /* --------------------------------
           SERVICES
        -------------------------------- */

        gsap.from(".services-heading", {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
          },
        });

        gsap.utils.toArray(".service-row").forEach((row) => {
          gsap.from(row, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
            },
          });
        });

        /* --------------------------------
           ABOUT
        -------------------------------- */

        gsap.from(".about-big-text", {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
          },
        });

        gsap.from(".about-copy", {
          y: 60,
          opacity: 0,
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 60%",
          },
        });

        /* --------------------------------
           CONTACT
        -------------------------------- */

        gsap.from(".contact-title span", {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 70%",
          },
        });

        /* --------------------------------
           PROJECT HOVER
        -------------------------------- */

        const rows = document.querySelectorAll(".project-row");

        rows.forEach((row) => {
          const imageName = row.getAttribute("data-image");
          const title = row.getAttribute("data-title");
          const category = row.getAttribute("data-category");
          const number = row.getAttribute("data-number");

          const enter = () => {
            projectImageInnerRef.current.src =
              `/background/${imageName}.png`;

            projectNameRef.current.textContent = title;
            projectCategoryRef.current.textContent = category;
            projectCounterRef.current.textContent = number;

            gsap.killTweensOf([
              projectImageRef.current,
              projectImageInnerRef.current,
            ]);

            gsap.to(projectImageRef.current, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            });

            gsap.fromTo(
              projectImageInnerRef.current,
              {
                scale: 1.12,
              },
              {
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
              }
            );
          };

          const leave = () => {
            gsap.to(projectImageRef.current, {
              autoAlpha: 0,
              scale: 0.95,
              duration: 0.35,
              ease: "power3.out",
            });
          };

          row.addEventListener("mouseenter", enter);
          row.addEventListener("mouseleave", leave);
        });

        /* --------------------------------
           MAGNETIC BUTTONS
        -------------------------------- */

        const magneticElements = document.querySelectorAll(
          ".magnetic"
        );

        magneticElements.forEach((element) => {
          const move = (event) => {
            const rect = element.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            gsap.to(element, {
              x: x * 0.2,
              y: y * 0.2,
              duration: 0.4,
              ease: "power3.out",
            });
          };

          const leave = () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)",
            });
          };

          element.addEventListener("mousemove", move);
          element.addEventListener("mouseleave", leave);
        });

        /* --------------------------------
           CURSOR
        -------------------------------- */

        const cursor = cursorRef.current;

        const mouseMove = (event) => {
          gsap.to(cursor, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.5,
            ease: "power3.out",
          });
        };

        window.addEventListener("mousemove", mouseMove);

        const interactiveElements =
          document.querySelectorAll(
            "a, button, .project-row, .menu-button"
          );

        interactiveElements.forEach((element) => {
          element.addEventListener("mouseenter", () => {
            gsap.to(cursor, {
              scale: 2.5,
              duration: 0.3,
            });
          });

          element.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
              scale: 1,
              duration: 0.3,
            });
          });
        });

        return () => {
          window.removeEventListener("mousemove", mouseMove);

          rows.forEach((row) => {
            row.replaceWith(row.cloneNode(true));
          });
        };
      }, appRef);

      return () => ctx.revert();
    },
    { scope: appRef }
  );

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={appRef} className="site">

      {/* --------------------------------
          CURSOR
      -------------------------------- */}

      <div ref={cursorRef} className="custom-cursor">
        <span></span>
      </div>

      {/* --------------------------------
          SCROLL PROGRESS
      -------------------------------- */}

      <div className="scroll-progress"></div>

      {/* --------------------------------
          FIXED BACKGROUND IMAGES
      -------------------------------- */}

      <div className="project-preview">
        {projects.map((project) => (
          <img
            key={project.id}
            id={project.image}
            src={`/background/${project.image}.png`}
            alt=""
          />
        ))}
      </div>

      {/* --------------------------------
          THREE CANVAS
      -------------------------------- */}

      <Canvas
        id="canvas-elem"
        camera={{
          position: [0, 0, 0.8],
          fov: 45,
        }}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <Dog />
      </Canvas>

      <main>

        {/* --------------------------------
            NAV
        -------------------------------- */}

        <nav className="main-nav">

          <a href="#top" className="logo magnetic">
            <span>STUDIO</span>
            <span>01 / 07</span>
          </a>

          <div className="nav-center">
            <span>Creative Technology</span>
            <span>Digital Experiences</span>
          </div>

          <a href="#contact" className="menu-button magnetic">
            <span>Let's Talk</span>
            <i className="ri-arrow-right-up-line"></i>
          </a>

        </nav>

        {/* --------------------------------
            HERO
        -------------------------------- */}

        <section id="top" className="hero">

          <div className="hero-content">

            <div className="hero-kicker">
              <span className="status-dot"></span>
              Independent creative studio
            </div>

            <h1 className="hero-title">

              <div className="hero-title-line">
                <span>WE MAKE</span>
              </div>

              <div className="hero-title-line hero-title-outline">
                <span>DIGITAL</span>
              </div>

              <div className="hero-title-line">
                <span>EXPERIENCES.</span>
              </div>

            </h1>

            <div className="hero-description">

              <p>
                We combine design, code, motion and
                technology to create digital experiences
                people remember.
              </p>

              <a href="#projects" className="circle-link magnetic">
                <span>Explore</span>
                <i className="ri-arrow-down-line"></i>
              </a>

            </div>

          </div>

          <div className="hero-bottom">

            <div className="hero-scroll">
              <span>Scroll to explore</span>
              <div className="scroll-line"></div>
            </div>

            <div className="hero-location">
              <span>06°N</span>
              <span>27°E</span>
            </div>

            <div className="hero-index">
              <span>SCROLL</span>
              <strong>01</strong>
            </div>

          </div>

          <div className="hero-grid"></div>

        </section>

        {/* --------------------------------
            INTRO
        -------------------------------- */}

        <section className="intro-section">

          <div className="intro-number">
            (01)
          </div>

          <div className="intro-main">

            <p className="intro-label">
              A SMALL STUDIO WITH BIG IDEAS
            </p>

            <h2>
              WE BUILD
              <br />
              <span>THINGS THAT MOVE.</span>
            </h2>

            <div className="intro-footer">

              <p>
                From interactive websites to immersive
                installations, we turn ideas into digital
                experiences with personality.
              </p>

              <div className="intro-arrow">
                <i className="ri-arrow-down-right-line"></i>
              </div>

            </div>

          </div>

        </section>

        {/* --------------------------------
            PROJECTS
        -------------------------------- */}

        <section
          id="projects"
          className="projects-section"
        >

          <div className="projects-heading">

            <div>
              <span className="section-label">
                Selected work
              </span>

              <h2>
                PROJECTS
              </h2>
            </div>

            <div className="project-heading-meta">
              <span>2018 — 2026</span>
              <span>07 PROJECTS</span>
            </div>

          </div>

          <div className="projects-list">

            {projects.map((project) => (
              <div
                key={project.id}
                className="project-row"
                data-image={project.image}
                data-title={project.title}
                data-category={project.category}
                data-number={project.id}
              >

                <div className="project-number">
                  {project.id}
                </div>

                <div className="project-title">
                  <h3>{project.title}</h3>
                  <span>{project.category}</span>
                </div>

                <div className="project-year">
                  {project.year}
                </div>

                <div className="project-arrow">
                  <i className="ri-arrow-right-up-line"></i>
                </div>

              </div>
            ))}

          </div>

          {/* Hover image */}

          <div
            ref={projectImageRef}
            className="project-hover-image"
          >

            <img
              ref={projectImageInnerRef}
              src="/background/tommorwland.png"
              alt=""
            />

            <div className="project-hover-overlay">

              <div>
                <span ref={projectCategoryRef}>
                  Digital Experience
                </span>

                <h3 ref={projectNameRef}>
                  Tomorrowland
                </h3>
              </div>

              <strong ref={projectCounterRef}>
                01
              </strong>

            </div>

          </div>

        </section>

        {/* --------------------------------
            SERVICES
        -------------------------------- */}

        <section className="services-section">

          <div className="services-heading">

            <div>
              <span className="section-label">
                What we do
              </span>

              <h2>
                OUR
                <br />
                <span>CRAFT.</span>
              </h2>
            </div>

            <p>
              Strategy, design and technology
              working together as one.
            </p>

          </div>

          <div className="services-list">

            {services.map((service) => (
              <div
                className="service-row"
                key={service.number}
              >

                <span className="service-number">
                  {service.number}
                </span>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.text}
                </p>

                <span className="service-icon">
                  <i className="ri-arrow-right-up-line"></i>
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* --------------------------------
            ABOUT
        -------------------------------- */}

        <section className="about-section">

          <div className="about-top">

            <span className="section-label">
              About the studio
            </span>

            <span>
              (02)
            </span>

          </div>

          <div className="about-big-text">

            <h2>
              CODE
              <br />
              <span>MEETS</span>
              <br />
              CULTURE.
            </h2>

          </div>

          <div className="about-bottom">

            <div className="about-copy">

              <p className="large-copy">
                We believe the best digital work
                lives somewhere between art,
                technology and culture.
              </p>

              <p>
                Our approach is simple: start with
                a strong idea, obsess over the details,
                and use technology to make something
                that feels impossible to ignore.
              </p>

            </div>

            <div className="about-stats">

              <div>
                <strong>07</strong>
                <span>SELECTED PROJECTS</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>IDEAS</span>
              </div>

              <div>
                <strong>01</strong>
                <span>STUDIO</span>
              </div>

            </div>

          </div>

        </section>

        {/* --------------------------------
            MARQUEE
        -------------------------------- */}

        <section className="marquee-section">

          <div className="marquee">
            <span>
              DESIGN • CODE • MOTION • 3D • WEBGL •
              DIGITAL EXPERIENCE •
            </span>

            <span>
              DESIGN • CODE • MOTION • 3D • WEBGL •
              DIGITAL EXPERIENCE •
            </span>
          </div>

        </section>

        {/* --------------------------------
            CONTACT
        -------------------------------- */}

        <section
          id="contact"
          className="contact-section"
        >

          <div className="contact-top">

            <span className="section-label">
              Have an idea?
            </span>

            <span>
              (03)
            </span>

          </div>

          <div className="contact-title">

            <div>
              <span>LET'S MAKE</span>
            </div>

            <div className="outline">
              <span>SOMETHING</span>
            </div>

            <div>
              <span>GOOD.</span>
            </div>

          </div>

          <div className="contact-bottom">

            <p>
              Got a weird idea?
              <br />
              Good. We like weird.
            </p>

            <a
              href="mailto:hello@studio.com"
              className="contact-button magnetic"
            >
              <span>hello@studio.com</span>
              <i className="ri-arrow-right-up-line"></i>
            </a>

          </div>

        </section>

        {/* --------------------------------
            FOOTER
        -------------------------------- */}

        <footer>

          <div className="footer-logo">
            STUDIO<span>®</span>
          </div>

          <div className="footer-links">

            <a href="#top">Instagram</a>
            <a href="#top">Behance</a>
            <a href="#top">LinkedIn</a>

          </div>

          <div className="footer-right">
            <span>© 2026</span>
            <span>Built with curiosity.</span>
          </div>

        </footer>

      </main>

    </div>
  );
}

export default App;