import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiHome, FiUser, FiGrid, FiMail } from "react-icons/fi";
import type { JSX } from "react";

gsap.registerPlugin(ScrollTrigger);

interface NavLinkItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

const links: NavLinkItem[] = [
  { name: "Home", path: "/", icon: <FiHome /> },
  { name: "About", path: "/about", icon: <FiUser /> },
  { name: "Projects", path: "/projects", icon: <FiGrid /> },
  { name: "Contact", path: "/contact", icon: <FiMail /> },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Disable scroll trigger on mobile
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        width: "50%",
        height: "50px",
        borderRadius: "999px",
        marginTop: "12px",
        backdropFilter: "blur(10px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=120",
          scrub: true,
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ================= TOP NAV (DESKTOP & MOBILE) ================= */}
      <nav
        ref={navRef}
        className="fixed top-4 z-50 transition-all w-full left-0 px-4 md:w-[92%] md:left-1/2 md:-translate-x-1/2 md:px-0"
      >
        <div
          className="
            h-13 backdrop-blur-[5px] px-6 md:px-10
            flex items-center justify-between
            rounded-full
            border border-(--border-light)
            bg-(--bg-main)/80
            shadow-lg
          "
        >
          {/* LOGO */}
          <Link to="/">
            <h1 className="text-sm md:text-base font-semibold tracking-wide cursor-pointer">
              PAUL HERE
            </h1>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
            {links.map((link) => (
              <li
                key={link.name}
                className="relative h-6 overflow-hidden group"
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block transition-transform duration-500 ease-out
                    ${isActive ? "text-(--accent-primary)" : ""}`
                  }
                >
                  <span className="block group-hover:-translate-y-full transition-transform duration-500">
                    {link.name}
                  </span>
                  <span
                    className="
                      block absolute inset-0 translate-y-full
                      group-hover:translate-y-0 transition-transform duration-500
                      text-(--accent-primary)
                    "
                    aria-hidden
                  >
                    {link.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* THEME TOGGLE */}
          <ThemeToggle />
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav
        className="
          fixed bottom-4 left-1/2 -translate-x-1/2 z-50
          w-[92%] md:hidden
        "
      >
        <div
          className="
            h-14            flex items-center justify-around
            rounded-full
            border border-(--border-light)
            bg-(--bg-main)/90
            backdrop-blur-md
            shadow-lg
          "
        >
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `
                flex items-center justify-center
                text-xl transition-colors duration-300
                ${
                  isActive
                    ? "text-(--accent-primary)"
                    : "text-(--text-main) opacity-70"
                }
              `
              }
            >
              {link.icon}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
