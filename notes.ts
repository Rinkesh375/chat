/* 
# ------------------------------------------------------------
# Notes / Tips: Command → npx shadcn@2.5.0 add --all
# ------------------------------------------------------------
# 1️⃣ Purpose:
#    - Runs version 2.5.0 of the Shadcn CLI tool.
#    - Adds **all available Shadcn UI components** (e.g., Button, Card, Input)
#      into your current project’s `/components` directory.
#
# 2️⃣ Breakdown of the command:
#    - `npx` → Executes a package directly from npm without installing it globally.
#    - `shadcn@2.5.0` → Specifies the exact CLI version (2.5.0) to use.
#    - `add` → The CLI subcommand used to add one or more UI components.
#    - `--all` → Adds **every component** from the Shadcn UI library at once.
#
# 3️⃣ Typical usage flow:
#    - First, initialize your project with:
#         npx shadcn-ui@latest init
#    - Then, add all components using:
#         npx shadcn@2.5.0 add --all
#
# 4️⃣ What happens internally:
#    - Downloads component templates from Shadcn UI.
#    - Creates `/components/ui/` folder with prebuilt files.
#    - Sets up proper imports and Tailwind configuration for styling.
#
# 5️⃣ Useful notes:
#    - You can also add individual components:
#         npx shadcn@2.5.0 add button card input
#    - It’s best to use `shadcn-ui@latest` for updated releases.
#    - The CLI ensures consistent design across all components.
#
# 6️⃣ When npm asks: "√ How would you like to proceed?"
#    - This prompt appears if npm detects dependency version conflicts.
#    - The main options are:
#        a. `Use --legacy-peer-deps` → Ignores dependency version conflicts and installs anyway.
#        b. `Use --force` → Forces installation by overwriting dependency versions.
#        c. `Cancel` → Stops the installation process.
#    - Recommended: Use `--legacy-peer-deps` for temporary compatibility issues.
############################################################
*/




/* 
# ------------------------------------------------------------
# Notes / Tips: Understanding the `!` in → process.env.DATABASE_URL!
# ------------------------------------------------------------
# 🧩 Code Example:
#    import { drizzle } from 'drizzle-orm/neon-http';
#    export const db = drizzle(process.env.DATABASE_URL!);
#
# 1️⃣ What this does:
#    - Connects to the database using Drizzle ORM.
#    - `process.env.DATABASE_URL` reads the database URL from environment variables.
#    - The `!` tells TypeScript that `DATABASE_URL` will **definitely exist** at runtime.
#
# 2️⃣ Why the `!` is used:
#    - TypeScript thinks `process.env.DATABASE_URL` could be `undefined`.
#    - Without `!`, you’d get a type error:
#         Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
#    - The `!` removes this warning by asserting:
#         “Trust me, this value is not null or undefined.”
#
# 3️⃣ Real-life analogy:
#    - It’s like saying to TypeScript:
#         “Don’t worry, the milk is in the fridge 🥛 — I checked!”
#    - But if the milk isn’t actually there (variable missing), your code crashes.
#
# 4️⃣ Safer way to handle it:
#        if (!process.env.DATABASE_URL) {
#            throw new Error("DATABASE_URL is not defined");
#        }
#        export const db = drizzle(process.env.DATABASE_URL);
#
# 5️⃣ Summary:
#    - `!` = Non-null assertion operator.
#    - Removes compile-time errors but can cause runtime crashes if used blindly.
############################################################
*/



/* 
-------------------------------------------------------------------
📝 Explanation of Tailwind Classes:

1️⃣ text-muted-foreground  
   • Comes from the shadcn/ui theme or custom Tailwind config.  
   • Applies a softer (grayish) text color used for secondary text, 
     like descriptions or subtle info.  
   • Example: normal text = black, muted text = gray (#6b7280).  

2️⃣ text-balance  
   • A built-in Tailwind utility that uses `text-wrap: balance;`.  
   • Balances multi-line text so that line breaks look visually even.  
   • Helpful for headlines or centered paragraphs.

✅ Combined Effect: 
   The text will appear in a softer color and wrap neatly 
   with balanced line lengths.
-------------------------------------------------------------------
*/
