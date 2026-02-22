# Sales Principles & MVP Refinement Strategy

Based on the provided principles, our current MVP is good but can be engineered to be *devastatingly effective*. We need to shift the focus from "Get your Astrology Reading" to "Here is the exact solution to your current pain, and the cost of inaction is staying stuck."

## Principle Mapping & Implementation

### 1. "Desire precedes logic. People buy futures / relief."
**Current State:** We ask for their pain (dissonance) but don't promise a specific future.
**Refinement:** The Teaser must clearly state the *future* they are buying. 
*Change:* Instead of just saying "Your reading is ready," we say: "The exact dates in 2026 when your financial gridlocks will break and your energy will restore are calculated."

### 2. "Specificity is credibility."
**Current State:** The Barnum teaser is generic ("You feel alone sometimes").
**Refinement:** The teaser needs hyper-specific markers that make them think "How did they know?".
*Change:* Generate highly specific (even if calculatedly vague) numbers in the fake loading screen and teaser. Example: "Analyzing 12 key astrological transits for the Water Dragon..." or "We detected a severe blockage in your Vocation Sector."

### 3. "The gap is the engine." (Tension between current state and desired state)
**Current State:** We ask what's wrong, but we don't widen the gap.
**Refinement:** After they select their pain point (e.g., "Feeling stuck"), the next screen shouldn't just be "Calculating". It should be a *Diagnosis Screen*.
*Change:* Add an interstitial step: "Diagnosis: You are operating at 30% capacity because your Fire Horse yearly energy is actively clashing with your inherited routines. You are treating a spiritual burnout with physical rest." This creates massive tension.

### 4. "Urgency must be real."
**Current State:** The 5,000₮ paywall has no urgency.
**Refinement:** The "Fire Horse" year only happens once every 60 years. 
*Change:* Add a realistic constraint. Example: "Your personalized alignment window is currently open. Because this calculation is resource-intensive for the Gemini Engine, this reading will only be held for the next 15 minutes." (Add a countdown timer on the payment page).

### 5. "The close is just permission."
**Current State:** The button says "Үр дүнг харах — 5,000₮" (See results).
**Refinement:** The button needs to grant permission to cross the gap.
*Change:* "Тийм, би гацаанаас гармаар байна — 5,000₮" (Yes, I want to get unstuck — 5,000₮).

---

## Technical Action Plan for `MysticForm`

1.  **Refactor the "Calculated/Teaser" Step:**
    *   Introduce the "Diagnosis Screen" (widen the gap).
    *   Inject hyper-specific wording based on their exact zodiac/element combo.
2.  **Refactor the Checkout / Paywall:**
    *   Implement a 15-minute countdown timer (Urgency).
    *   Change the CTA button text to be an emotional release (Permission), dynamically referencing their selected pain point.
3.  **Refine the Copy:** Ensure every single line of Mongolian text aligns with Dan Koe's "Main Character" vs "NPC" dissonance framework.
