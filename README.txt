Top Circle Welcome V33

Deploy: upload index.html, app.js, styles.css, assets/, locales/ into the root of your GitHub Pages repository, preserving paths.

Changes from V18:
- Birthday Party and Custom Gift: shorter labels, aligned alongside icons
- Clear two-way outreach: official staff may initiate contact or the member can reach out directly; completing questions/conversation qualifies for avatar-frame reward
- Niki and WhatsApp are member-initiated contact channels; existing details/links are unchanged
- Reward timing: Mondays Beijing time (UTC+8); Monday completions are paid the following Monday
- Eight languages, original language resolution and RTL support preserved
- Static card styling (no gold moving sheen), gray single-line footer retained

V31 mobile fixes:
- Removed duplicate white inline step numerals from all embedded translations
- Preserved the two-column contact-card layout on phones while fitting long labels and actions
- Expanded the mobile contact grid across the full step-card width, including the step-number gutter
- Reduced both Niki and WhatsApp icons equally on narrow phones so the full channel names fit
- Replaced Step 01/02 and contact-card copy with concise mobile-safe wording
- Vertically centered both channel titles against their icons
- Shifted mobile card width from Niki to WhatsApp (44/56) to add safe space before the right border

V33 specification compliance fixes:
- External locale JSON files are the single source of translated copy
- Language priority follows URL parameter, saved preference, browser language, then English
- All visible UI, status messages, and accessibility labels are localized in eight languages
- Loading, success, failure, English fallback, and retry states are visible and accessible
- Arabic switches the document to RTL; failed locale loads reset consistently to English/LTR
- Interactive controls meet the 44 px touch-target requirement and include press feedback
- Localized contact labels wrap within their cards at 320–430 px without clipping or overlap
- Member Care now presents two alternative connection methods, a compact official-profile reference image, simplified contact cards, and synchronized copy in all eight languages

V35 Member Care refinements:
- Shortened the section and Method 01 headings in all eight languages
- Removed the secondary descriptions from the Niki and WhatsApp contact cards
- Centered both channel names and actions in equal-width, equal-height cards
- Vertically aligned the task heading with its bullet icon
- Kept Method 01 side-by-side on desktop and stacked its text above the official profile image on phones

V36 unified card rows:
- Rebuilt the official Niki profile reference as a compact horizontal information card
- Matched its rendered left and right edges to the two-card contact row at every tested width
- Reduced Niki and WhatsApp cards to one centered icon, platform name, and external-link arrow row
- Kept both contact cards equal at 72–78 px high and preserved their original links
- Kept the official profile text and image side-by-side on desktop and mobile
- Updated the affected labels in all eight languages

V37 copy cleanup:
- Removed the Official Niki Profile subtitle from the official profile card in every language
