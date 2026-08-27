# ClearPath Mobile Experience Design

## Product Direction

**ClearPath** is a private, local-first wellbeing companion for people who want more control over their screen habits and distance from compulsive adult-content use. It is intentionally original: rather than reproducing another product’s branding, copy, or feature layout, ClearPath centers a calm, secular, non-judgmental daily practice. The app contains no explicit content, does not function as a device-level blocker, and makes no medical or treatment claims.

The experience is designed for a **9:16 mobile portrait screen** and one-handed use. Its primary action is always placed in the lower half of the screen, common tap targets are at least 44 points, and every screen keeps a short, readable hierarchy. The visual language follows mainstream iOS conventions: large titles, rounded continuous cards, restrained shadows, segmented choices, sheets for focused actions, and a bottom tab bar for durable navigation.

## Screen List and Content

| Screen | Primary content | Core functionality |
|---|---|---|
| Today | A private day count, one supportive observation, a readiness check-in, and a clear “Reset now” action | Records a daily check-in and opens the urge-interruption flow. |
| Reset | A three-step 90-second grounding sequence, a breathing pace, and a short list of healthy next actions | Helps a user pause, choose an action, and record that they got through a difficult moment. |
| Journey | A seven-day activity strip, private milestones, recent check-ins, and reflections | Presents progress as a compassionate record rather than an all-or-nothing score. |
| Plan | An editable “When I feel pulled, I will…” routine with personal reasons and a support reminder | Lets users create a practical response plan stored only on the device. |
| Profile & Privacy | Local-data disclosure, preference toggles, a helpful-support notice, and destructive reset controls | Gives the user clear control over locally stored content and app preferences. |
| Check-in Sheet | Mood, intensity, context, and an optional short note | Saves a timestamped, local-only entry. |
| Win Sheet | A brief acknowledgement after the reset flow | Captures which healthy action the user chose and returns them to Today. |

## Key User Flows

The primary daily flow begins on **Today**. The user selects how steady they feel, optionally writes a note, and sees their entry reflected on the Journey screen. This creates an unobtrusive history without forcing a streak mentality.

The urgent flow begins when the user taps **Reset now** from Today or the Reset tab. ClearPath presents one short step at a time: pause and name the moment, take four slow breaths, then choose a small healthy action such as walking, drinking water, putting the phone away, or messaging a trusted adult. Completing the flow opens a win sheet where the user can record the chosen action.

The planning flow starts on **Plan**. The user writes a reason they want more control, identifies a common high-risk moment, and selects a replacement action. Their plan appears as a quick reminder in the Reset flow. They can revise or clear it at any time from Plan or Profile.

## Information and Privacy Model

All prototype data is kept **on-device** using local storage. ClearPath does not require an account, cloud sync, social feed, direct messaging, an AI companion, a payment flow, or access to device browsing history. The app should never imply that it can block content at the operating-system level. Its role is practical reflection and self-directed habit support.

The Profile screen includes a plain-language statement that ClearPath is a wellbeing tool, not a substitute for professional care. It encourages young users to talk to a trusted adult or qualified professional when they need more support. A clearly labeled local-data reset removes the user’s saved check-ins and plan after confirmation.

## Color Choices and Visual Style

ClearPath uses a grounded, calm identity that feels distinct from common neon "streak" apps. The core color is **Deep Spruce `#173F3A`**, giving the app a quiet, steady foundation. **Sea Glass `#8FD7C4`** serves as the hopeful active-state accent, while **Warm Sand `#F5F0E8`** keeps large surfaces soft and low-pressure. Main text uses **Ink `#18221F`** and secondary text uses **Slate `#66736F`**. A muted **Coral `#D86A5B`** appears only for high-intensity moments or destructive actions, not as a default accent.

Cards use warm white with a 1-point translucent border and 18–24 point continuous corner radii. Typography is system-native, with large, confident page headings and conversational body text. The icon motif is a **path through a horizon**, signaling forward motion without attaching moral judgment to a lapse or progress day.
