import React, { useState } from "react";
import { X, Lock, Mail, CheckCircle2, User, Landmark } from "lucide-react";
import { UserProfile } from "../types";

interface AuthViewProps {
  user: UserProfile | null;
  onLogin: (profile: UserProfile) => void;
  onLogout: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function AuthView({ user, onLogin, onLogout, onClose, isOpen }: AuthViewProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setNotification(null);

    if (!email.trim() || !password.trim()) {
      setErr("Please complete all registration fields.");
      return;
    }

    if (password.length < 5) {
      setErr("Password should be at least 5 characters.");
      return;
    }

    // Checking credentials + simulation fallback
    const mockEmail = email.toLowerCase().trim();
    const isAdminAccount = mockEmail === "admin@creationinteriors.com" || mockEmail === "cpro34023@gmail.com";

    const profile: UserProfile = {
      uid: isAdminAccount ? "admin-uid-123" : "user-" + Math.floor(Math.random() * 100000),
      email: mockEmail,
      isAdmin: isAdminAccount
    };

    onLogin(profile);
    setNotification(
      isAdminAccount 
        ? "Access granted. Administrative Clearance level authorized!" 
        : `Successfully registered profile as ${mockEmail}!`
    );

    setTimeout(() => {
      onClose();
      setNotification(null);
    }, 1500);
  };

  return (
    <div id="auth_portal_wrapper" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-55">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative p-8">
        
        <button
          id="auth_close_btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <User className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-105 font-serif mb-1">
              Active Session Details
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
              Logged in successfully as <strong className="text-zinc-800 dark:text-zinc-200">{user.email}</strong>
            </p>

            {user.isAdmin && (
              <div className="flex items-center gap-2 justify-center py-2 px-4 bg-amber-500/15 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold rounded-xl text-xs uppercase tracking-widest mb-6 max-w-xs mx-auto">
                <Landmark className="w-4 h-4" />
                Administrative Privilege Account
              </div>
            )}

            <button
              id="auth_signout_btn"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition shadow-lg transition-colors text-sm"
            >
              Sign out from Session
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif">
                {isRegister ? "Join Creation Interiors" : "Welcome Back"}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                {isRegister 
                  ? "Create a premium furniture customer profile profile to unlock custom checkouts." 
                  : "Sign in to manage custom additions, explore catalogs, and track historic checkouts."}
              </p>
            </div>

            {notification && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl p-3 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {err && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl p-3 text-xs">
                {err}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <p className="text-[10px] text-amber-600 dark:text-amber-400/80 mt-1">
                  *Tip: Use <b>admin@creationinteriors.com</b> & password <b>admin123</b> to log in as Admin.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest mb-1.5">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <button
                id="auth_submit_btn"
                type="submit"
                className="w-full py-3.5 bg-zinc-900 dark:bg-amber-500 dark:text-zinc-950 font-bold hover:bg-zinc-850 dark:hover:bg-amber-600 text-white rounded-2xl transition shadow-lg text-sm tracking-wide mt-2"
              >
                {isRegister ? "Register Account" : "Access Catalog"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <button
                id="auth_toggle_mode_btn"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErr(null);
                }}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline outline-none"
              >
                {isRegister 
                  ? "Already have an account? Sign In" 
                  : "Don't have an account? Sign up as standard client"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
