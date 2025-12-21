import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false); // Mobile toggle

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <header className="backdrop-blur-xl bg-green-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 rounded-xl border border-green-300 shadow-inner 
                          flex items-center justify-center overflow-hidden group-hover:scale-105 
                          transition-transform">
            <img
              src="/src/assets/logo.png"
              alt="SmartAgri Logo"
              className="w-full h-full"
            />
          </div>

          <div>
            <div className="font-extrabold text-slate-900 text-xl tracking-tight">
              Smart<span className="text-emerald-600">Agri</span>
            </div>
            <div className="text-xs font-medium text-slate-500">
              Agriculture Portal
            </div>
          </div>
        </Link>

        {/* Hamburger for Mobile */}
        <button
          className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-600 transition-all duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {!auth.token ? (
            <>
              <Link
                className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 
                           rounded-xl hover:bg-slate-50 transition-all duration-300"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-green-600 
                           text-white rounded-xl shadow-md shadow-emerald-500/30 
                           hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-105 
                           transition-all duration-300"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {auth.role === "farmer" && (
                <>
                  <Link
                    className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 
                               rounded-xl hover:bg-slate-50 transition-all duration-300"
                    to="/request"
                  >
                    Request
                  </Link>
                  <Link
                    className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 
                               rounded-xl hover:bg-slate-50 transition-all duration-300"
                    to="/status"
                  >
                    My Requests
                  </Link>
                </>
              )}

              {auth.role === "admin" && (
                <Link
                  className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 
                             rounded-xl hover:bg-slate-50 transition-all duration-300"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              )}

              <span className="text-sm text-slate-800 font-bold ml-2 bg-gradient-to-r from-slate-100 to-slate-50 
                              px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                {auth.name}
              </span>

              <button
                onClick={handleLogout}
                className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                           text-white text-sm font-semibold shadow-md shadow-red-500/30 
                           hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl px-6 pb-6 border-t border-slate-200/60 shadow-xl">

          {!auth.token ? (
            <div className="flex flex-col gap-3 pt-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 
                         hover:text-emerald-600 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white 
                         font-bold rounded-xl shadow-md shadow-emerald-500/30 text-center
                         hover:shadow-lg hover:shadow-emerald-500/40 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">

              {auth.role === "farmer" && (
                <>
                  <Link
                    to="/request"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 
                             hover:text-emerald-600 transition-all duration-300"
                  >
                    Request
                  </Link>
                  <Link
                    to="/status"
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 
                             hover:text-emerald-600 transition-all duration-300"
                  >
                    My Requests
                  </Link>
                </>
              )}

              {auth.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 
                           hover:text-emerald-600 transition-all duration-300"
                >
                  Admin Dashboard
                </Link>
              )}

              <span className="px-4 py-3 text-slate-800 font-bold bg-gradient-to-r from-slate-100 to-slate-50 
                              rounded-xl border border-slate-200 shadow-sm">
                {auth.name}
              </span>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                           text-white text-sm font-semibold shadow-md shadow-red-500/30 
                           hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
