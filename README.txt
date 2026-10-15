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

V38 Member Care headline and introduction:
- Reframed the message around completing the conversation before earning the reward
- Updated the title and introduction in all eight languages
- Kept the short gold reward phrase together without manual line breaks
- Tuned the mobile headline size for natural wrapping from 320 px upward

V39 Member Care eligibility and contact actions:
- Added a centered eligibility badge for users who newly became Top Circle members in October 2026
- Localized the eligibility restriction across the existing eight languages only
- Positioned the badge between the avatar-frame preview and the connection-task instructions
- Restyled the Niki and WhatsApp entries as compact borderless buttons with larger icons and clearer hover feedback
- Preserved the existing links, side-by-side layout, reward rules, and all non-Member-Care sections

V40 inline Member Care eligibility notice:
- Removed the year from the eligibility restriction in all eight supported languages
- Moved the notice directly below the connection-task heading and before its explanatory copy
- Replaced the badge treatment with a plain, left-aligned, soft-gold line at font-weight 700
- Forced the eligibility copy to remain on one line and hid its calendar icon on mobile
- Tuned narrow-screen typography to preserve the full localized sentence without horizontal overflow

V41 Member Care instruction-copy alignment:
- Aligned both instruction lines to the rule container edge while keeping the heading position unchanged
- Restored a subtle gold-brown highlight behind the eligibility text only
- Reduced only the internal gap between the eligibility and helper lines by 5 px on mobile
- Updated the helper sentence across all eight supported languages
- Preserved the surrounding spacing, task cards, contact buttons, and non-Member-Care sections
