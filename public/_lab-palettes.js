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

  /* ── New Standard Light ── */
  'newsprint-light': { bg:'#F2EDE4', bg2:'#E8E2D8', text:'#1A1712', text2:'#3D3828', muted:'#8A8378', accent:'#5C4A1E', accentLight:'#8C7435', accentDark:'#3A2E10', accent2:'#5C4A1E', accent2Light:'#8C7435', accent2Dark:'#3A2E10', border:'#C8C2B4', borderS:'#A0988A', nav:'rgba(242,237,228,0.92)' },

  'lithograph-light':{ bg:'#EEEAE2', bg2:'#E4E0D6', text:'#1E1C16', text2:'#504C3E', muted:'#8C887A', accent:'#4A6238', accentLight:'#788860', accentDark:'#384E2A', accent2:'#4A6238', accent2Light:'#788860', accent2Dark:'#384E2A', border:'#C8C4B8', borderS:'#A8A498', nav:'rgba(238,234,226,0.92)' },
  'celadon-light':   { bg:'#EDF0EA', bg2:'#E2E6E0', text:'#181E1C', text2:'#3E4E48', muted:'#7A8C86', accent:'#2E5A50', accentLight:'#4A7A70', accentDark:'#1C3A34', accent2:'#2E5A50', accent2Light:'#4A7A70', accent2Dark:'#1C3A34', border:'#C0CCC8', borderS:'#A0ACA8', nav:'rgba(237,240,234,0.92)' },

  'folio-light':     { bg:'#ECEEF2', bg2:'#E2E4E9', text:'#161820', text2:'#40424E', muted:'#7A7C8A', accent:'#384870', accentLight:'#5060A0', accentDark:'#202E50', accent2:'#384870', accent2Light:'#5060A0', accent2Dark:'#202E50', border:'#C4C6D0', borderS:'#A4A6B2', nav:'rgba(236,238,242,0.92)' },
  'duotone-light':   { bg:'#EDE6DF', bg2:'#E8E2DA', text:'#1A1510', text2:'#4A4038', muted:'#8A847A', accent:'#6A3C50', accentLight:'#8A5870', accentDark:'#441E30', accent2:'#6A3C50', accent2Light:'#8A5870', accent2Dark:'#441E30', border:'#CCC6BE', borderS:'#A89080', nav:'rgba(237,230,223,0.92)' },

  /* ── Standard Light ── */
  'amber-dark':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#D4A574',  accentLight:'#7E5F28', accentDark:'#B8915A', accent2:'#D4A574',  accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)'    },
  'forest-dark':    { bg:'#0A110A', bg2:'#111810', text:'#E8EDE6', text2:'#90A888', muted:'#5A7054', accent:'#6AAE5A',  accentLight:'#2D5A27', accentDark:'#6AAE5A', accent2:'#6AAE5A',  accent2Light:'#2D5A27', accent2Dark:'#6AAE5A', border:'#2A3E28', borderS:'#4A6840', nav:'rgba(10,17,10,0.92)'    },
  'ink-dark':       { bg:'#080E18', bg2:'#0C1420', text:'#E8EDF5', text2:'#98B0C8', muted:'#4A6080', accent:'#6898C0',  accentLight:'#98B8D8', accentDark:'#4878A8', accent2:'#6898C0',  accent2Light:'#98B8D8', accent2Dark:'#4878A8', border:'#1E2E48', borderS:'#3A5070', nav:'rgba(8,14,24,0.92)'     },
  'clay-dark':      { bg:'#110806', bg2:'#180E0A', text:'#F0E6E0', text2:'#C09080', muted:'#7A5A50', accent:'#C4664A',  accentLight:'#8B3A2A', accentDark:'#C4664A', accent2:'#C4664A',  accent2Light:'#8B3A2A', accent2Dark:'#C4664A', border:'#3A2018', borderS:'#5A3828', nav:'rgba(17,8,6,0.92)'      },
  'slate-dark':     { bg:'#0E0E12', bg2:'#141418', text:'#EEEEF2', text2:'#AAAAB8', muted:'#5A5A70', accent:'#8A9AB8',  accentLight:'#4A5568', accentDark:'#8A9AB8', accent2:'#8A9AB8',  accent2Light:'#4A5568', accent2Dark:'#8A9AB8', border:'#2A2A34', borderS:'#404054', nav:'rgba(14,14,18,0.92)'    },
  'burgundy-dark':  { bg:'#0E0608', bg2:'#160C0E', text:'#F0E8EA', text2:'#C09098', muted:'#7A4A54', accent:'#C45A6E',  accentLight:'#7A1E30', accentDark:'#C45A6E', accent2:'#C45A6E',  accent2Light:'#7A1E30', accent2Dark:'#C45A6E', border:'#3A1820', borderS:'#5A2832', nav:'rgba(14,6,8,0.92)'      },

  /* ── New Standard Dark ── */
  'newsprint-dark':  { bg:'#111009', bg2:'#1A1813', text:'#E8E3D8', text2:'#B8B2A4', muted:'#6A6458', accent:'#C8A84B', accentLight:'#E0C878', accentDark:'#9A7C2E', accent2:'#C8A84B', accent2Light:'#E0C878', accent2Dark:'#9A7C2E', border:'#2A2820', borderS:'#3A3828', nav:'rgba(17,16,9,0.92)'    },

  'lithograph-dark': { bg:'#0E0D0B', bg2:'#171613', text:'#E4E0D5', text2:'#AEAA9C', muted:'#646058', accent:'#8AB870', accentLight:'#AACE90', accentDark:'#668A50', accent2:'#8AB870', accent2Light:'#AACE90', accent2Dark:'#668A50', border:'#262520', borderS:'#363430', nav:'rgba(14,13,11,0.92)'  },
  'celadon-dark':    { bg:'#0C100E', bg2:'#151918', text:'#E2E8E4', text2:'#A4B0AC', muted:'#586460', accent:'#72B8A8', accentLight:'#96D0C0', accentDark:'#4E8C80', accent2:'#72B8A8', accent2Light:'#96D0C0', accent2Dark:'#4E8C80', border:'#202A28', borderS:'#303830', nav:'rgba(12,16,14,0.92)'   },

  'folio-dark':      { bg:'#0C0D10', bg2:'#141518', text:'#E2E4EA', text2:'#A4A6B2', muted:'#5A5C68', accent:'#7890D0', accentLight:'#98ACDC', accentDark:'#5068A8', accent2:'#7890D0', accent2Light:'#98ACDC', accent2Dark:'#5068A8', border:'#222430', borderS:'#323438', nav:'rgba(12,13,16,0.92)'  },
  'duotone-dark':    { bg:'#100D08', bg2:'#181310', text:'#E8E3DA', text2:'#ACA89C', muted:'#646058', accent:'#C07898', accentLight:'#D898B0', accentDark:'#985870', accent2:'#C07898', accent2Light:'#D898B0', accent2Dark:'#985870', border:'#281E18', borderS:'#382820', nav:'rgba(16,13,8,0.92)'   },

  /* ── Signature (amber base + single accent colour) ── */
  'sig-verdigris':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A6B5E',  accentLight:'#7EC8B4', accentDark:'#2A6B5E', accent2:'#2A6B5E',  accent2Light:'#7EC8B4', accent2Dark:'#2A6B5E', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-forest':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2D4A3E',  accentLight:'#5A8A70', accentDark:'#2D4A3E', accent2:'#2D4A3E',  accent2Light:'#5A8A70', accent2Dark:'#2D4A3E', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-navy':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1B2D45',  accentLight:'#4A6880', accentDark:'#1B2D45', accent2:'#1B2D45',  accent2Light:'#4A6880', accent2Dark:'#1B2D45', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-oxide':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#8B3A2A',  accentLight:'#C47860', accentDark:'#8B3A2A', accent2:'#8B3A2A',  accent2Light:'#C47860', accent2Dark:'#8B3A2A', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-steel':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4A6580',  accentLight:'#7A98B0', accentDark:'#4A6580', accent2:'#4A6580',  accent2Light:'#7A98B0', accent2Dark:'#4A6580', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-prussian':   { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#0F3A5A',  accentLight:'#3A7098', accentDark:'#0F3A5A', accent2:'#0F3A5A',  accent2Light:'#3A7098', accent2Dark:'#0F3A5A', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-slate-teal': { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A5055',  accentLight:'#5A8898', accentDark:'#2A5055', accent2:'#2A5055',  accent2Light:'#5A8898', accent2Dark:'#2A5055', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-plum':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#5A2A4A',  accentLight:'#8A5878', accentDark:'#5A2A4A', accent2:'#5A2A4A',  accent2Light:'#8A5878', accent2Dark:'#5A2A4A', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  'sig-indigo':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A2870',  accentLight:'#5A5898', accentDark:'#2A2870', accent2:'#2A2870',  accent2Light:'#5A5898', accent2Dark:'#2A2870', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-hunter':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2B5235',  accentLight:'#5A8A62', accentDark:'#2B5235', accent2:'#2B5235',  accent2Light:'#5A8A62', accent2Dark:'#2B5235', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-sage':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#4E6A55',  accentLight:'#80A888', accentDark:'#4E6A55', accent2:'#4E6A55',  accent2Light:'#80A888', accent2Dark:'#4E6A55', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-malachite':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1A7A56',  accentLight:'#4EAA82', accentDark:'#1A7A56', accent2:'#1A7A56',  accent2Light:'#4EAA82', accent2Dark:'#1A7A56', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  'sig-cobalt':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#1C3A82',  accentLight:'#4A70B8', accentDark:'#1C3A82', accent2:'#1C3A82',  accent2Light:'#4A70B8', accent2Dark:'#1C3A82', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-mauve':      { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#7A4A68',  accentLight:'#B07898', accentDark:'#7A4A68', accent2:'#7A4A68',  accent2Light:'#B07898', accent2Dark:'#7A4A68', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  /* ── New Signature Colours ── */

  'sig-patina':     { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#2A5A50', accentLight:'#5A8C80', accentDark:'#2A5A50', accent2:'#2A5A50', accent2Light:'#5A8C80', accent2Dark:'#2A5A50', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  'sig-amaranth':   { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#822840', accentLight:'#C05870', accentDark:'#822840', accent2:'#822840', accent2Light:'#C05870', accent2Dark:'#822840', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },
  'sig-dusk':       { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#5A4870', accentLight:'#8878A8', accentDark:'#5A4870', accent2:'#5A4870', accent2Light:'#8878A8', accent2Dark:'#5A4870', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },


  /* ── Signature Dark (dark-tinted bg + luminous signature accent + amber gold editorial) ── */
  'sig-verdigris-dark':  { bg:'#091E1A', bg2:'#112824', text:'#F0EBE0', text2:'#98C0B8', muted:'#4A8070', accent:'#5EC4A8', accentLight:'#88D8C0', accentDark:'#3A9880', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#1E3C36', borderS:'#2E5850', nav:'rgba(9,30,26,0.92)'   },
  'sig-forest-dark':     { bg:'#0B1812', bg2:'#13221A', text:'#F0EBE0', text2:'#90B8A0', muted:'#487860', accent:'#58B87A', accentLight:'#80C898', accentDark:'#389860', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#1C3028', borderS:'#2C4838', nav:'rgba(11,24,18,0.92)'  },
  'sig-navy-dark':       { bg:'#0A1520', bg2:'#111E2E', text:'#F0EBE0', text2:'#90A8C8', muted:'#486080', accent:'#6090C8', accentLight:'#88B0DC', accentDark:'#3E70A8', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#1A2E44', borderS:'#2A4060', nav:'rgba(10,21,32,0.92)'  },
  'sig-oxide-dark':      { bg:'#1E0C08', bg2:'#2C1410', text:'#F0EBE0', text2:'#C0A098', muted:'#786050', accent:'#D07858', accentLight:'#E09A7A', accentDark:'#A85840', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#3A1C16', borderS:'#542820', nav:'rgba(30,12,8,0.92)'   },

  'sig-prussian-dark':   { bg:'#071220', bg2:'#0E1C2E', text:'#F0EBE0', text2:'#88A8C8', muted:'#406080', accent:'#5898D0', accentLight:'#80B8E4', accentDark:'#3870A8', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#142038', borderS:'#203050', nav:'rgba(7,18,32,0.92)'   },
  'sig-slate-teal-dark': { bg:'#0A1C20', bg2:'#12262A', text:'#F0EBE0', text2:'#88B8C0', muted:'#406870', accent:'#5AB8C0', accentLight:'#80CED4', accentDark:'#389098', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#1C3438', borderS:'#2C4C50', nav:'rgba(10,28,32,0.92)'  },
  'sig-plum-dark':       { bg:'#180A14', bg2:'#24121E', text:'#F0EBE0', text2:'#B888A8', muted:'#704860', accent:'#C070A8', accentLight:'#D890C0', accentDark:'#9A5088', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#341828', borderS:'#4C2840', nav:'rgba(24,10,20,0.92)'  },

  'sig-indigo-dark':     { bg:'#0C0B24', bg2:'#141330', text:'#F0EBE0', text2:'#9898C8', muted:'#585890', accent:'#7878D8', accentLight:'#9898E4', accentDark:'#5858B8', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#1E1C3C', borderS:'#2E2C58', nav:'rgba(12,11,36,0.92)'  },
  'sig-hunter-dark':     { bg:'#0C1A10', bg2:'#142018', text:'#F0EBE0', text2:'#88B898', muted:'#487058', accent:'#4CA862', accentLight:'#78C882', accentDark:'#2A8848', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#1C3022', borderS:'#2C4830', nav:'rgba(12,26,16,0.92)'  },

  'sig-malachite-dark':  { bg:'#071E16', bg2:'#0E2A20', text:'#F0EBE0', text2:'#80C0A8', muted:'#388868', accent:'#38B088', accentLight:'#68C8A8', accentDark:'#209878', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#142E24', borderS:'#204838', nav:'rgba(7,30,22,0.92)'   },

  'sig-cobalt-dark':     { bg:'#09122C', bg2:'#101C3C', text:'#F0EBE0', text2:'#9098C8', muted:'#485080', accent:'#6890E0', accentLight:'#90B0EC', accentDark:'#4868C0', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#182048', borderS:'#283060', nav:'rgba(9,18,44,0.92)'   },
  'sig-mauve-dark':      { bg:'#1C0C18', bg2:'#281422', text:'#F0EBE0', text2:'#B888B0', muted:'#705068', accent:'#C888B4', accentLight:'#DCA8CC', accentDark:'#A06898', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#301A2A', borderS:'#482840', nav:'rgba(28,12,24,0.92)'  },

  /* ── Signature Dark – Amber Base (amber-dark bg + luminous signature accent + amber gold editorial) ── */
  'sig-verdigris-dark-a':  { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#5EC4A8', accentLight:'#88D8C0', accentDark:'#3A9880', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-forest-dark-a':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#58B87A', accentLight:'#80C898', accentDark:'#389860', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-navy-dark-a':       { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#6090C8', accentLight:'#88B0DC', accentDark:'#3E70A8', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-oxide-dark-a':      { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#D07858', accentLight:'#E09A7A', accentDark:'#A85840', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-prussian-dark-a':   { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#5898D0', accentLight:'#80B8E4', accentDark:'#3870A8', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-slate-teal-dark-a': { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#5AB8C0', accentLight:'#80CED4', accentDark:'#389098', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-plum-dark-a':       { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#C070A8', accentLight:'#D890C0', accentDark:'#9A5088', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-indigo-dark-a':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#7878D8', accentLight:'#9898E4', accentDark:'#5858B8', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-hunter-dark-a':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#4CA862', accentLight:'#78C882', accentDark:'#2A8848', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-malachite-dark-a':  { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#38B088', accentLight:'#68C8A8', accentDark:'#209878', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-cobalt-dark-a':     { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#6890E0', accentLight:'#90B0EC', accentDark:'#4868C0', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },
  'sig-mauve-dark-a':      { bg:'#0D0D0B', bg2:'#141410', text:'#F0EBE0', text2:'#C8C0B8', muted:'#828078', accent:'#C888B4', accentLight:'#DCA8CC', accentDark:'#A06898', accent2:'#D4A574', accent2Light:'#7E5F28', accent2Dark:'#B8915A', border:'#2A2820', borderS:'#5C5650', nav:'rgba(13,13,11,0.92)' },

  /* ── Signature Vermilion ── */
  'sig-vermilion':  { bg:'#F5F0E8', bg2:'#EDE8DC', text:'#111111', text2:'#4A4642', muted:'#828078', accent:'#BE2A20', accentLight:'#D96055', accentDark:'#8C1A12', accent2:'#BE2A20', accent2Light:'#D96055', accent2Dark:'#8C1A12', border:'#D8D4CC', borderS:'#B0AA9E', nav:'rgba(245,240,232,0.92)' },

  /* ── Bold Dark (colour-as-background) ── */
  'bold-bottle':    { bg:'#1C3A24', bg2:'#24462C', text:'#E4EDE6', text2:'#A8C8AC', muted:'#5A7A60', accent:'#7DC87A',  accentLight:'#4A9850', accentDark:'#7DC87A', accent2:'#7DC87A',  accent2Light:'#4A9850', accent2Dark:'#7DC87A', border:'#2E5038', borderS:'#4A7060', nav:'rgba(28,58,36,0.92)'    },
  'bold-ultra':     { bg:'#0F1E6A', bg2:'#182080', text:'#E8ECF8', text2:'#90AADC', muted:'#4A60A0', accent:'#90B4E8',  accentLight:'#5080C8', accentDark:'#90B4E8', accent2:'#90B4E8',  accent2Light:'#5080C8', accent2Dark:'#90B4E8', border:'#1E307A', borderS:'#3A5090', nav:'rgba(15,30,106,0.92)'   },
  'bold-teal':      { bg:'#082830', bg2:'#0C3840', text:'#DCF0F4', text2:'#80BCCC', muted:'#3A7088', accent:'#5AC8D8',  accentLight:'#2898A8', accentDark:'#5AC8D8', accent2:'#5AC8D8',  accent2Light:'#2898A8', accent2Dark:'#5AC8D8', border:'#124050', borderS:'#2A6070', nav:'rgba(8,40,48,0.92)'     },
  'bold-amber-wash':{ bg:'#5A3E14', bg2:'#6A4A1C', text:'#F5EAD8', text2:'#D4B080', muted:'#9A7848', accent:'#D4A574',  accentLight:'#B07840', accentDark:'#D4A574', accent2:'#D4A574',  accent2Light:'#B07840', accent2Dark:'#D4A574', border:'#7A5820', borderS:'#9A7840', nav:'rgba(90,62,20,0.92)'    },
  'bold-terra':     { bg:'#5A1E10', bg2:'#6A2818', text:'#F5E4DE', text2:'#D48878', muted:'#9A5848', accent:'#E8906A',  accentLight:'#C06040', accentDark:'#E8906A', accent2:'#E8906A',  accent2Light:'#C06040', accent2Dark:'#E8906A', border:'#7A3020', borderS:'#9A4838', nav:'rgba(90,30,16,0.92)'    },
  'bold-olive':     { bg:'#2A3018', bg2:'#343C20', text:'#EAECD8', text2:'#B0B888', muted:'#6A7848', accent:'#A8C86A',  accentLight:'#788840', accentDark:'#A8C86A', accent2:'#A8C86A',  accent2Light:'#788840', accent2Dark:'#A8C86A', border:'#3E4828', borderS:'#586038', nav:'rgba(42,48,24,0.92)'    },
  'bold-burg':      { bg:'#3A0818', bg2:'#481020', text:'#F5E0E4', text2:'#D888A0', muted:'#8A4858', accent:'#D85070',  accentLight:'#E87888', accentDark:'#B83050', accent2:'#D85070',  accent2Light:'#E87888', accent2Dark:'#B83050', border:'#5A1828', borderS:'#7A2840', nav:'rgba(58,8,24,0.92)'     },
  'bold-cobalt':    { bg:'#001A80', bg2:'#082298', text:'#E0E8FF', text2:'#90A8E8', muted:'#4060A8', accent:'#A8C8FF',  accentLight:'#C8DCFF', accentDark:'#6090E8', accent2:'#A8C8FF',  accent2Light:'#C8DCFF', accent2Dark:'#6090E8', border:'#0A2898', borderS:'#2848B0', nav:'rgba(0,26,128,0.92)'    },

  /* ── New Bold Palettes ── */
  'bold-onyx':            { bg:'#0A0A08', bg2:'#141410', text:'#F0ECE4', text2:'#B8B2A8', muted:'#605A52', accent:'#E8B400', accentLight:'#F0CC50', accentDark:'#C09000', accent2:'#E8B400', accent2Light:'#F0CC50', accent2Dark:'#C09000', border:'#1E1E1A', borderS:'#383830', nav:'rgba(10,10,8,0.92)' },
  'bold-onyx-light':      { bg:'#FBF8EA', bg2:'#F4EFD8', text:'#1A1400', text2:'#5A4E20', muted:'#8A7A48', accent:'#9A7200', accentLight:'#C49800', accentDark:'#6A4E00', accent2:'#9A7200', accent2Light:'#C49800', accent2Dark:'#6A4E00', border:'#E0D8B0', borderS:'#C8BC88', nav:'rgba(251,248,234,0.92)' },

  /* ── New Standard Grey/White Palettes ── */
  'newsprint-grey-light': { bg:'#E8E6E0', bg2:'#DEDAD2', text:'#111110', text2:'#484642', muted:'#807C74', accent:'#1A1A18', accentLight:'#484642', accentDark:'#0A0A08', accent2:'#B82020', accent2Light:'#D84848', accent2Dark:'#841414', border:'#C4C0B8', borderS:'#9E9A92', nav:'rgba(232,230,224,0.92)' },
  'newsprint-grey-dark':  { bg:'#1A1A16', bg2:'#222220', text:'#E8E4DC', text2:'#B0ACA4', muted:'#706C64', accent:'#C8C4BC', accentLight:'#E8E4DC', accentDark:'#9A9690', accent2:'#D43030', accent2Light:'#E86060', accent2Dark:'#A02020', border:'#2E2E2A', borderS:'#484440', nav:'rgba(26,26,22,0.92)' },
  'paper-white-light':    { bg:'#F8F8F6', bg2:'#F0F0EE', text:'#101010', text2:'#484848', muted:'#909090', accent:'#4A4858', accentLight:'#7A7890', accentDark:'#282636', accent2:'#4A4858', accent2Light:'#7A7890', accent2Dark:'#282636', border:'#DCDCDA', borderS:'#B4B4B0', nav:'rgba(248,248,246,0.92)' },
  'paper-white-dark':     { bg:'#0E0E0C', bg2:'#181816', text:'#ECECEA', text2:'#A0A09E', muted:'#606060', accent:'#8A8898', accentLight:'#B0B0C0', accentDark:'#5A5868', accent2:'#8A8898', accent2Light:'#B0B0C0', accent2Dark:'#5A5868', border:'#242422', borderS:'#3C3C3A', nav:'rgba(14,14,12,0.92)' },

  /* ── Editorial / Dual-Accent ──────────────────────────────────────────── */
  /* accent = structural (section labels, links); accent2 = editorial (kicker, dates) */

  /* Financial Times */
  'ft-dark':        { bg:'#0D1A2E', bg2:'#121E34', text:'#F0EDE8', text2:'#4A6888', muted:'#4A6888', accent:'#90B4D8',  accentLight:'#0F5499', accentDark:'#90B4D8', accent2:'#CC4B37',  accent2Light:'#CC4B37', accent2Dark:'#CC4B37', border:'#1A3050', borderS:'#2A4870', nav:'rgba(13,26,46,0.92)'    },
  'ft-light':       { bg:'#FFF1E5', bg2:'#F5EAD8', text:'#0D1A2E', text2:'#8A7868', muted:'#8A7868', accent:'#0F5499',  accentLight:'#90B4D8', accentDark:'#0F5499', accent2:'#CC4B37',  accent2Light:'#CC4B37', accent2Dark:'#CC4B37', border:'#D8C8B8', borderS:'#B0A090', nav:'rgba(253,246,238,0.92)' },

  /* Kinfolk */
  'kinfolk-dark':   { bg:'#141A14', bg2:'#1A2018', text:'#EAE8E0', text2:'#4A6A4E', muted:'#4A6A4E', accent:'#8AAE8E',  accentLight:'#5A7A5E', accentDark:'#8AAE8E', accent2:'#D4806A',  accent2Light:'#B85C3A', accent2Dark:'#D4806A', border:'#243824', borderS:'#3A5038', nav:'rgba(20,26,20,0.92)'    },
  'kinfolk-light':  { bg:'#F4F0E8', bg2:'#EBE6DC', text:'#1A1410', text2:'#8A7A68', muted:'#8A7A68', accent:'#5A7A5E',  accentLight:'#8AAE8E', accentDark:'#5A7A5E', accent2:'#B85C3A',  accent2Light:'#D4806A', accent2Dark:'#B85C3A', border:'#CCC4B0', borderS:'#A8A090', nav:'rgba(244,240,232,0.92)' },

  /* Bloomberg Terminal */
  'terminal-dark':  { bg:'#050D07', bg2:'#0C1610', text:'#C8E8D0', text2:'#2A5838', muted:'#2A5838', accent:'#3AB85A',  accentLight:'#1A6B35', accentDark:'#3AB85A', accent2:'#C8860A',  accent2Light:'#C8860A', accent2Dark:'#C8860A', border:'#0E2814', borderS:'#1E4028', nav:'rgba(5,13,7,0.92)'     },
  'terminal-light': { bg:'#F0F8F2', bg2:'#E4F0E8', text:'#061008', text2:'#5A8068', muted:'#5A8068', accent:'#1A6B35',  accentLight:'#3AB85A', accentDark:'#1A6B35', accent2:'#C8860A',  accent2Light:'#C8860A', accent2Dark:'#C8860A', border:'#B8D8C0', borderS:'#90B8A0', nav:'rgba(240,248,242,0.92)' },

  /* Cereal */
  'cereal-dark':    { bg:'#0A1018', bg2:'#101820', text:'#E4E8EE', text2:'#3A5870', muted:'#3A5870', accent:'#7A9AB8',  accentLight:'#2E4A5E', accentDark:'#7A9AB8', accent2:'#C87070',  accent2Light:'#B07878', accent2Dark:'#C87070', border:'#162030', borderS:'#283848', nav:'rgba(10,16,24,0.92)'    },
  'cereal-light':   { bg:'#F2F4F8', bg2:'#E8ECF4', text:'#0E1820', text2:'#6A7A8A', muted:'#6A7A8A', accent:'#2E4A5E',  accentLight:'#7A9AB8', accentDark:'#2E4A5E', accent2:'#A86060',  accent2Light:'#C89898', accent2Dark:'#A86060', border:'#C0C8D4', borderS:'#9AA4B0', nav:'rgba(242,244,248,0.92)' },

  /* Monocle */
  'monocle-dark':   { bg:'#08101E', bg2:'#0E1A2A', text:'#EAECF4', text2:'#3A5888', muted:'#3A5888', accent:'#7A9AD4',  accentLight:'#1A2850', accentDark:'#7A9AD4', accent2:'#D4940A',  accent2Light:'#D4940A', accent2Dark:'#D4940A', border:'#142040', borderS:'#2A3860', nav:'rgba(8,16,30,0.92)'     },
  'monocle-light':  { bg:'#F0F2F8', bg2:'#E4E8F4', text:'#060E1E', text2:'#5A6A88', muted:'#5A6A88', accent:'#1A2850',  accentLight:'#7A9AD4', accentDark:'#1A2850', accent2:'#D4940A',  accent2Light:'#D4940A', accent2Dark:'#D4940A', border:'#BCC4D8', borderS:'#9098B8', nav:'rgba(240,242,248,0.92)' },

  /* Aesop */
  'aesop-dark':     { bg:'#0E100A', bg2:'#181A12', text:'#E8E4D8', text2:'#4A5A28', muted:'#4A5A28', accent:'#8A9A58',  accentLight:'#4A5A28', accentDark:'#8A9A58', accent2:'#C87848',  accent2Light:'#8A4A28', accent2Dark:'#C87848', border:'#202810', borderS:'#3A4020', nav:'rgba(14,16,10,0.92)'    },
  'aesop-light':    { bg:'#F5F2E8', bg2:'#EEE8D8', text:'#100E08', text2:'#7A7058', muted:'#7A7058', accent:'#4A5A28',  accentLight:'#8A9A58', accentDark:'#4A5A28', accent2:'#B85A28',  accent2Light:'#C87848', accent2Dark:'#B85A28', border:'#CCC4A8', borderS:'#A8A080', nav:'rgba(245,242,232,0.92)' },

  /* Wallpaper* */
  'wall-dark':      { bg:'#070C0C', bg2:'#0E1818', text:'#D8F0EE', text2:'#1E5A50', muted:'#1E5A50', accent:'#3AA898',  accentLight:'#1A5C54', accentDark:'#3AA898', accent2:'#C4840A',  accent2Light:'#8A5C08', accent2Dark:'#C4840A', border:'#122424', borderS:'#204040', nav:'rgba(7,12,12,0.92)'     },
  'wall-light':     { bg:'#EEF7F6', bg2:'#E0EFEE', text:'#0A1A18', text2:'#5A8C88', muted:'#5A8C88', accent:'#1A5C54',  accentLight:'#3AA898', accentDark:'#1A5C54', accent2:'#8A5C08',  accent2Light:'#C4840A', accent2Dark:'#8A5C08', border:'#B0D8D4', borderS:'#88B8B0', nav:'rgba(238,247,246,0.92)' },

  /* National Geographic */
  'natgeo-dark':    { bg:'#050A14', bg2:'#0C1220', text:'#D8E4F0', text2:'#1E4870', muted:'#1E4870', accent:'#4888B8',  accentLight:'#0E3A6E', accentDark:'#4888B8', accent2:'#D4A808',  accent2Light:'#A87808', accent2Dark:'#D4A808', border:'#0E1E30', borderS:'#1E3850', nav:'rgba(5,10,20,0.92)'     },
  'natgeo-light':   { bg:'#EDF3FB', bg2:'#E0ECF5', text:'#06101E', text2:'#5A7898', muted:'#5A7898', accent:'#0E3A6E',  accentLight:'#4888B8', accentDark:'#0E3A6E', accent2:'#C89808',  accent2Light:'#D4A808', accent2Dark:'#C89808', border:'#B8CCDE', borderS:'#90AABC', nav:'rgba(237,243,251,0.92)' },

  /* Orion */
  'orion-dark':     { bg:'#071210', bg2:'#0E1E1A', text:'#D0EAE2', text2:'#1A5040', muted:'#1A5040', accent:'#3A9878',  accentLight:'#1A6250', accentDark:'#3A9878', accent2:'#D4684C',  accent2Light:'#AA4434', accent2Dark:'#D4684C', border:'#102820', borderS:'#204838', nav:'rgba(7,18,16,0.92)'     },
  'orion-light':    { bg:'#EAF7F3', bg2:'#DAF0EA', text:'#081A14', text2:'#508870', muted:'#508870', accent:'#1A6250',  accentLight:'#3A9878', accentDark:'#1A6250', accent2:'#AA4434',  accent2Light:'#D4684C', accent2Dark:'#AA4434', border:'#A8D8C8', borderS:'#80B8A0', nav:'rgba(234,247,243,0.92)' },

  /* A24 */
  'a24-dark':       { bg:'#05080E', bg2:'#0A1020', text:'#D0D8E8', text2:'#1A3C68', muted:'#1A3C68', accent:'#4880B0',  accentLight:'#0E3460', accentDark:'#4880B0', accent2:'#C07830',  accent2Light:'#8A5018', accent2Dark:'#C07830', border:'#0C1828', borderS:'#1A2C48', nav:'rgba(5,8,14,0.92)'      },
  'a24-light':      { bg:'#EEF2FA', bg2:'#E2E8F4', text:'#060C18', text2:'#506888', muted:'#506888', accent:'#0E3460',  accentLight:'#4880B0', accentDark:'#0E3460', accent2:'#A86820',  accent2Light:'#C07830', accent2Dark:'#A86820', border:'#B4C4D8', borderS:'#8898B0', nav:'rgba(238,242,250,0.92)' },

  /* New Yorker */
  'ny-dark':        { bg:'#06091A', bg2:'#0C1028', text:'#E8E8DC', text2:'#1E3870', muted:'#1E3870', accent:'#4A72C0',  accentLight:'#1B2D45', accentDark:'#4A72C0', accent2:'#C89808',  accent2Light:'#A07800', accent2Dark:'#C89808', border:'#0C1030', borderS:'#1A2050', nav:'rgba(6,9,26,0.92)'      },
  'ny-light':       { bg:'#F0EEE4', bg2:'#E6E2D4', text:'#080C18', text2:'#4A6080', muted:'#4A6080', accent:'#1B2D45',  accentLight:'#4A72C0', accentDark:'#1B2D45', accent2:'#C89808',  accent2Light:'#C89808', accent2Dark:'#C89808', border:'#C8C4B4', borderS:'#A0A090', nav:'rgba(240,238,228,0.92)' },

  /* Heritage */
  'heritage-dark':  { bg:'#080C08', bg2:'#101810', text:'#E0E8DC', text2:'#1E3A28', muted:'#1E3A28', accent:'#5A8A68',  accentLight:'#2D4A3E', accentDark:'#5A8A68', accent2:'#C05A38',  accent2Light:'#8B3A2A', accent2Dark:'#C05A38', border:'#1E3020', borderS:'#1E2A1E', nav:'rgba(8,12,8,0.92)'      },
  'heritage-light': { bg:'#F0EFE8', bg2:'#E6E4D8', text:'#080A06', text2:'#5A7A68', muted:'#5A7A68', accent:'#2D4A3E',  accentLight:'#5A8A68', accentDark:'#2D4A3E', accent2:'#8B3A2A',  accent2Light:'#C05A38', accent2Dark:'#8B3A2A', border:'#C8C8BC', borderS:'#A0A090', nav:'rgba(240,239,232,0.92)' },

  /* Nocturne */
  'nocturne-dark':  { bg:'#080818', bg2:'#0E0E28', text:'#E4E4F0', text2:'#202060', muted:'#202060', accent:'#7070C8',  accentLight:'#2A2870', accentDark:'#7070C8', accent2:'#C08830',  accent2Light:'#7A4A18', accent2Dark:'#C08830', border:'#0E0E2A', borderS:'#1E1E48', nav:'rgba(8,8,24,0.92)'      },
  'nocturne-light': { bg:'#F2EFE8', bg2:'#E6E4F0', text:'#08080E', text2:'#5858A0', muted:'#5858A0', accent:'#2A2870',  accentLight:'#7070C8', accentDark:'#2A2870', accent2:'#7A4A18',  accent2Light:'#C08830', accent2Dark:'#7A4A18', border:'#C8C8D8', borderS:'#9898B8', nav:'rgba(240,239,246,0.92)' },

  /* Storm */
  'storm-dark':     { bg:'#0A0C14', bg2:'#101420', text:'#E4E8F2', text2:'#1E3050', muted:'#1E3050', accent:'#6A8AB0',  accentLight:'#3A506A', accentDark:'#6A8AB0', accent2:'#9A4880',  accent2Light:'#5A2A4A', accent2Dark:'#9A4880', border:'#101420', borderS:'#1E2438', nav:'rgba(10,12,20,0.92)'    },
  'storm-light':    { bg:'#F2F4F8', bg2:'#E8ECF4', text:'#0A0C18', text2:'#7890A8', muted:'#7890A8', accent:'#3A506A',  accentLight:'#6A8AB0', accentDark:'#3A506A', accent2:'#7A2A50',  accent2Light:'#9A4880', accent2Dark:'#7A2A50', border:'#C4C8D4', borderS:'#9898B0', nav:'rgba(242,244,248,0.92)' },

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
  { v:'newsprint-light', label:'Newsprint',       group:'Light'      },
  { v:'lithograph-light',label:'Lithograph',      group:'Light'      },
  { v:'celadon-light',   label:'Celadon',         group:'Light'      },
  { v:'folio-light',     label:'Folio',           group:'Light'      },
  { v:'duotone-light',   label:'Duotone',         group:'Light'      },
  /* Standard Dark */
  { v:'amber-dark',      label:'Amber',           group:'Dark'       },
  { v:'forest-dark',     label:'Forest',          group:'Dark'       },
  { v:'ink-dark',        label:'Ink Blue',        group:'Dark'       },
  { v:'clay-dark',       label:'Clay',            group:'Dark'       },
  { v:'slate-dark',      label:'Slate',           group:'Dark'       },
  { v:'burgundy-dark',   label:'Burgundy',        group:'Dark'       },
  { v:'newsprint-dark',  label:'Newsprint',       group:'Dark'       },
  { v:'lithograph-dark', label:'Lithograph',      group:'Dark'       },
  { v:'celadon-dark',    label:'Celadon',         group:'Dark'       },
  { v:'folio-dark',      label:'Folio',           group:'Dark'       },
  { v:'duotone-dark',    label:'Duotone',         group:'Dark'       },
  /* Signature */
  { v:'sig-verdigris',   label:'+ Verdigris',     group:'Signature'  },
  { v:'sig-forest',      label:'+ Forest',        group:'Signature'  },
  { v:'sig-navy',        label:'+ Navy',          group:'Signature'  },
  { v:'sig-oxide',       label:'+ Oxide',         group:'Signature'  },
  { v:'sig-steel',       label:'+ Steel',         group:'Signature'  },
  { v:'sig-prussian',    label:'+ Prussian',      group:'Signature'  },
  { v:'sig-slate-teal',  label:'+ Slate Teal',    group:'Signature'  },
  { v:'sig-plum',        label:'+ Plum',          group:'Signature'  },
  { v:'sig-indigo',      label:'+ Indigo',        group:'Signature'  },
  /* Greens */
  { v:'sig-hunter',      label:'+ Hunter',        group:'Greens'     },
  { v:'sig-sage',        label:'+ Sage',          group:'Greens'     },
  { v:'sig-malachite',   label:'+ Malachite',     group:'Greens'     },
  /* Others */
  { v:'sig-cobalt',      label:'+ Cobalt',        group:'Others'     },
  { v:'sig-mauve',       label:'+ Mauve',         group:'Others'     },
  { v:'sig-patina',      label:'+ Patina',        group:'Others'     },
  { v:'sig-amaranth',    label:'+ Amaranth',      group:'Others'     },
  { v:'sig-dusk',        label:'+ Dusk',          group:'Others'     },
  { v:'sig-vermilion',   label:'+ Vermilion',     group:'Others'     },
  /* Signature Dark (tinted bg) */
  { v:'sig-verdigris-dark',  label:'Verdigris Dark',  group:'Sig Dark' },
  { v:'sig-forest-dark',     label:'Forest Dark',     group:'Sig Dark' },
  { v:'sig-navy-dark',       label:'Navy Dark',       group:'Sig Dark' },
  { v:'sig-oxide-dark',      label:'Oxide Dark',      group:'Sig Dark' },
  { v:'sig-prussian-dark',   label:'Prussian Dark',   group:'Sig Dark' },
  { v:'sig-slate-teal-dark', label:'Slate Teal Dark', group:'Sig Dark' },
  { v:'sig-plum-dark',       label:'Plum Dark',       group:'Sig Dark' },
  { v:'sig-indigo-dark',     label:'Indigo Dark',     group:'Sig Dark' },
  { v:'sig-hunter-dark',     label:'Hunter Dark',     group:'Sig Dark' },
  { v:'sig-malachite-dark',  label:'Malachite Dark',  group:'Sig Dark' },
  { v:'sig-cobalt-dark',     label:'Cobalt Dark',     group:'Sig Dark' },
  { v:'sig-mauve-dark',      label:'Mauve Dark',      group:'Sig Dark' },
  /* Signature Dark – Amber Base */
  { v:'sig-verdigris-dark-a',  label:'Verdigris',  group:'Sig Dark Amber' },
  { v:'sig-forest-dark-a',     label:'Forest',     group:'Sig Dark Amber' },
  { v:'sig-navy-dark-a',       label:'Navy',       group:'Sig Dark Amber' },
  { v:'sig-oxide-dark-a',      label:'Oxide',      group:'Sig Dark Amber' },
  { v:'sig-prussian-dark-a',   label:'Prussian',   group:'Sig Dark Amber' },
  { v:'sig-slate-teal-dark-a', label:'Slate Teal', group:'Sig Dark Amber' },
  { v:'sig-plum-dark-a',       label:'Plum',       group:'Sig Dark Amber' },
  { v:'sig-indigo-dark-a',     label:'Indigo',     group:'Sig Dark Amber' },
  { v:'sig-hunter-dark-a',     label:'Hunter',     group:'Sig Dark Amber' },
  { v:'sig-malachite-dark-a',  label:'Malachite',  group:'Sig Dark Amber' },
  { v:'sig-cobalt-dark-a',     label:'Cobalt',     group:'Sig Dark Amber' },
  { v:'sig-mauve-dark-a',      label:'Mauve',      group:'Sig Dark Amber' },
  /* Bold Dark */
  { v:'bold-bottle',     label:'Bottle',          group:'Bold Dark'  },
  { v:'bold-ultra',      label:'Ultramarine',     group:'Bold Dark'  },
  { v:'bold-teal',       label:'Deep Teal',       group:'Bold Dark'  },
  { v:'bold-amber-wash', label:'Amber Wash',      group:'Bold Dark'  },
  { v:'bold-terra',      label:'Terracotta',      group:'Bold Dark'  },
  { v:'bold-olive',      label:'Olive',           group:'Bold Dark'  },
  { v:'bold-burg',       label:'Burgundy',        group:'Bold Dark'  },
  { v:'bold-cobalt',     label:'Electric Cobalt', group:'Bold Dark'  },
  { v:'bold-onyx',       label:'Onyx Dark',       group:'Bold Dark'  },
  /* Standard Grey/White */
  { v:'newsprint-grey-light', label:'Newsprint Grey',  group:'Light'  },
  { v:'newsprint-grey-dark',  label:'Newsprint Grey',  group:'Dark'   },
  { v:'paper-white-light',    label:'Paper White',     group:'Light'  },
  { v:'paper-white-dark',     label:'Paper White',     group:'Dark'   },
  { v:'bold-onyx-light', label:'Onyx Light',      group:'Light'      },
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
  uniform:   { hero:'amber-light',      work:'amber-light',      edu:'amber-light',      skills:'amber-light',      cta:'amber-light',       photo:'amber-light',      footer:'amber-light'      },
  signature: { hero:'amber-light',      work:'sig-verdigris',    edu:'sig-navy',         skills:'amber-light',      cta:'amber-light',       photo:'sig-verdigris',    footer:'amber-light'      },
  gradient:  { hero:'amber-light',      work:'sig-verdigris',    edu:'sig-navy',         skills:'slate-light',      cta:'sig-oxide',         photo:'sig-steel',        footer:'amber-dark'       },
  editorial: { hero:'amber-dark',       work:'sig-navy',         edu:'ink-dark',         skills:'amber-dark',       cta:'sig-verdigris',     photo:'bold-burg',        footer:'amber-dark'       },
  paper:     { hero:'newsprint-light',  work:'lithograph-light', edu:'folio-light',      skills:'celadon-light',    cta:'duotone-light',     photo:'amber-light',      footer:'newsprint-dark'   },
  patina:    { hero:'sig-patina',       work:'sig-verdigris',    edu:'sig-prussian',     skills:'sig-hunter',       cta:'sig-amaranth',      photo:'sig-malachite',    footer:'sig-plum'         },
};
