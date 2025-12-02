"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
  CogIcon,
  HeartIcon,
  HandRaisedIcon,
  DocumentCheckIcon,
  BuildingOffice2Icon,
  UserIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type Theme = "light" | "dark" | "system";

const Navber = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("theme", theme);

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System theme
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-dropdown]")) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon className="w-5 h-5" />;
      case "dark":
        return <MoonIcon className="w-5 h-5" />;
      default:
        return <ComputerDesktopIcon className="w-5 h-5" />;
    }
  };

  const dropdownItems = {
    about: [
      {
        name: "Our Activities",
        href: "/about",
        icon: BookOpenIcon,
        description:
          "View reports, photos, and stories from Gulshan Society's activities and initiatives.",
      },
      {
        name: "Mission & Vision",
        href: "/about/mission",
        icon: GlobeAltIcon,
        description:
          "Read about our guiding principles, objectives, and vision for the future.",
      },
      {
        name: "Previous EC's",
        href: "/about/previous-ec",
        icon: UserGroupIcon,
        description:
          "See the list of earlier Executive Committee members who led the society.",
      },
      // {
      //   name: "History",
      //   href: "/about/history",
      //   icon: ClockIcon,
      //   description:
      //     "Explore our foundation, mileposts, and the legacy of the organization.",
      // },
    ],
    membership: [
      {
        name: "Member List",
        href: "/member-list",
        icon: UsersIcon,
        description:
          "View comprehensive list of all registered society members.",
      },
      {
        name: "Membership Registration",
        href: "/membership-form",
        icon: UserPlusIcon,
        description:
          "Register yourself or your family as members of the society.",
      },
      {
        name: "Member Services",
        href: "/member-services",
        icon: CogIcon,
        description:
          "Access various resources and privileges exclusive to members.",
      },
      {
        name: "Non-member Services",
        href: "/non-member-services",
        icon: UserIcon,
        description:
          "Service information open for non-members and general community.",
      },
      {
        name: "Code of Conduct",
        href: "/code-of-conduct",
        icon: DocumentCheckIcon,
        description: "Rules and guidelines for all members and stakeholders.",
      },
      // {
      //   name: "Departed Members",
      //   href: "/departed-member",
      //   icon: IdentificationIcon,
      //   description:
      //     "Honoring the memory of those who were part of our community.",
      // },
    ],
    services: [
      {
        name: "All Services",
        href: "/services",
        icon: HeartIcon,
        description:
          "Browse the full range of services Gulshan Society offers.",
      },
      
      {
        name: "Car Sticker Application",
        href: "/services/car-registration",
        icon: HandRaisedIcon,
        description: "Apply for a car sticker to access the residential area.",
      },
      {
        name: "Adopt a Road",
        href: "/services/Adopt-a-Road",
        icon: BuildingOffice2Icon,
        description: "Adopt a road to maintain and keep it clean.",
      },
      {
        name: "Adopt a Gate",
        href: "/services/Adopt-a-Gate",
        icon: QuestionMarkCircleIcon,
        description: "Adopt a gate to maintain and keep it secure.",
      }
    ],
  };

  const toggleDropdown = (dropdown: string | null) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
            >
              <Image
                src="/Gulshan-Society-Logo.webp"
                alt="Gulshan Society"
                width={80}
                height={80}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            {/* About Dropdown */}
            <div className="relative group" data-dropdown>
              <button
                onClick={() => toggleDropdown("about")}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                <span>About</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "about" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "about" && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 backdrop-blur-sm">
                  {dropdownItems.about.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start space-x-3 px-4 py-3 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-primary-600 dark:focus:text-primary-400 active:bg-blue-50 dark:active:bg-blue-900/20 active:text-primary-600 dark:active:text-primary-400 transition-all duration-200 group rounded-lg mx-2"
                        onClick={closeDropdowns}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-400 group-focus:text-primary dark:group-focus:text-primary-400 group-active:text-primary dark:group-active:text-primary-400 transition-colors duration-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-400 group-focus:text-primary dark:group-focus:text-primary-400 group-active:text-primary dark:group-active:text-primary-400 transition-colors duration-200">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Membership Dropdown */}
            <div className="relative group" data-dropdown>
              <button
                onClick={() => toggleDropdown("membership")}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                <span>Member Directory</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "membership" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "membership" && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 backdrop-blur-sm">
                  {dropdownItems.membership.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start space-x-3 px-4 py-3 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-primary-600 dark:focus:text-primary-400 active:bg-blue-50 dark:active:bg-blue-900/20 active:text-primary-600 dark:active:text-primary-400 transition-all duration-200 group rounded-lg mx-2"
                        onClick={closeDropdowns}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-400 group-focus:text-primary dark:group-focus:text-primary-400 group-active:text-primary dark:group-active:text-primary-400 transition-colors duration-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-400 group-focus:text-primary dark:group-focus:text-primary-400 group-active:text-primary dark:group-active:text-primary-400 transition-colors duration-200">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative group" data-dropdown>
              <button
                onClick={() => toggleDropdown("services")}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                <span>Services</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 backdrop-blur-sm">
                  {dropdownItems.services.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start space-x-3 px-4 py-3 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-primary-600 dark:focus:text-primary-400 active:bg-blue-50 dark:active:bg-blue-900/20 active:text-primary-600 dark:active:text-primary-400 transition-all duration-200 group rounded-lg mx-2"
                        onClick={closeDropdowns}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <IconComponent className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-focus:text-primary-600 dark:group-focus:text-primary-400 group-active:text-primary-600 dark:group-active:text-primary-400 transition-colors duration-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-focus:text-primary-600 dark:group-focus:text-primary-400 group-active:text-primary-600 dark:group-active:text-primary-400 transition-colors duration-200">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/media-page"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Media
            </Link>
            <Link
              href="/event-page"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors duration-200"
              title={`Current theme: ${theme}`}
            >
              {getThemeIcon()}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {getThemeIcon()}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 max-h-screen overflow-y-auto">
              {/* Mobile Dropdown Menus */}
              <Link
                href="/"
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 focus:text-primary dark:focus:text-primary-400 active:text-primary dark:active:text-primary-400 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 rounded-md transition-all duration-200"
              >
                Home
              </Link>
              <div className="space-y-2">
                {/* About Mobile */}
                <div>
                  <button
                    onClick={() =>
                      toggleDropdown(
                        activeDropdown === "about" ? null : "about"
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 focus:text-primary dark:focus:text-primary-400 active:text-primary dark:active:text-primary-400 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 rounded-md transition-all duration-200"
                  >
                    About
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "about" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "about" && (
                    <div className="pl-4 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-lg mx-2 my-2 p-2 shadow-sm">
                      {dropdownItems.about.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start space-x-3 px-3 py-2 text-sm hover:text-primary dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:text-primary dark:focus:text-primary-400 focus:bg-gray-100 dark:focus:bg-gray-600 active:text-primary dark:active:text-primary-400 active:bg-gray-100 dark:active:bg-gray-600 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-primary-500 focus:border-primary-500 focus:outline-none group"
                            onClick={() => {
                              setIsMenuOpen(false);
                              closeDropdowns();
                            }}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-400 transition-colors duration-200" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Membership Mobile */}
                <div>
                  <button
                    onClick={() =>
                      toggleDropdown(
                        activeDropdown === "membership" ? null : "membership"
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:text-primary-600 dark:focus:text-primary-400 active:text-primary-600 dark:active:text-primary-400 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 rounded-md transition-all duration-200"
                  >
                    Member Directory
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "membership" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "membership" && (
                    <div className="pl-4 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-lg mx-2 my-2 p-2 shadow-sm">
                      {dropdownItems.membership.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start space-x-3 px-3 py-2 text-sm hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:text-primary-600 dark:focus:text-primary-400 focus:bg-gray-100 dark:focus:bg-gray-600 active:text-primary-600 dark:active:text-primary-400 active:bg-gray-100 dark:active:bg-gray-600 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-primary-500 focus:border-primary-500 focus:outline-none group"
                            onClick={() => {
                              setIsMenuOpen(false);
                              closeDropdowns();
                            }}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Services Mobile */}
                <div>
                  <button
                    onClick={() =>
                      toggleDropdown(
                        activeDropdown === "services" ? null : "services"
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:text-primary-600 dark:focus:text-primary-400 active:text-primary-600 dark:active:text-primary-400 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 rounded-md transition-all duration-200"
                  >
                    Services
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === "services" && (
                    <div className="pl-4 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-lg mx-2 my-2 p-2 shadow-sm">
                      {dropdownItems.services.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start space-x-3 px-3 py-2 text-sm hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:text-primary-600 dark:focus:text-primary-400 focus:bg-gray-100 dark:focus:bg-gray-600 active:text-primary-600 dark:active:text-primary-400 active:bg-gray-100 dark:active:bg-gray-600 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-primary-500 focus:border-primary-500 focus:outline-none group"
                            onClick={() => {
                              setIsMenuOpen(false);
                              closeDropdowns();
                            }}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Direct Links Mobile */}
                <Link
                  href="/media-page"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:text-primary-600 dark:focus:text-primary-400 focus:bg-gray-50 dark:focus:bg-gray-700 active:text-primary-600 dark:active:text-primary-400 active:bg-gray-50 dark:active:bg-gray-700 rounded-md transition-all duration-200 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Media
                </Link>
                <Link
                  href="/event-page"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:text-primary-600 dark:focus:text-primary-400 focus:bg-gray-50 dark:focus:bg-gray-700 active:text-primary-600 dark:active:text-primary-400 active:bg-gray-50 dark:active:bg-gray-700 rounded-md transition-all duration-200 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:text-primary-600 dark:focus:text-primary-400 focus:bg-gray-50 dark:focus:bg-gray-700 active:text-primary-600 dark:active:bg-blue-400 active:bg-gray-50 rounded-md transition-all duration-200 focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {/* {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-50 dark:bg-gray-800 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )} */}
    </nav>
  );
};

export default Navber;
