export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  placeholder: string;
  color: string;
  glowColor: string;
  iconPath: string; // SVG path
}

export interface ProfileTheme {
  id: string;
  name: string;
  primaryGlow: string;
  secondaryGlow: string;
  tertiaryGlow: string;
  cardBorder: string;
  textGradient: string;
  badgeBg: string;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  avatarText: string;
  avatarUrl: string;
  themeId: string;
  links: SocialLink[];
}
