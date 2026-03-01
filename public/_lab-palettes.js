/**
 * _lab-palettes.js — Single source of truth for all palette token data.
 *
 * Exposes window.LAB with:
 *   LAB.palettes      — object keyed by palette ID → token map
 *   LAB.paletteOptions — array of { v, label, group } for <select> menus
 *   LAB.presets        — named section-level palette presets
 *
 * Every palette token map contains:
 *   bg, bg2, text, text2, muted, accent, accentL, border, borderS, nav
 *
 * Used by: palette-sections.html (JS-driven CSS variable theming)
 * Reference by: any future page that needs structured palette data.
 */

window.LAB = window.LAB || {};

/* ── Palette tokens ─────────────────────────────────────────────────────── */
LAB.palettes = {

  /* ── Standard Light ── */
  'amber-light':    { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7E5F28',  accentL:'#D4A574', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'forest-light':   { bg:'#F1F3EE', bg2:'#E5EBE0', text:'#0F1A0C', text2:'#3A5432', muted:'#7A8A74', accent:'#2D5A27',  accentL:'#6AAE5A', border:'#C8D4C0', borderS:'#90A888', nav:'rgba(241,243,238,0.92)' },
  'ink-light':      { bg:'#F0F2F5', bg2:'#E2E8F0', text:'#0A1628', text2:'#3A5070', muted:'#7A8A9A', accent:'#1B4080',  accentL:'#5B8DB5', border:'#C4CDD8', borderS:'#90A0B8', nav:'rgba(240,242,245,0.92)' },
  'clay-light':     { bg:'#F5EDE6', bg2:'#EEE0D4', text:'#1A0A06', text2:'#5A3020', muted:'#8A7068', accent:'#8B3A2A',  accentL:'#C47860', border:'#DEC9BC', borderS:'#B09080', nav:'rgba(245,237,230,0.92)' },
  'slate-light':    { bg:'#F0EFF0', bg2:'#E4E4E8', text:'#141418', text2:'#484854', muted:'#8A8A94', accent:'#4A5568',  accentL:'#8A9AB8', border:'#D0D0D4', borderS:'#A0A0AC', nav:'rgba(240,239,240,0.92)' },
  'burgundy-light': { bg:'#F5EFF0', bg2:'#EEE4E8', text:'#140608', text2:'#503040', muted:'#8A6870', accent:'#7A1E30',  accentL:'#C45A6E', border:'#DEC4C8', borderS:'#B08090', nav:'rgba(245,239,240,0.92)' },

  /* ── Standard Dark ── */
  'amber-dark':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#D4A574',  accentL:'#7E5F28', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)'    },
  'forest-dark':    { bg:'#0A110A', bg2:'#111810', text:'#E8EDE6', text2:'#90A888', muted:'#5A7054', accent:'#6AAE5A',  accentL:'#2D5A27', border:'#2A3E28', borderS:'#4A6840', nav:'rgba(10,17,10,0.92)'    },
  'ink-dark':       { bg:'#080E18', bg2:'#0C1420', text:'#E8EDF5', text2:'#98B0C8', muted:'#4A6080', accent:'#5B8DB5',  accentL:'#1B4080', border:'#1E2E48', borderS:'#3A5070', nav:'rgba(8,14,24,0.92)'     },
  'clay-dark':      { bg:'#110806', bg2:'#180E0A', text:'#F0E6E0', text2:'#C09080', muted:'#7A5A50', accent:'#C4664A',  accentL:'#8B3A2A', border:'#3A2018', borderS:'#5A3828', nav:'rgba(17,8,6,0.92)'      },
  'slate-dark':     { bg:'#0E0E12', bg2:'#141418', text:'#EEEEF2', text2:'#AAAAB8', muted:'#5A5A70', accent:'#8A9AB8',  accentL:'#4A5568', border:'#2A2A34', borderS:'#404054', nav:'rgba(14,14,18,0.92)'    },
  'burgundy-dark':  { bg:'#0E0608', bg2:'#160C0E', text:'#F0E8EA', text2:'#C09098', muted:'#7A4A54', accent:'#C45A6E',  accentL:'#7A1E30', border:'#3A1820', borderS:'#5A2832', nav:'rgba(14,6,8,0.92)'      },

  /* ── Signature (amber base + single accent colour) ── */
  'sig-verdigris':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A6B5E',  accentL:'#7EC8B4', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-forest':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2D4A3E',  accentL:'#5A8A70', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-navy':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1B2D45',  accentL:'#4A6880', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-oxide':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#8B3A2A',  accentL:'#C47860', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-steel':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4A6580',  accentL:'#7A98B0', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-prussian':   { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#0F3A5A',  accentL:'#3A7098', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-slate-teal': { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A5055',  accentL:'#5A8898', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-plum':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#5A2A4A',  accentL:'#8A5878', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-bronze':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7A4A18',  accentL:'#B07848', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-indigo':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A2870',  accentL:'#5A5898', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-hunter':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2B5235',  accentL:'#5A8A62', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-sage':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4E6A55',  accentL:'#80A888', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-malachite':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1A7A56',  accentL:'#4EAA82', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-fern':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4D6B3C',  accentL:'#7AA866', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-cobalt':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1C3A82',  accentL:'#4A70B8', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-mauve':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7A4A68',  accentL:'#B07898', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  /* ── Bold Dark (colour-as-background) ── */
  'bold-bottle':    { bg:'#1C3A24', bg2:'#24462C', text:'#E4EDE6', text2:'#A8C8AC', muted:'#5A7A60', accent:'#7DC87A',  accentL:'#4A9850', border:'#2E5038', borderS:'#4A7060', nav:'rgba(28,58,36,0.92)'    },
  'bold-ultra':     { bg:'#0F1E6A', bg2:'#182080', text:'#E8ECF8', text2:'#90AADC', muted:'#4A60A0', accent:'#90B4E8',  accentL:'#5080C8', border:'#1E307A', borderS:'#3A5090', nav:'rgba(15,30,106,0.92)'   },
  'bold-teal':      { bg:'#082830', bg2:'#0C3840', text:'#DCF0F4', text2:'#80BCCC', muted:'#3A7088', accent:'#5AC8D8',  accentL:'#2898A8', border:'#124050', borderS:'#2A6070', nav:'rgba(8,40,48,0.92)'     },
  'bold-amber-wash':{ bg:'#5A3E14', bg2:'#6A4A1C', text:'#F5EAD8', text2:'#D4B080', muted:'#9A7848', accent:'#D4A574',  accentL:'#B07840', border:'#7A5820', borderS:'#9A7840', nav:'rgba(90,62,20,0.92)'    },
  'bold-terra':     { bg:'#5A1E10', bg2:'#6A2818', text:'#F5E4DE', text2:'#D48878', muted:'#9A5848', accent:'#E8906A',  accentL:'#C06040', border:'#7A3020', borderS:'#9A4838', nav:'rgba(90,30,16,0.92)'    },
  'bold-olive':     { bg:'#2A3018', bg2:'#343C20', text:'#EAECD8', text2:'#B0B888', muted:'#6A7848', accent:'#A8C86A',  accentL:'#788840', border:'#3E4828', borderS:'#586038', nav:'rgba(42,48,24,0.92)'    },
  'bold-burg':      { bg:'#3A0818', bg2:'#481020', text:'#F5E0E4', text2:'#D888A0', muted:'#8A4858', accent:'#E87888',  accentL:'#B84060', border:'#5A1828', borderS:'#7A2840', nav:'rgba(58,8,24,0.92)'     },
  'bold-cobalt':    { bg:'#001A80', bg2:'#082298', text:'#E0E8FF', text2:'#90A8E8', muted:'#4060A8', accent:'#80AAFF',  accentL:'#4070D8', border:'#0A2898', borderS:'#2848B0', nav:'rgba(0,26,128,0.92)'    },

};

/* ── Palette options (for <select> menus) ────────────────────────────────── */
LAB.paletteOptions = [
  /* Standard Light */
  { v:'amber-light',     label:'Amber',           group:'Light'     },
  { v:'forest-light',    label:'Forest',          group:'Light'     },
  { v:'ink-light',       label:'Ink Blue',        group:'Light'     },
  { v:'clay-light',      label:'Clay',            group:'Light'     },
  { v:'slate-light',     label:'Slate',           group:'Light'     },
  { v:'burgundy-light',  label:'Burgundy',        group:'Light'     },
  /* Standard Dark */
  { v:'amber-dark',      label:'Amber',           group:'Dark'      },
  { v:'forest-dark',     label:'Forest',          group:'Dark'      },
  { v:'ink-dark',        label:'Ink Blue',        group:'Dark'      },
  { v:'clay-dark',       label:'Clay',            group:'Dark'      },
  { v:'slate-dark',      label:'Slate',           group:'Dark'      },
  { v:'burgundy-dark',   label:'Burgundy',        group:'Dark'      },
  /* Signature */
  { v:'sig-verdigris',   label:'+ Verdigris',     group:'Signature' },
  { v:'sig-forest',      label:'+ Forest',        group:'Signature' },
  { v:'sig-navy',        label:'+ Navy',          group:'Signature' },
  { v:'sig-oxide',       label:'+ Oxide',         group:'Signature' },
  { v:'sig-steel',       label:'+ Steel',         group:'Signature' },
  { v:'sig-prussian',    label:'+ Prussian',      group:'Signature' },
  { v:'sig-slate-teal',  label:'+ Slate Teal',    group:'Signature' },
  { v:'sig-plum',        label:'+ Plum',          group:'Signature' },
  { v:'sig-bronze',      label:'+ Bronze',        group:'Signature' },
  { v:'sig-indigo',      label:'+ Indigo',        group:'Signature' },
  /* Greens */
  { v:'sig-hunter',      label:'+ Hunter',        group:'Greens'    },
  { v:'sig-sage',        label:'+ Sage',          group:'Greens'    },
  { v:'sig-malachite',   label:'+ Malachite',     group:'Greens'    },
  { v:'sig-fern',        label:'+ Fern',          group:'Greens'    },
  /* Others */
  { v:'sig-cobalt',      label:'+ Cobalt',        group:'Others'    },
  { v:'sig-mauve',       label:'+ Mauve',         group:'Others'    },
  /* Bold Dark */
  { v:'bold-bottle',     label:'Bottle',          group:'Bold Dark' },
  { v:'bold-ultra',      label:'Ultramarine',     group:'Bold Dark' },
  { v:'bold-teal',       label:'Deep Teal',       group:'Bold Dark' },
  { v:'bold-amber-wash', label:'Amber Wash',      group:'Bold Dark' },
  { v:'bold-terra',      label:'Terracotta',      group:'Bold Dark' },
  { v:'bold-olive',      label:'Olive',           group:'Bold Dark' },
  { v:'bold-burg',       label:'Burgundy',        group:'Bold Dark' },
  { v:'bold-cobalt',     label:'Electric Cobalt', group:'Bold Dark' },
];

/* ── Named presets for palette-sections ─────────────────────────────────── */
LAB.presets = {
  uniform:   { hero:'amber-light',  work:'amber-light',   edu:'amber-light',  skills:'amber-light',  cta:'amber-light',   photo:'amber-light',  footer:'amber-light'  },
  signature: { hero:'amber-light',  work:'sig-verdigris', edu:'sig-navy',     skills:'amber-light',  cta:'amber-light',   photo:'sig-verdigris',footer:'amber-light'  },
  gradient:  { hero:'amber-light',  work:'sig-verdigris', edu:'sig-navy',     skills:'slate-light',  cta:'sig-oxide',     photo:'sig-steel',    footer:'amber-dark'   },
  editorial: { hero:'amber-dark',   work:'sig-navy',      edu:'ink-dark',     skills:'amber-dark',   cta:'sig-verdigris', photo:'bold-burg',    footer:'amber-dark'   },
};
