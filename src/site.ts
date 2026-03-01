/**
 * Single source of truth for site identity and hero content.
 * Imported by: Base.astro, Hero.astro, og-image.png.ts
 *
 * Changing kicker or name here updates the hero, OG image, and any other consumer.
 */

export const site = {
  // Identity
  name:          "Eric Qiu",
  nameFirst:     "Eric",
  nameLast:      "Qiu.",   // period is intentional — matches the italic hero treatment
  domain:        "ericqiu.dev",
  url:           "https://ericqiu.dev",

  // Hero kicker — shown in hero and OG image
  kicker:        "Software Engineer // Coffee Addict // New York City",

  // Hero body copy
  bio:           "I build distributed systems and cloud infrastructure at Bloomberg. University of Waterloo CS. Previously at Addepar, Postmates, and BMO Capital Markets.",
  bioAside:      "Outside work: pour over coffee, a Fujifilm X100VI, and whatever book is currently face-down on my desk.",

  // SEO / meta
  pageTitle:     "Eric Qiu — Senior Software Engineer",
  ogTitle:       "Eric Qiu — Software Engineer | New York City",
  description:   "Senior Software Engineer at Bloomberg building distributed systems and managed services cloud infrastructure. University of Waterloo CS. Based in New York City.",
  twitterHandle: "@itsericqiu",

  // Footer bio
  footerBio:     "From Hamilton, Ontario — University of Waterloo CS grad, now based in New York City. I build distributed systems at Bloomberg and spend my evenings with a camera or chasing a good pour over.",
} as const;
