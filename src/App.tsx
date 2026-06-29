import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Settings, 
  Sparkles, 
  Save, 
  Eye, 
  Heart, 
  X, 
  ChevronRight, 
  Image as ImageIcon, 
  User, 
  Link2, 
  Undo,
  MessageSquare,
  Share2,
  Trash2,
  Plus,
  Lock,
  Unlock,
  Key,
  EyeOff,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { SocialLink, ProfileTheme, UserProfile } from './types';

// Precise custom SVG paths for social media platforms
const PLATFORM_ICONS = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  reddit: "M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-.54 1.026c.41.393.766.862 1.05 1.4a5.05 5.05 0 01-.4 5.922 4.88 4.88 0 01-2.91 1.446c-.053 1.341-1.127 2.4-2.464 2.4a2.44 2.44 0 01-2.435-2.436c-.495-.015-.992-.061-1.485-.14a4.98 4.98 0 01-3.65-2.73 4.9 4.9 0 01-.22-3.46c.28-.54.64-.01.95-.4a1.25 1.25 0 01-.54-1.028c0-.688.562-1.25 1.25-1.25.438 0 .825.228 1.05.572.93-.578 2.05-.935 3.25-.995l.69-3.11c.045-.2.24-.325.435-.285l2.25.5a1 1 0 11-.12 1.98l-1.81-.4-.53 2.37c1.15.08 2.22.44 3.12 1l1.05-.53zm-1.89 4.926c-.456 0-.825.37-.825.826 0 .456.37.825.825.825.457 0 .826-.37.826-.825s-.37-.826-.826-.826zm-6.24 0c-.456 0-.825.37-.825.826 0 .456.37.825.825.825s.826-.37.826-.825c0-.457-.37-.826-.826-.826zm3.12 4.368c1.373 0 2.484-.536 2.484-1.2s-1.11-1.2-2.484-1.2c-1.374 0-2.484.536-2.484 1.2s1.11 1.2 2.484 1.2z",
  discord: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  telegram: "M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.93 9.09c-.14.65-.53.81-1.08.5l-2.94-2.17-1.42 1.37c-.16.16-.29.29-.59.29l.21-3.01 5.48-4.95c.24-.22-.05-.34-.37-.13l-6.78 4.27-2.92-.91c-.64-.2-.65-.64.13-.94l11.39-4.39c.53-.19.99.13.83.95z"
};

// Available platform presets for adding links easily
const BRAND_PRESETS = [
  {
    id: "instagram",
    name: "Instagram",
    color: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    glowColor: "rgba(238, 42, 123, 0.35)",
    iconPath: PLATFORM_ICONS.instagram,
    placeholder: "https://instagram.com/username"
  },
  {
    id: "reddit",
    name: "Reddit",
    color: "from-[#FF4500] to-[#FF5700]",
    glowColor: "rgba(255, 69, 0, 0.35)",
    iconPath: PLATFORM_ICONS.reddit,
    placeholder: "https://reddit.com/user/username"
  },
  {
    id: "discord",
    name: "Discord",
    color: "from-[#5865F2] to-[#404eed]",
    glowColor: "rgba(88, 101, 242, 0.35)",
    iconPath: PLATFORM_ICONS.discord,
    placeholder: "https://discord.gg/invite-code"
  },
  {
    id: "github",
    name: "GitHub",
    color: "from-[#111111] via-[#24292e] to-[#3f4448]",
    glowColor: "rgba(255, 255, 255, 0.15)",
    iconPath: PLATFORM_ICONS.github,
    placeholder: "https://github.com/username"
  },
  {
    id: "telegram",
    name: "Telegram",
    color: "from-[#229ED9] to-[#24A1DE]",
    glowColor: "rgba(36, 161, 222, 0.35)",
    iconPath: PLATFORM_ICONS.telegram,
    placeholder: "https://t.me/username"
  },
  {
    id: "twitter",
    name: "Twitter / X",
    color: "from-[#0f1419] to-[#24292e]",
    glowColor: "rgba(255, 255, 255, 0.15)",
    iconPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    placeholder: "https://twitter.com/username"
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "from-[#FF0000] to-[#CC0000]",
    glowColor: "rgba(255, 0, 0, 0.35)",
    iconPath: "M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.528 3.5 12 3.5 12 3.5s-7.528 0-9.388.555A3.002 3.002 0 00.5 6.163C0 8.028 0 12 0 12s0 3.972.5 5.837a3.003 3.003 0 002.11 2.108c1.86.555 9.388.555 9.388.555s7.528 0 9.388-.555a3.002 3.002 0 002.11-2.108C24 15.972 24 12 24 12s0-3.972-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    placeholder: "https://youtube.com/c/channelname"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "from-[#0A66C2] to-[#0077B5]",
    glowColor: "rgba(10, 102, 194, 0.35)",
    iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z",
    placeholder: "https://linkedin.com/in/username"
  },
  {
    id: "spotify",
    name: "Spotify",
    color: "from-[#1DB954] to-[#191414]",
    glowColor: "rgba(29, 185, 84, 0.35)",
    iconPath: "M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.352-.676.463-1.028.247-2.837-1.733-6.407-2.126-10.612-1.168-.404.092-.812-.162-.904-.565-.093-.404.162-.813.566-.905 4.61-1.054 8.552-.61 11.732 1.336.352.215.463.676.246 1.028l-.001-.073zm1.465-3.263c-.27.44-.847.584-1.287.313-3.248-1.996-8.2-2.576-12.033-1.41-.497.15-1.022-.132-1.173-.63-.15-.497.133-1.022.63-1.172 4.385-1.33 9.835-.683 13.55 1.597.44.27.585.848.313 1.287v.015zm.126-3.39c-3.894-2.313-10.312-2.525-14.067-1.385-.597.18-1.226-.153-1.408-.75-.18-.598.152-1.227.75-1.41 4.316-1.31 11.4-1.07 15.897 1.6 1.135.674 1.507 2.12 1.514 2.12.673 1.133-.77 2.515-1.91 1.914l.224.085z",
    placeholder: "https://open.spotify.com/user/username"
  },
  {
    id: "portfolio",
    name: "Website",
    color: "from-[#06B6D4] to-[#3B82F6]",
    glowColor: "rgba(6, 182, 212, 0.35)",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    placeholder: "https://kunal.live"
  }
];

const THEMES: ProfileTheme[] = [
  {
    id: "cosmic-nebula",
    name: "Cosmic Nebula",
    primaryGlow: "rgba(99, 102, 241, 0.45)", // Indigo
    secondaryGlow: "rgba(168, 85, 247, 0.45)", // Purple
    tertiaryGlow: "rgba(6, 182, 212, 0.45)", // Cyan
    cardBorder: "border-indigo-500/20 hover:border-indigo-500/40",
    textGradient: "from-indigo-400 via-purple-400 to-cyan-400",
    badgeBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
  },
  {
    id: "sunset-lava",
    name: "Sunset Lava",
    primaryGlow: "rgba(244, 63, 94, 0.45)", // Rose
    secondaryGlow: "rgba(249, 115, 22, 0.45)", // Orange
    tertiaryGlow: "rgba(234, 179, 8, 0.45)", // Yellow
    cardBorder: "border-rose-500/20 hover:border-rose-500/40",
    textGradient: "from-rose-400 via-orange-400 to-yellow-400",
    badgeBg: "bg-rose-500/10 border-rose-500/20 text-rose-300"
  },
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    primaryGlow: "rgba(20, 184, 166, 0.45)", // Teal
    secondaryGlow: "rgba(16, 185, 129, 0.45)", // Emerald
    tertiaryGlow: "rgba(132, 204, 22, 0.45)", // Lime
    cardBorder: "border-teal-500/20 hover:border-teal-500/40",
    textGradient: "from-teal-400 via-emerald-400 to-lime-400",
    badgeBg: "bg-teal-500/10 border-teal-500/20 text-teal-300"
  },
  {
    id: "electric-cyber",
    name: "Electric Cyber",
    primaryGlow: "rgba(236, 72, 153, 0.45)", // Pink
    secondaryGlow: "rgba(217, 70, 239, 0.45)", // Fuchsia
    tertiaryGlow: "rgba(147, 51, 234, 0.45)", // Purple
    cardBorder: "border-pink-500/20 hover:border-pink-500/40",
    textGradient: "from-pink-400 via-fuchsia-400 to-purple-400",
    badgeBg: "bg-pink-500/10 border-pink-500/20 text-pink-300"
  }
];

const DEFAULT_PROFILE: UserProfile = {
  name: "Kunal",
  title: "Creative Developer & Technologist",
  bio: "Building clean digital solutions, studying micro-interaction animations, and drinking black coffee. Welcome to my social universe!",
  avatarText: "K",
  avatarUrl: "",
  themeId: "cosmic-nebula",
  links: [
    {
      id: "instagram",
      name: "Instagram",
      handle: "@xz.kunal",
      url: "https://www.instagram.com/xz.kunal?igsh=MW1kYjVwZnh6MjY2",
      placeholder: "https://instagram.com/username",
      color: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      glowColor: "rgba(238, 42, 123, 0.35)",
      iconPath: PLATFORM_ICONS.instagram
    },
    {
      id: "reddit",
      name: "Reddit",
      handle: "u/kunal_7883",
      url: "https://www.reddit.com/u/kunal_7883/s/44St2QHPaY",
      placeholder: "https://reddit.com/user/username",
      color: "from-[#FF4500] to-[#FF5700]",
      glowColor: "rgba(255, 69, 0, 0.35)",
      iconPath: PLATFORM_ICONS.reddit
    },
    {
      id: "discord",
      name: "Discord",
      handle: "kunalmohanta.",
      url: "https://discord.com/users/kunalmohanta.",
      placeholder: "Discord Server link or username",
      color: "from-[#5865F2] to-[#404eed]",
      glowColor: "rgba(88, 101, 242, 0.35)",
      iconPath: PLATFORM_ICONS.discord
    },
    {
      id: "github",
      name: "GitHub",
      handle: "Kunal123a",
      url: "https://github.com/Kunal123a",
      placeholder: "https://github.com/username",
      color: "from-[#111111] via-[#24292e] to-[#3f4448]",
      glowColor: "rgba(255, 255, 255, 0.15)",
      iconPath: PLATFORM_ICONS.github
    },
    {
      id: "telegram",
      name: "Telegram",
      handle: "@xzkunal",
      url: "https://t.me/xzkunal",
      placeholder: "https://t.me/username",
      color: "from-[#229ED9] to-[#24A1DE]",
      glowColor: "rgba(36, 161, 222, 0.35)",
      iconPath: PLATFORM_ICONS.telegram
    }
  ]
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kunal_profile_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.links && parsed.links.length > 0) {
          // If the cached links have the old placeholder URL, migrate them to the new verified links
          const hasOldPlaceholder = parsed.links.some((l: any) => l.url && l.url.includes('instagram.com/kunal'));
          if (hasOldPlaceholder) {
            parsed.links = DEFAULT_PROFILE.links;
            localStorage.setItem('kunal_profile_data', JSON.stringify(parsed));
          }
          return parsed;
        }
      } catch (e) {
        console.error("Error reading saved profile data", e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLinkIndex, setCopiedLinkIndex] = useState<number | null>(null);

  // --- Admin Login System states ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('kunal_admin_logged_in') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('kunal_admin_password') || 'Kunal123@';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // States to change password inside admin panel
  const [newPasswordVal, setNewPasswordVal] = useState<string>('');
  const [isChangingPass, setIsChangingPass] = useState<boolean>(false);

  // State to support adding new custom handles
  const [isAddingLink, setIsAddingLink] = useState<boolean>(false);
  const [newLinkBrand, setNewLinkBrand] = useState<typeof BRAND_PRESETS[0]>(BRAND_PRESETS[0]);
  const [newLinkHandle, setNewLinkHandle] = useState<string>('');
  const [newLinkUrl, setNewLinkUrl] = useState<string>('');
  const [customBrandName, setCustomBrandName] = useState<string>('');

  // Auto-save profile changes to localStorage
  useEffect(() => {
    localStorage.setItem('kunal_profile_data', JSON.stringify(profile));
  }, [profile]);

  // Toast trigger helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentTheme = THEMES.find(t => t.id === profile.themeId) || THEMES[0];

  const handleCopyHandle = (handle: string, index: number) => {
    navigator.clipboard.writeText(handle);
    setCopiedLinkIndex(index);
    showToast(`Copied handle "${handle}" to clipboard!`);
    setTimeout(() => setCopiedLinkIndex(null), 2000);
  };

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Profile link copied! Share it anywhere.");
  };

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all handles and styling to original defaults?")) {
      setProfile(DEFAULT_PROFILE);
      showToast("Reset to pristine gradient portfolio defaults!");
    }
  };

  // Safe links updates
  const updateLinkDetail = (id: string, key: 'handle' | 'url', value: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, [key]: value } : l)
    }));
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('kunal_admin_logged_in', 'true');
      setLoginError(null);
      setPasswordInput('');
      showToast("🛡️ Admin authenticated successfully!");
    } else {
      setLoginError("Invalid admin security passphrase. Try again!");
      // Trigger a light shake
      setTimeout(() => setLoginError(null), 3000);
    }
  };

  // Logout handler
  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kunal_admin_logged_in');
    setActiveTab('preview');
    showToast("Logged out of Admin Session.");
  };

  // Save new password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordVal.trim()) {
      showToast("Password cannot be blank!");
      return;
    }
    setAdminPassword(newPasswordVal);
    localStorage.setItem('kunal_admin_password', newPasswordVal);
    setNewPasswordVal('');
    setIsChangingPass(false);
    showToast("🔒 Admin password updated successfully!");
  };

  // Add Link Handler
  const handleAddNewLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkHandle.trim() || !newLinkUrl.trim()) {
      showToast("Please provide both a handle label and a valid link URL.");
      return;
    }

    const finalName = newLinkBrand.id === 'custom' ? (customBrandName.trim() || 'Custom') : newLinkBrand.name;
    const finalId = `${newLinkBrand.id}-${Date.now()}`;

    const newLinkItem: SocialLink = {
      id: finalId,
      name: finalName,
      handle: newLinkHandle,
      url: newLinkUrl,
      placeholder: newLinkBrand.placeholder,
      color: newLinkBrand.color,
      glowColor: newLinkBrand.glowColor,
      iconPath: newLinkBrand.iconPath
    };

    setProfile(prev => ({
      ...prev,
      links: [...prev.links, newLinkItem]
    }));

    // Reset Form
    setNewLinkHandle('');
    setNewLinkUrl('');
    setCustomBrandName('');
    setIsAddingLink(false);
    showToast(`✨ Added "${finalName}" to your active links!`);
  };

  // Remove Link Handler
  const handleRemoveLink = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove your "${name}" handle?`)) {
      setProfile(prev => ({
        ...prev,
        links: prev.links.filter(l => l.id !== id)
      }));
      showToast(`Removed "${name}" handle.`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070c] text-slate-100 flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden select-none">
      
      {/* 🔮 TRENDING MESH GRADIENT GLOW BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glowing Blob 1 */}
        <motion.div 
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -90, 80, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[35rem] h-[35rem] rounded-full blur-[100px] opacity-35"
          style={{ backgroundColor: currentTheme.primaryGlow }}
        />
        
        {/* Glowing Blob 2 */}
        <motion.div 
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 90, -90, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-35"
          style={{ backgroundColor: currentTheme.secondaryGlow }}
        />

        {/* Glowing Blob 3 */}
        <motion.div 
          animate={{
            x: [0, 120, -100, 0],
            y: [0, 50, 110, 0],
            scale: [0.9, 1.1, 0.85, 0.9],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-[110px] opacity-20"
          style={{ backgroundColor: currentTheme.tertiaryGlow }}
        />
      </div>

      {/* 🚀 TOAST NOTIFICATION CONTAINER */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-50 px-5 py-3 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-3 text-sm text-slate-200"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚡ HEADER NAVIGATION */}
      <header className="w-full max-w-xl z-20 flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
            kunalsocialhub.live
          </span>
          {isAuthenticated && (
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-md px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase">
              Admin
            </span>
          )}
        </div>

        {/* Live Preview / Customize Links Switches */}
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-white/10 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'edit'
                ? 'bg-white/10 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Admin Config
          </button>
        </div>
      </header>

      {/* 🌌 MAIN INTERACTIVE WORKSPACE */}
      <main className="w-full max-w-xl z-10 flex-grow flex flex-col justify-center my-4">
        <AnimatePresence mode="wait">
          
          {/* ================= PREVIEW PORTFOLIO MODE ================= */}
          {activeTab === 'preview' && (
            <motion.div
              key="preview-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <div className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                
                {/* Highlight Glow Lines */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                
                {/* Edit Trigger Fast Access */}
                <button 
                  onClick={() => setActiveTab('edit')}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                  title="Admin Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Profile Header Block */}
                <div className="flex flex-col items-center text-center">
                  
                  {/* Dynamic Glowing Avatar */}
                  <div className="relative mb-4 group/avatar">
                    {/* Ring Glow Background */}
                    <div className="absolute inset-0 rounded-full blur-xl opacity-80 group-hover/avatar:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
                    
                    <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
                      {profile.avatarUrl ? (
                        <img 
                          src={profile.avatarUrl} 
                          alt={profile.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-full bg-slate-900"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white font-display font-bold text-3xl tracking-tight">
                          {profile.avatarText || "K"}
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1.5 border border-slate-900 shadow-lg flex items-center justify-center">
                      <Sparkles className="w-3 h-3 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Name Tag */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <h1 className={`font-display text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`}>
                      {profile.name}
                    </h1>
                  </div>

                  {/* Subtitle / Title Badge */}
                  <div className={`px-3.5 py-1 rounded-full text-xs font-mono font-medium border ${currentTheme.badgeBg} mb-4 uppercase tracking-wider`}>
                    {profile.title}
                  </div>

                  {/* Bio Description */}
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-sm mb-8">
                    {profile.bio}
                  </p>
                </div>

                {/* SOCIAL PLATFORMS LIST STACK */}
                <div className="space-y-4">
                  {profile.links.map((link, idx) => {
                    const iconPath = PLATFORM_ICONS[link.id as keyof typeof PLATFORM_ICONS] || link.iconPath || PLATFORM_ICONS.instagram;
                    return (
                      <motion.div
                        key={link.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="group/item relative"
                      >
                        {/* Subtle Custom Floating Glow behind card on hover */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none -z-10"
                          style={{
                            background: `linear-gradient(135deg, ${link.glowColor || 'rgba(255,255,255,0.1)'}, transparent)`,
                          }}
                        />

                        <div className="w-full bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-white/15 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 shadow-sm relative overflow-hidden backdrop-blur-sm">
                          
                          {/* Inner gradient indicator side pill */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${link.color}`} />

                          <div className="flex items-center gap-4 pl-1">
                            {/* SVG Brand Icon Container */}
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${link.color} p-[1px] flex items-center justify-center shadow-lg`}>
                              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center transition-colors group-hover/item:bg-transparent">
                                <svg 
                                  className="w-5 h-5 fill-current text-white" 
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d={iconPath} />
                                </svg>
                              </div>
                            </div>

                            {/* Details Text */}
                            <div className="text-left">
                              <h3 className="font-display font-semibold text-white group-hover/item:text-cyan-300 transition-colors">
                                {link.name}
                              </h3>
                              <p className="text-xs text-slate-400 group-hover/item:text-slate-300 font-mono transition-colors">
                                {link.handle || "@not_configured"}
                              </p>
                            </div>
                          </div>

                          {/* Action Controls */}
                          <div className="flex items-center gap-1">
                            {/* Copy button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyHandle(link.handle, idx);
                              }}
                              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                              title="Copy handle"
                            >
                              {copiedLinkIndex === idx ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            {/* External Visit Arrow Button */}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all flex items-center justify-center"
                              title={`Visit ${link.name}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>

                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {profile.links.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-sm text-slate-400">No social links configured yet.</p>
                      <button 
                        onClick={() => setActiveTab('edit')} 
                        className="mt-3 text-xs text-indigo-400 hover:underline font-mono"
                      >
                        + Access Admin Panel to Add Links
                      </button>
                    </div>
                  )}
                </div>

                {/* App Bottom Brand Credit */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-slate-500 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    <span>Designed for {profile.name}</span>
                  </div>
                  <button 
                    onClick={handleCopyProfileLink}
                    className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Hub</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* ================= CUSTOMIZE EDITOR MODE (WITH SECURE LOGIN) ================= */}
          {activeTab === 'edit' && (
            <motion.div
              key="edit-pane"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              
              {/* 🔒 IF NOT AUTHENTICATED: DISPLAY ADMIN AUTH LOCK SCREEN */}
              {!isAuthenticated ? (
                <div className="w-full bg-slate-900/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />
                  
                  <div className="flex flex-col items-center text-center max-w-sm mx-auto py-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 relative animate-pulse-slow">
                      <Lock className="w-7 h-7" />
                      <div className="absolute -inset-1 bg-indigo-500/20 rounded-2xl blur-md -z-10" />
                    </div>

                    <h2 className="font-display font-bold text-2xl text-white tracking-tight mb-2">
                      Admin Authorization
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                      Authorize below using your security passphrase to add, remove, and sort social handles.
                    </p>

                    <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 hover:border-white/20 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest text-center"
                          placeholder="Enter Admin Passphrase"
                          autoFocus
                        />
                        <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white transition-colors cursor-pointer"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                      </div>

                      {loginError && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-400 flex items-center gap-2"
                        >
                          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                          <span>{loginError}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm hover:from-indigo-600 hover:to-purple-700 shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <Unlock className="w-4 h-4" />
                        Unlock Dashboard
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                
                /* 🛡️ IF AUTHENTICATED: DISPLAY ADMIN CONTROL DASHBOARD */
                <div className="w-full bg-slate-900/85 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl relative">
                  
                  {/* Dashboard header controls */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h2 className="font-display font-semibold text-base text-white leading-none">
                          Admin Dashboard
                        </h2>
                        <span className="text-[10px] font-mono text-emerald-400">Authenticated Session</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleAdminLogout}
                        className="text-[11px] text-slate-400 hover:text-rose-400 font-mono flex items-center gap-1.5 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                        title="Logout Admin Session"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                      <button
                        onClick={() => setActiveTab('preview')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* SCROLLABLE FORM CONTROLS */}
                  <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-1">
                    
                    {/* section 1: Bio Branding */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        Branding & Profile Info
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name input */}
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">Profile Name</label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Your Name"
                          />
                        </div>
                        
                        {/* Custom Title tag */}
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">Profile Title Tag</label>
                          <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile(p => ({ ...p, title: e.target.value }))}
                            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Creative Developer"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Avatar Initials text */}
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">Avatar Initials (if no image)</label>
                          <input
                            type="text"
                            maxLength={3}
                            value={profile.avatarText}
                            onChange={(e) => setProfile(p => ({ ...p, avatarText: e.target.value }))}
                            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="K"
                          />
                        </div>

                        {/* Avatar Image URL */}
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">Avatar Image URL (Optional)</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={profile.avatarUrl}
                              onChange={(e) => setProfile(p => ({ ...p, avatarUrl: e.target.value }))}
                              className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="https://images.unsplash.com/..."
                            />
                            <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                          </div>
                        </div>
                      </div>

                      {/* Bio slogan input */}
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Short Slogan / Bio</label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                          className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none h-20"
                          placeholder="Write a brief intro..."
                        />
                      </div>
                    </div>

                    {/* section 2: Profile gradient theme select */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        Choose Background Glow Vibe
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {THEMES.map(theme => {
                          const isSelected = profile.themeId === theme.id;
                          return (
                            <button
                              key={theme.id}
                              onClick={() => setProfile(p => ({ ...p, themeId: theme.id }))}
                              className={`p-3.5 rounded-2xl bg-slate-950/60 border text-left transition-all cursor-pointer ${
                                isSelected 
                                  ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]' 
                                  : 'border-white/5 hover:border-white/15'
                              }`}
                            >
                              <span className="block text-xs font-semibold text-white mb-2">{theme.name}</span>
                              <div className="flex gap-1.5">
                                <span className="w-4 h-4 rounded-full blur-[2px]" style={{ backgroundColor: theme.primaryGlow }} />
                                <span className="w-4 h-4 rounded-full blur-[2px]" style={{ backgroundColor: theme.secondaryGlow }} />
                                <span className="w-4 h-4 rounded-full blur-[2px]" style={{ backgroundColor: theme.tertiaryGlow }} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* section 3: Links manager with ADD and REMOVE */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                          Manage Social Handles
                        </h3>
                        
                        {/* Toggle Add link form */}
                        <button
                          onClick={() => setIsAddingLink(!isAddingLink)}
                          className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/20 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Link
                        </button>
                      </div>

                      {/* --- ADD NEW HANDLE DRAWER FORM --- */}
                      <AnimatePresence>
                        {isAddingLink && (
                          <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleAddNewLink}
                            className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 space-y-4 overflow-hidden"
                          >
                            <h4 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest flex items-center justify-between">
                              <span>✨ Configure New Link</span>
                              <button 
                                type="button" 
                                onClick={() => setIsAddingLink(false)}
                                className="text-slate-500 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </h4>

                            {/* select platform preset buttons */}
                            <div>
                              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                                Choose Brand Preset
                              </label>
                              <div className="grid grid-cols-5 gap-2 max-h-24 overflow-y-auto p-1 bg-slate-950 rounded-xl border border-white/5">
                                {BRAND_PRESETS.map((brand) => (
                                  <button
                                    key={brand.id}
                                    type="button"
                                    onClick={() => {
                                      setNewLinkBrand(brand);
                                      setNewLinkUrl(brand.placeholder);
                                    }}
                                    className={`p-2 rounded-lg flex flex-col items-center justify-center text-[10px] border font-medium transition-all cursor-pointer ${
                                      newLinkBrand.id === brand.id 
                                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                                    }`}
                                  >
                                    <span className="text-xs mb-0.5">{brand.name.split(' ')[0]}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Handle / Name Label</label>
                                <input
                                  type="text"
                                  value={newLinkHandle}
                                  onChange={(e) => setNewLinkHandle(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                                  placeholder="@kunal_clicks or username"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Destination URL</label>
                                <input
                                  type="text"
                                  value={newLinkUrl}
                                  onChange={(e) => setNewLinkUrl(e.target.value)}
                                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                                  placeholder={newLinkBrand.placeholder}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setIsAddingLink(false)}
                                className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white text-xs cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3.5 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs shadow-md cursor-pointer flex items-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                Save Handle
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>

                      {/* --- LIST OF SOCIAL HANDLES --- */}
                      <div className="space-y-4">
                        {profile.links.map((link) => {
                          const iconPath = PLATFORM_ICONS[link.id as keyof typeof PLATFORM_ICONS] || link.iconPath || PLATFORM_ICONS.instagram;
                          return (
                            <div 
                              key={link.id}
                              className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 space-y-3 relative group/edititem"
                            >
                              {/* Remove/Delete button top right */}
                              <button
                                onClick={() => handleRemoveLink(link.id, link.name)}
                                className="absolute top-3.5 right-3.5 p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                                title={`Delete ${link.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                              <div className="flex items-center gap-2 pb-1 border-b border-white/5 mr-10">
                                <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${link.color} p-[1px] flex items-center justify-center`}>
                                  <div className="w-full h-full bg-slate-950 rounded-md flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                                      <path d={iconPath} />
                                    </svg>
                                  </div>
                                </div>
                                <span className="font-display font-medium text-sm text-white">
                                  {link.name} Link Config
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mr-10">
                                {/* Handle text */}
                                <div>
                                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Handle Name / Label</label>
                                  <input
                                    type="text"
                                    value={link.handle}
                                    onChange={(e) => updateLinkDetail(link.id, 'handle', e.target.value)}
                                    className="w-full bg-slate-950/80 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                    placeholder={link.placeholder}
                                  />
                                </div>

                                {/* Destination URL */}
                                <div>
                                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Destination URL</label>
                                  <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateLinkDetail(link.id, 'url', e.target.value)}
                                    className="w-full bg-slate-950/80 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                    placeholder={link.placeholder}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* section 4: SECURITY PASSWORD MANAGER PANEL */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-rose-400" />
                          Security & Auth Passphrase
                        </h3>
                        <button
                          onClick={() => setIsChangingPass(!isChangingPass)}
                          className="text-xs text-indigo-400 hover:underline"
                        >
                          {isChangingPass ? "Cancel" : "Change Admin Passphrase"}
                        </button>
                      </div>

                      {isChangingPass && (
                        <form onSubmit={handleUpdatePassword} className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-3">
                          <label className="block text-[11px] font-medium text-slate-400">
                            New Administrative Passphrase
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newPasswordVal}
                              onChange={(e) => setNewPasswordVal(e.target.value)}
                              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono flex-grow"
                              placeholder="Type new password"
                            />
                            <button
                              type="submit"
                              className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium cursor-pointer"
                            >
                              Update Key
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-500 block">
                            Once updated, your browser will persist your passphrase. Note it down!
                          </span>
                        </form>
                      )}
                    </div>

                    {/* reset defaults link */}
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>Restoring pristine template:</span>
                      <button
                        onClick={handleResetToDefault}
                        className="text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Undo className="w-3.5 h-3.5" />
                        Reset Profile
                      </button>
                    </div>

                  </div>

                  {/* Save details & Close Footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setActiveTab('preview');
                        showToast("Your stylish profile changes are live!");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm hover:from-indigo-600 hover:to-purple-700 shadow-lg cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save & Preview Profile
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 🔮 ELEGANT MINIMALIST PROFILE FOOTER */}
      <footer className="w-full max-w-xl z-20 text-center text-slate-600 text-[11px] tracking-wide font-mono mt-4 pt-4 border-t border-white/5">
        &copy; {new Date().getFullYear()} Kunal &bull; Dynamic Gradient Bio Hub &bull; Made with React
      </footer>

    </div>
  );
}
