# Add Google Analytics

## Changes
- Load the existing Google Analytics measurement ID without hardcoding it in source control.
- Start analytics only when visitors allow analytics cookies.
- Track the initial visit and each in-app page change.
- Keep the existing cookie choices working and notify analytics immediately when consent changes.

## Technical details
- Add a small browser analytics helper using `gtag.js`.
- Add a router-aware tracker inside the existing app router.
- Expose the existing build-time measurement ID to the browser under a public Vite variable.
- Update the cookie consent component to emit consent changes.
- Verify compilation and browser behavior with consent accepted and rejected.
