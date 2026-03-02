/**
 * _lab-palettes.js — Single source of truth for all palette token data.
 *
 * Exposes window.LAB with:
 *   LAB.palettes      — object keyed by palette ID → token map
 *   LAB.paletteOptions — array of { v, label, group } for <select> menus
 *   LAB.presets        — named section-level palette presets
 *
 * Every palette token map contains:
 *   bg, bg2, text, text2, muted,
 *   accent, accentLight, accentDark,
 *   accent2, accent2Light, accent2Dark,
 *   border, borderS, nav
 *
 * accent     — structural accent: section labels, links, focus rings
 * accent2    — editorial accent: kicker, dates
 * accentLight — lighter/accessible variant (the other-mode value for std palettes)
 * accentDark  — darker hover variant (set to accent as placeholder where not refined)
 *
 * Used by: palette-sections.html, palette-preview.html, palette-multicolour.html
 */

window.LAB = window.LAB || {};

/* ── Palette tokens ─────────────────────────────────────────────────────── */
LAB.palettes = {

  /* ── Standard Light ── */
  'amber-light':    { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7E5F28',  accentLight:'#D4A574', accentDark:'#6A5020', accent2:'#7E5F28',  accent2Light:'#D4A574', accent2Dark:'#6A5020', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'forest-light':   { bg:'#F1F3EE', bg2:'#E5EBE0', text:'#0F1A0C', text2:'#3A5432', muted:'#7A8A74', accent:'#2D5A27',  accentLight:'#6AAE5A', accentDark:'#2D5A27', accent2:'#2D5A27',  accent2Light:'#6AAE5A', accent2Dark:'#2D5A27', border:'#C8D4C0', borderS:'#90A888', nav:'rgba(241,243,238,0.92)' },
  'ink-light':      { bg:'#F0F2F5', bg2:'#E2E8F0', text:'#0A1628', text2:'#3A5070', muted:'#7A8A9A', accent:'#1B4080',  accentLight:'#5B8DB5', accentDark:'#1B4080', accent2:'#1B4080',  accent2Light:'#5B8DB5', accent2Dark:'#1B4080', border:'#C4CDD8', borderS:'#90A0B8', nav:'rgba(240,242,245,0.92)' },
  'clay-light':     { bg:'#F5EDE6', bg2:'#EEE0D4', text:'#1A0A06', text2:'#5A3020', muted:'#8A7068', accent:'#8B3A2A',  accentLight:'#C47860', accentDark:'#8B3A2A', accent2:'#8B3A2A',  accent2Light:'#C47860', accent2Dark:'#8B3A2A', border:'#DEC9BC', borderS:'#B09080', nav:'rgba(245,237,230,0.92)' },
  'slate-light':    { bg:'#F0EFF0', bg2:'#E4E4E8', text:'#141418', text2:'#484854', muted:'#8A8A94', accent:'#4A5568',  accentLight:'#8A9AB8', accentDark:'#4A5568', accent2:'#4A5568',  accent2Light:'#8A9AB8', accent2Dark:'#4A5568', border:'#D0D0D4', borderS:'#A0A0AC', nav:'rgba(240,239,240,0.92)' },
  'burgundy-light': { bg:'#F5EFF0', bg2:'#EEE4E8', text:'#140608', text2:'#503040', muted:'#8A6870', accent:'#7A1E30',  accentLight:'#C45A6E', accentDark:'#7A1E30', accent2:'#7A1E30',  accent2Light:'#C45A6E', accent2Dark:'#7A1E30', border:'#DEC4C8', borderS:'#B08090', nav:'rgba(245,239,240,0.92)' },

  /* ── Standard Dark ── */
  'amber-dark':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#D4A574',  accentLight:'#7E5F28', accentDark:'#B8915A', accent2:'#D4A574',  accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)'    },
  'forest-dark':    { bg:'#0A110A', bg2:'#111810', text:'#E8EDE6', text2:'#90A888', muted:'#5A7054', accent:'#6AAE5A',  accentLight:'#2D5A27', accentDark:'#6AAE5A', accent2:'#6AAE5A',  accent2Light:'#2D5A27', accent2Dark:'#6AAE5A', border:'#2A3E28', borderS:'#4A6840', nav:'rgba(10,17,10,0.92)'    },
  'ink-dark':       { bg:'#080E18', bg2:'#0C1420', text:'#E8EDF5', text2:'#98B0C8', muted:'#4A6080', accent:'#5B8DB5',  accentLight:'#1B4080', accentDark:'#5B8DB5', accent2:'#5B8DB5',  accent2Light:'#1B4080', accent2Dark:'#5B8DB5', border:'#1E2E48', borderS:'#3A5070', nav:'rgba(8,14,24,0.92)'     },
  'clay-dark':      { bg:'#110806', bg2:'#180E0A', text:'#F0E6E0', text2:'#C09080', muted:'#7A5A50', accent:'#C4664A',  accentLight:'#8B3A2A', accentDark:'#C4664A', accent2:'#C4664A',  accent2Light:'#8B3A2A', accent2Dark:'#C4664A', border:'#3A2018', borderS:'#5A3828', nav:'rgba(17,8,6,0.92)'      },
  'slate-dark':     { bg:'#0E0E12', bg2:'#141418', text:'#EEEEF2', text2:'#AAAAB8', muted:'#5A5A70', accent:'#8A9AB8',  accentLight:'#4A5568', accentDark:'#8A9AB8', accent2:'#8A9AB8',  accent2Light:'#4A5568', accent2Dark:'#8A9AB8', border:'#2A2A34', borderS:'#404054', nav:'rgba(14,14,18,0.92)'    },
  'burgundy-dark':  { bg:'#0E0608', bg2:'#160C0E', text:'#F0E8EA', text2:'#C09098', muted:'#7A4A54', accent:'#C45A6E',  accentLight:'#7A1E30', accentDark:'#C45A6E', accent2:'#C45A6E',  accent2Light:'#7A1E30', accent2Dark:'#C45A6E', border:'#3A1820', borderS:'#5A2832', nav:'rgba(14,6,8,0.92)'      },

  /* ── Signature (amber base + single accent colour) ── */
  'sig-verdigris':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A6B5E',  accentLight:'#7EC8B4', accentDark:'#2A6B5E', accent2:'#2A6B5E',  accent2Light:'#7EC8B4', accent2Dark:'#2A6B5E', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-forest':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2D4A3E',  accentLight:'#5A8A70', accentDark:'#2D4A3E', accent2:'#2D4A3E',  accent2Light:'#5A8A70', accent2Dark:'#2D4A3E', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-navy':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1B2D45',  accentLight:'#4A6880', accentDark:'#1B2D45', accent2:'#1B2D45',  accent2Light:'#4A6880', accent2Dark:'#1B2D45', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-oxide':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#8B3A2A',  accentLight:'#C47860', accentDark:'#8B3A2A', accent2:'#8B3A2A',  accent2Light:'#C47860', accent2Dark:'#8B3A2A', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-steel':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4A6580',  accentLight:'#7A98B0', accentDark:'#4A6580', accent2:'#4A6580',  accent2Light:'#7A98B0', accent2Dark:'#4A6580', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-prussian':   { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#0F3A5A',  accentLight:'#3A7098', accentDark:'#0F3A5A', accent2:'#0F3A5A',  accent2Light:'#3A7098', accent2Dark:'#0F3A5A', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-slate-teal': { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A5055',  accentLight:'#5A8898', accentDark:'#2A5055', accent2:'#2A5055',  accent2Light:'#5A8898', accent2Dark:'#2A5055', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-plum':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#5A2A4A',  accentLight:'#8A5878', accentDark:'#5A2A4A', accent2:'#5A2A4A',  accent2Light:'#8A5878', accent2Dark:'#5A2A4A', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-bronze':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7A4A18',  accentLight:'#B07848', accentDark:'#7A4A18', accent2:'#7A4A18',  accent2Light:'#B07848', accent2Dark:'#7A4A18', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-indigo':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A2870',  accentLight:'#5A5898', accentDark:'#2A2870', accent2:'#2A2870',  accent2Light:'#5A5898', accent2Dark:'#2A2870', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-hunter':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2B5235',  accentLight:'#5A8A62', accentDark:'#2B5235', accent2:'#2B5235',  accent2Light:'#5A8A62', accent2Dark:'#2B5235', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-sage':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4E6A55',  accentLight:'#80A888', accentDark:'#4E6A55', accent2:'#4E6A55',  accent2Light:'#80A888', accent2Dark:'#4E6A55', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-malachite':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1A7A56',  accentLight:'#4EAA82', accentDark:'#1A7A56', accent2:'#1A7A56',  accent2Light:'#4EAA82', accent2Dark:'#1A7A56', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-fern':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4D6B3C',  accentLight:'#7AA866', accentDark:'#4D6B3C', accent2:'#4D6B3C',  accent2Light:'#7AA866', accent2Dark:'#4D6B3C', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-cobalt':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1C3A82',  accentLight:'#4A70B8', accentDark:'#1C3A82', accent2:'#1C3A82',  accent2Light:'#4A70B8', accent2Dark:'#1C3A82', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-mauve':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7A4A68',  accentLight:'#B07898', accentDark:'#7A4A68', accent2:'#7A4A68',  accent2Light:'#B07898', accent2Dark:'#7A4A68', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  /* ── Bold Dark (colour-as-background) ── */
  'bold-bottle':    { bg:'#1C3A24', bg2:'#24462C', text:'#E4EDE6', text2:'#A8C8AC', muted:'#5A7A60', accent:'#7DC87A',  accentLight:'#4A9850', accentDark:'#7DC87A', accent2:'#7DC87A',  accent2Light:'#4A9850', accent2Dark:'#7DC87A', border:'#2E5038', borderS:'#4A7060', nav:'rgba(28,58,36,0.92)'    },
  'bold-ultra':     { bg:'#0F1E6A', bg2:'#182080', text:'#E8ECF8', text2:'#90AADC', muted:'#4A60A0', accent:'#90B4E8',  accentLight:'#5080C8', accentDark:'#90B4E8', accent2:'#90B4E8',  accent2Light:'#5080C8', accent2Dark:'#90B4E8', border:'#1E307A', borderS:'#3A5090', nav:'rgba(15,30,106,0.92)'   },
  'bold-teal':      { bg:'#082830', bg2:'#0C3840', text:'#DCF0F4', text2:'#80BCCC', muted:'#3A7088', accent:'#5AC8D8',  accentLight:'#2898A8', accentDark:'#5AC8D8', accent2:'#5AC8D8',  accent2Light:'#2898A8', accent2Dark:'#5AC8D8', border:'#124050', borderS:'#2A6070', nav:'rgba(8,40,48,0.92)'     },
  'bold-amber-wash':{ bg:'#5A3E14', bg2:'#6A4A1C', text:'#F5EAD8', text2:'#D4B080', muted:'#9A7848', accent:'#D4A574',  accentLight:'#B07840', accentDark:'#D4A574', accent2:'#D4A574',  accent2Light:'#B07840', accent2Dark:'#D4A574', border:'#7A5820', borderS:'#9A7840', nav:'rgba(90,62,20,0.92)'    },
  'bold-terra':     { bg:'#5A1E10', bg2:'#6A2818', text:'#F5E4DE', text2:'#D48878', muted:'#9A5848', accent:'#E8906A',  accentLight:'#C06040', accentDark:'#E8906A', accent2:'#E8906A',  accent2Light:'#C06040', accent2Dark:'#E8906A', border:'#7A3020', borderS:'#9A4838', nav:'rgba(90,30,16,0.92)'    },
  'bold-olive':     { bg:'#2A3018', bg2:'#343C20', text:'#EAECD8', text2:'#B0B888', muted:'#6A7848', accent:'#A8C86A',  accentLight:'#788840', accentDark:'#A8C86A', accent2:'#A8C86A',  accent2Light:'#788840', accent2Dark:'#A8C86A', border:'#3E4828', borderS:'#586038', nav:'rgba(42,48,24,0.92)'    },
  'bold-burg':      { bg:'#3A0818', bg2:'#481020', text:'#F5E0E4', text2:'#D888A0', muted:'#8A4858', accent:'#E87888',  accentLight:'#B84060', accentDark:'#E87888', accent2:'#E87888',  accent2Light:'#B84060', accent2Dark:'#E87888', border:'#5A1828', borderS:'#7A2840', nav:'rgba(58,8,24,0.92)'     },
  'bold-cobalt':    { bg:'#001A80', bg2:'#082298', text:'#E0E8FF', text2:'#90A8E8', muted:'#4060A8', accent:'#80AAFF',  accentLight:'#4070D8', accentDark:'#80AAFF', accent2:'#80AAFF',  accent2Light:'#4070D8', accent2Dark:'#80AAFF', border:'#0A2898', borderS:'#2848B0', nav:'rgba(0,26,128,0.92)'    },

  /* ── Editorial / Dual-Accent ──────────────────────────────────────────── */
  /* accent = structural (section labels, links); accent2 = editorial (kicker, dates) */

  /* Financial Times */
  'ft-dark':        { bg:'#0D1A2E', bg2:'#121E34', text:'#F0EDE8', text2:'#4A6888', muted:'#4A6888', accent:'#90B4D8',  accentLight:'#0F5499', accentDark:'#90B4D8', accent2:'#CC4B37',  accent2Light:'#CC4B37', accent2Dark:'#CC4B37', border:'#1A3050', borderS:'#2A4870', nav:'rgba(13,26,46,0.92)'    },
  'ft-light':       { bg:'#FDF6EE', bg2:'#F5EAD8', text:'#0D1A2E', text2:'#8A7868', muted:'#8A7868', accent:'#0F5499',  accentLight:'#90B4D8', accentDark:'#0F5499', accent2:'#CC4B37',  accent2Light:'#CC4B37', accent2Dark:'#CC4B37', border:'#D8C8B8', borderS:'#B0A090', nav:'rgba(253,246,238,0.92)' },

  /* Kinfolk */
  'kinfolk-dark':   { bg:'#141A14', bg2:'#1A2018', text:'#EAE8E0', text2:'#4A6A4E', muted:'#4A6A4E', accent:'#8AAE8E',  accentLight:'#5A7A5E', accentDark:'#8AAE8E', accent2:'#D4806A',  accent2Light:'#B85C3A', accent2Dark:'#D4806A', border:'#243824', borderS:'#3A5038', nav:'rgba(20,26,20,0.92)'    },
  'kinfolk-light':  { bg:'#F4F0E8', bg2:'#EBE6DC', text:'#1A1410', text2:'#8A7A68', muted:'#8A7A68', accent:'#5A7A5E',  accentLight:'#8AAE8E', accentDark:'#5A7A5E', accent2:'#B85C3A',  accent2Light:'#D4806A', accent2Dark:'#B85C3A', border:'#CCC4B0', borderS:'#A8A090', nav:'rgba(244,240,232,0.92)' },

  /* Bloomberg Terminal */
  'terminal-dark':  { bg:'#050D07', bg2:'#0C1610', text:'#C8E8D0', text2:'#2A5838', muted:'#2A5838', accent:'#3AB85A',  accentLight:'#1A6B35', accentDark:'#3AB85A', accent2:'#C8860A',  accent2Light:'#C8860A', accent2Dark:'#C8860A', border:'#0E2814', borderS:'#1E4028', nav:'rgba(5,13,7,0.92)'     },
  'terminal-light': { bg:'#F0F8F2', bg2:'#E4F0E8', text:'#061008', text2:'#5A8068', muted:'#5A8068', accent:'#1A6B35',  accentLight:'#3AB85A', accentDark:'#1A6B35', accent2:'#C8860A',  accent2Light:'#C8860A', accent2Dark:'#C8860A', border:'#B8D8C0', borderS:'#90B8A0', nav:'rgba(240,248,242,0.92)' },

  /* Cereal */
  'cereal-dark':    { bg:'#0A1018', bg2:'#101820', text:'#E4E8EE', text2:'#3A5870', muted:'#3A5870', accent:'#7A9AB8',  accentLight:'#2E4A5E', accentDark:'#7A9AB8', accent2:'#C89898',  accent2Light:'#B07878', accent2Dark:'#C89898', border:'#162030', borderS:'#283848', nav:'rgba(10,16,24,0.92)'    },
  'cereal-light':   { bg:'#F2F4F8', bg2:'#E8ECF4', text:'#0E1820', text2:'#6A7A8A', muted:'#6A7A8A', accent:'#2E4A5E',  accentLight:'#7A9AB8', accentDark:'#2E4A5E', accent2:'#B07878',  accent2Light:'#C89898', accent2Dark:'#B07878', border:'#C0C8D4', borderS:'#9AA4B0', nav:'rgba(242,244,248,0.92)' },

  /* Monocle */
  'monocle-dark':   { bg:'#08101E', bg2:'#0E1A2A', text:'#EAECF4', text2:'#3A5888', muted:'#3A5888', accent:'#7A9AD4',  accentLight:'#1A2850', accentDark:'#7A9AD4', accent2:'#D4940A',  accent2Light:'#D4940A', accent2Dark:'#D4940A', border:'#142040', borderS:'#2A3860', nav:'rgba(8,16,30,0.92)'     },
  'monocle-light':  { bg:'#F0F2F8', bg2:'#E4E8F4', text:'#060E1E', text2:'#5A6A88', muted:'#5A6A88', accent:'#1A2850',  accentLight:'#7A9AD4', accentDark:'#1A2850', accent2:'#D4940A',  accent2Light:'#D4940A', accent2Dark:'#D4940A', border:'#BCC4D8', borderS:'#9098B8', nav:'rgba(240,242,248,0.92)' },

  /* Aesop */
  'aesop-dark':     { bg:'#0E100A', bg2:'#181A12', text:'#E8E4D8', text2:'#4A5A28', muted:'#4A5A28', accent:'#8A9A58',  accentLight:'#4A5A28', accentDark:'#8A9A58', accent2:'#C87848',  accent2Light:'#8A4A28', accent2Dark:'#C87848', border:'#202810', borderS:'#3A4020', nav:'rgba(14,16,10,0.92)'    },
  'aesop-light':    { bg:'#F5F2E8', bg2:'#EEE8D8', text:'#100E08', text2:'#7A7058', muted:'#7A7058', accent:'#4A5A28',  accentLight:'#8A9A58', accentDark:'#4A5A28', accent2:'#8A4A28',  accent2Light:'#C87848', accent2Dark:'#8A4A28', border:'#CCC4A8', borderS:'#A8A080', nav:'rgba(245,242,232,0.92)' },

  /* Wallpaper* */
  'wall-dark':      { bg:'#070C0C', bg2:'#0E1818', text:'#D8F0EE', text2:'#1E5A50', muted:'#1E5A50', accent:'#3AA898',  accentLight:'#1A5C54', accentDark:'#3AA898', accent2:'#C4840A',  accent2Light:'#8A5C08', accent2Dark:'#C4840A', border:'#122424', borderS:'#204040', nav:'rgba(7,12,12,0.92)'     },
  'wall-light':     { bg:'#EEF7F6', bg2:'#E0EFEE', text:'#0A1A18', text2:'#5A8C88', muted:'#5A8C88', accent:'#1A5C54',  accentLight:'#3AA898', accentDark:'#1A5C54', accent2:'#8A5C08',  accent2Light:'#C4840A', accent2Dark:'#8A5C08', border:'#B0D8D4', borderS:'#88B8B0', nav:'rgba(238,247,246,0.92)' },

  /* National Geographic */
  'natgeo-dark':    { bg:'#050A14', bg2:'#0C1220', text:'#D8E4F0', text2:'#1E4870', muted:'#1E4870', accent:'#4888B8',  accentLight:'#0E3A6E', accentDark:'#4888B8', accent2:'#D4A808',  accent2Light:'#A87808', accent2Dark:'#D4A808', border:'#0E1E30', borderS:'#1E3850', nav:'rgba(5,10,20,0.92)'     },
  'natgeo-light':   { bg:'#EDF3FB', bg2:'#E0ECF5', text:'#06101E', text2:'#5A7898', muted:'#5A7898', accent:'#0E3A6E',  accentLight:'#4888B8', accentDark:'#0E3A6E', accent2:'#A87808',  accent2Light:'#D4A808', accent2Dark:'#A87808', border:'#B8CCDE', borderS:'#90AABC', nav:'rgba(237,243,251,0.92)' },

  /* Orion */
  'orion-dark':     { bg:'#071210', bg2:'#0E1E1A', text:'#D0EAE2', text2:'#1A5040', muted:'#1A5040', accent:'#3A9878',  accentLight:'#1A6250', accentDark:'#3A9878', accent2:'#D4684C',  accent2Light:'#AA4434', accent2Dark:'#D4684C', border:'#102820', borderS:'#204838', nav:'rgba(7,18,16,0.92)'     },
  'orion-light':    { bg:'#EAF7F3', bg2:'#DAF0EA', text:'#081A14', text2:'#508870', muted:'#508870', accent:'#1A6250',  accentLight:'#3A9878', accentDark:'#1A6250', accent2:'#AA4434',  accent2Light:'#D4684C', accent2Dark:'#AA4434', border:'#A8D8C8', borderS:'#80B8A0', nav:'rgba(234,247,243,0.92)' },

  /* A24 */
  'a24-dark':       { bg:'#05080E', bg2:'#0A1020', text:'#D0D8E8', text2:'#1A3C68', muted:'#1A3C68', accent:'#4880B0',  accentLight:'#0E3460', accentDark:'#4880B0', accent2:'#C07830',  accent2Light:'#8A5018', accent2Dark:'#C07830', border:'#0C1828', borderS:'#1A2C48', nav:'rgba(5,8,14,0.92)'      },
  'a24-light':      { bg:'#EEF2FA', bg2:'#E2E8F4', text:'#060C18', text2:'#506888', muted:'#506888', accent:'#0E3460',  accentLight:'#4880B0', accentDark:'#0E3460', accent2:'#8A5018',  accent2Light:'#C07830', accent2Dark:'#8A5018', border:'#B4C4D8', borderS:'#8898B0', nav:'rgba(238,242,250,0.92)' },

  /* New Yorker */
  'ny-dark':        { bg:'#06091A', bg2:'#0C1028', text:'#E8E8DC', text2:'#1E3870', muted:'#1E3870', accent:'#4A72C0',  accentLight:'#1B2D45', accentDark:'#4A72C0', accent2:'#C89808',  accent2Light:'#A07800', accent2Dark:'#C89808', border:'#0C1030', borderS:'#1A2050', nav:'rgba(6,9,26,0.92)'      },
  'ny-light':       { bg:'#F0EEE4', bg2:'#E6E2D4', text:'#080C18', text2:'#4A6080', muted:'#4A6080', accent:'#1B2D45',  accentLight:'#4A72C0', accentDark:'#1B2D45', accent2:'#A07800',  accent2Light:'#C89808', accent2Dark:'#A07800', border:'#C8C4B4', borderS:'#A0A090', nav:'rgba(240,238,228,0.92)' },

  /* Heritage */
  'heritage-dark':  { bg:'#080C08', bg2:'#101810', text:'#E0E8DC', text2:'#1E3A28', muted:'#1E3A28', accent:'#5A8A68',  accentLight:'#2D4A3E', accentDark:'#5A8A68', accent2:'#C05A38',  accent2Light:'#8B3A2A', accent2Dark:'#C05A38', border:'#101810', borderS:'#1E2A1E', nav:'rgba(8,12,8,0.92)'      },
  'heritage-light': { bg:'#F0EFE8', bg2:'#E6E4D8', text:'#080A06', text2:'#5A7A68', muted:'#5A7A68', accent:'#2D4A3E',  accentLight:'#5A8A68', accentDark:'#2D4A3E', accent2:'#8B3A2A',  accent2Light:'#C05A38', accent2Dark:'#8B3A2A', border:'#C8C8BC', borderS:'#A0A090', nav:'rgba(240,239,232,0.92)' },

  /* Nocturne */
  'nocturne-dark':  { bg:'#080818', bg2:'#0E0E28', text:'#E4E4F0', text2:'#202060', muted:'#202060', accent:'#7070C8',  accentLight:'#2A2870', accentDark:'#7070C8', accent2:'#C08830',  accent2Light:'#7A4A18', accent2Dark:'#C08830', border:'#0E0E2A', borderS:'#1E1E48', nav:'rgba(8,8,24,0.92)'      },
  'nocturne-light': { bg:'#F0EFF6', bg2:'#E6E4F0', text:'#08080E', text2:'#5858A0', muted:'#5858A0', accent:'#2A2870',  accentLight:'#7070C8', accentDark:'#2A2870', accent2:'#7A4A18',  accent2Light:'#C08830', accent2Dark:'#7A4A18', border:'#C8C8D8', borderS:'#9898B8', nav:'rgba(240,239,246,0.92)' },

  /* Storm */
  'storm-dark':     { bg:'#0A0C14', bg2:'#101420', text:'#E4E8F2', text2:'#1E3050', muted:'#1E3050', accent:'#6A8AB0',  accentLight:'#3A506A', accentDark:'#6A8AB0', accent2:'#9A4880',  accent2Light:'#5A2A4A', accent2Dark:'#9A4880', border:'#101420', borderS:'#1E2438', nav:'rgba(10,12,20,0.92)'    },
  'storm-light':    { bg:'#F2F4F8', bg2:'#E8ECF4', text:'#0A0C18', text2:'#7890A8', muted:'#7890A8', accent:'#3A506A',  accentLight:'#6A8AB0', accentDark:'#3A506A', accent2:'#5A2A4A',  accent2Light:'#9A4880', accent2Dark:'#5A2A4A', border:'#C4C8D4', borderS:'#9898B0', nav:'rgba(242,244,248,0.92)' },

};

/* ── Palette options (for <select> menus) ────────────────────────────────── */
LAB.paletteOptions = [
  /* Standard Light */
  { v:'amber-light',     label:'Amber',           group:'Light'      },
  { v:'forest-light',    label:'Forest',          group:'Light'      },
  { v:'ink-light',       label:'Ink Blue',        group:'Light'      },
  { v:'clay-light',      label:'Clay',            group:'Light'      },
  { v:'slate-light',     label:'Slate',           group:'Light'      },
  { v:'burgundy-light',  label:'Burgundy',        group:'Light'      },
  /* Standard Dark */
  { v:'amber-dark',      label:'Amber',           group:'Dark'       },
  { v:'forest-dark',     label:'Forest',          group:'Dark'       },
  { v:'ink-dark',        label:'Ink Blue',        group:'Dark'       },
  { v:'clay-dark',       label:'Clay',            group:'Dark'       },
  { v:'slate-dark',      label:'Slate',           group:'Dark'       },
  { v:'burgundy-dark',   label:'Burgundy',        group:'Dark'       },
  /* Signature */
  { v:'sig-verdigris',   label:'+ Verdigris',     group:'Signature'  },
  { v:'sig-forest',      label:'+ Forest',        group:'Signature'  },
  { v:'sig-navy',        label:'+ Navy',          group:'Signature'  },
  { v:'sig-oxide',       label:'+ Oxide',         group:'Signature'  },
  { v:'sig-steel',       label:'+ Steel',         group:'Signature'  },
  { v:'sig-prussian',    label:'+ Prussian',      group:'Signature'  },
  { v:'sig-slate-teal',  label:'+ Slate Teal',    group:'Signature'  },
  { v:'sig-plum',        label:'+ Plum',          group:'Signature'  },
  { v:'sig-bronze',      label:'+ Bronze',        group:'Signature'  },
  { v:'sig-indigo',      label:'+ Indigo',        group:'Signature'  },
  /* Greens */
  { v:'sig-hunter',      label:'+ Hunter',        group:'Greens'     },
  { v:'sig-sage',        label:'+ Sage',          group:'Greens'     },
  { v:'sig-malachite',   label:'+ Malachite',     group:'Greens'     },
  { v:'sig-fern',        label:'+ Fern',          group:'Greens'     },
  /* Others */
  { v:'sig-cobalt',      label:'+ Cobalt',        group:'Others'     },
  { v:'sig-mauve',       label:'+ Mauve',         group:'Others'     },
  /* Bold Dark */
  { v:'bold-bottle',     label:'Bottle',          group:'Bold Dark'  },
  { v:'bold-ultra',      label:'Ultramarine',     group:'Bold Dark'  },
  { v:'bold-teal',       label:'Deep Teal',       group:'Bold Dark'  },
  { v:'bold-amber-wash', label:'Amber Wash',      group:'Bold Dark'  },
  { v:'bold-terra',      label:'Terracotta',      group:'Bold Dark'  },
  { v:'bold-olive',      label:'Olive',           group:'Bold Dark'  },
  { v:'bold-burg',       label:'Burgundy',        group:'Bold Dark'  },
  { v:'bold-cobalt',     label:'Electric Cobalt', group:'Bold Dark'  },
  /* Editorial / Dual-Accent */
  { v:'ft-dark',         label:'FT Dark',         group:'Editorial'  },
  { v:'ft-light',        label:'FT Light',        group:'Editorial'  },
  { v:'kinfolk-dark',    label:'Kinfolk Dark',    group:'Editorial'  },
  { v:'kinfolk-light',   label:'Kinfolk Light',   group:'Editorial'  },
  { v:'terminal-dark',   label:'Terminal Dark',   group:'Editorial'  },
  { v:'terminal-light',  label:'Terminal Light',  group:'Editorial'  },
  { v:'cereal-dark',     label:'Cereal Dark',     group:'Editorial'  },
  { v:'cereal-light',    label:'Cereal Light',    group:'Editorial'  },
  { v:'monocle-dark',    label:'Monocle Dark',    group:'Editorial'  },
  { v:'monocle-light',   label:'Monocle Light',   group:'Editorial'  },
  { v:'aesop-dark',      label:'Aesop Dark',      group:'Editorial'  },
  { v:'aesop-light',     label:'Aesop Light',     group:'Editorial'  },
  { v:'wall-dark',       label:'Wallpaper Dark',  group:'Editorial'  },
  { v:'wall-light',      label:'Wallpaper Light', group:'Editorial'  },
  { v:'natgeo-dark',     label:'NatGeo Dark',     group:'Editorial'  },
  { v:'natgeo-light',    label:'NatGeo Light',    group:'Editorial'  },
  { v:'orion-dark',      label:'Orion Dark',      group:'Editorial'  },
  { v:'orion-light',     label:'Orion Light',     group:'Editorial'  },
  { v:'a24-dark',        label:'A24 Dark',        group:'Editorial'  },
  { v:'a24-light',       label:'A24 Light',       group:'Editorial'  },
  { v:'ny-dark',         label:'New Yorker Dark', group:'Editorial'  },
  { v:'ny-light',        label:'New Yorker Light',group:'Editorial'  },
  { v:'heritage-dark',   label:'Heritage Dark',   group:'Editorial'  },
  { v:'heritage-light',  label:'Heritage Light',  group:'Editorial'  },
  { v:'nocturne-dark',   label:'Nocturne Dark',   group:'Editorial'  },
  { v:'nocturne-light',  label:'Nocturne Light',  group:'Editorial'  },
  { v:'storm-dark',      label:'Storm Dark',      group:'Editorial'  },
  { v:'storm-light',     label:'Storm Light',     group:'Editorial'  },
];

/* ── Named presets for palette-sections ─────────────────────────────────── */
LAB.presets = {
  uniform:   { hero:'amber-light',  work:'amber-light',   edu:'amber-light',  skills:'amber-light',  cta:'amber-light',   photo:'amber-light',  footer:'amber-light'  },
  signature: { hero:'amber-light',  work:'sig-verdigris', edu:'sig-navy',     skills:'amber-light',  cta:'amber-light',   photo:'sig-verdigris',footer:'amber-light'  },
  gradient:  { hero:'amber-light',  work:'sig-verdigris', edu:'sig-navy',     skills:'slate-light',  cta:'sig-oxide',     photo:'sig-steel',    footer:'amber-dark'   },
  editorial: { hero:'amber-dark',   work:'sig-navy',      edu:'ink-dark',     skills:'amber-dark',   cta:'sig-verdigris', photo:'bold-burg',    footer:'amber-dark'   },
};
