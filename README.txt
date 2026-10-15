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
