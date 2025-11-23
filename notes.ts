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








/*

 ------------------------------------------------------------
   🧾 Example: Next.js + tRPC + React Query (Server Prefetch + Client Hydration)
------------------------------------------------------------
📌 Purpose:
   - Prefetch agents data from backend using tRPC on the server.
   - Dehydrate the cache so the client gets data instantly on load.
   - Prevents extra API calls and improves performance.
------------------------------------------------------------

import AgentsView from "@/modules/agents/ui/views/agents-view"; // 👇 Client component that displays agents
import { getQueryClient, trpc } from "@/trpc/server"; // 👇 tRPC + query client helpers for server-side fetching
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"; // 👇 React Query hydration utilities

export default async function Page() {
  🧠 Create a new React Query client instance (server-side)
     👇 This client temporarily stores prefetched data for React Query. 
 
  const queryClient = getQueryClient();

  🚀 Prefetch the tRPC query before rendering the page
     - trpc.agents.getMany.queryOptions() gives the query key + function.
     - prefetchQuery() runs the fetch and caches the data.
     - 'void' means we’re not awaiting since this is a background process.
  
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  💾 Return the HydrationBoundary wrapper
     - dehydrate(queryClient) converts the cached data to JSON.
     - The client (React) rehydrates it automatically using React Query.
     - <AgentsView /> is wrapped so it instantly gets cached data.
 
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AgentsView />  💡 Client component reading hydrated data }
    </HydrationBoundary>
  );
}



*/




/*
=============================================
📘 GLOBAL STYLE NOTES — Tailwind @layer base
=============================================

@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

@layer base:
• Tailwind CSS provides 3 main style layers — base, components, and utilities.
• The 'base' layer is used for defining global styles that apply to HTML elements before utilities.

This code defines a base-level rule for button-like elements.
It ensures that any interactive (non-disabled) button or element with a 'role="button"' 
shows the hand pointer cursor when hovered — providing a consistent user experience.

----------------------------------------------------
🎯 Selector Explanation:
- Targets all <button> elements that are not disabled.
- Also targets any element with role="button" that is not disabled.
- The :not(:disabled) pseudo-class ensures that elements marked as disabled are excluded from this rule.

----------------------------------------------------
💡 Property Explanation:
- 'cursor: pointer;' changes the mouse cursor to a hand icon 
  when hovering over clickable elements.
- This visually indicates interactivity for better UX.
----------------------------------------------------
*/





/*
==========================================================
📘 TYPESCRIPT NOTES — Extracting Item Type from Array
==========================================================

export type Users = { name: string; age: number }[];

// Extracting the type of ONE item using array indexing:
export type User = Users[number];

----------------------------------------------------------
🎯 What is `Users[number]` ?
----------------------------------------------------------

• In TypeScript, `ArrayType[number]` means:
  “give me the type of a single element inside this array”.

• If Users = {name: string; age: number}[]
  Then Users[number] = {name: string; age: number}

• It works for ANY array type:
      string[]       → string
      number[]       → number
      Product[]      → Product
      Meeting[]      → Meeting

----------------------------------------------------------
📌 Why use this?
----------------------------------------------------------

• It avoids duplicating the item type.
• If you ever update the array shape,
  the single-item type updates automatically.

Example:
const u: User = {
  name: "Rinkesh",
  age: 22
};

Here `u` is ONE object of the array type `Users`.

----------------------------------------------------------
💡 Mental Model (Super Simple):
----------------------------------------------------------

If:
   X = Something[]

Then:
   X[number] = Something

So,
   Users[number] = {name: string; age: number}

----------------------------------------------------------
🎉 Summary
----------------------------------------------------------

• `Type[]` → an array of Type  
• `Type[number]` → ONE element from that array  
• Very useful for APIs, DB results, and strongly typed lists.
----------------------------------------------------------
*/





/*
===========================================================
📘 NOTES — Understanding `as keyof typeof marks`
     (Explained using a simple "marks" example)
===========================================================

🔹 Example Object:
-----------------------------------------------------------
const marks = {
  math: 95,
  science: 88,
  english: 92,
};

This object maps:
subject → marks obtained

-----------------------------------------------------------
🎯 Problem
-----------------------------------------------------------
Suppose we have:

const subject = row.subject;  // comes from API/DB
// subject has type: string

If we try:
marks[subject]

❌ TypeScript Error:
"string is not a valid key of marks"

Why?
Because valid keys are:
"math" | "science" | "english"

TypeScript does NOT know that `subject` 
will always be one of these.

-----------------------------------------------------------
🎯 Solution — Casting
-----------------------------------------------------------
marks[subject as keyof typeof marks]

We tell TypeScript:
👉 "Trust me — this subject IS one of the valid keys."

-----------------------------------------------------------
🔍 Breakdown: keyof typeof marks
-----------------------------------------------------------

1. typeof marks  
   - Gives the TYPE of the object:
     {
       math: number,
       science: number,
       english: number
     }

2. keyof typeof marks  
   - Extracts ONLY its keys:
     "math" | "science" | "english"

So we are telling TypeScript:
"This string will definitely be math OR science OR english."

-----------------------------------------------------------
📌 Final Result
-----------------------------------------------------------
const score = marks[subject as keyof typeof marks];

- TypeScript stops complaining.
- You safely access the correct marks.
- No errors even though subject is originally typed as `string`.

-----------------------------------------------------------
💡 Plain English (Super Simple)
-----------------------------------------------------------
If TypeScript thinks `subject` is ANY string,
it does NOT allow you to access:

marks[anyString]

So we force TypeScript to treat it like:

marks["math" | "science" | "english"]

by writing:
subject as keyof typeof marks

===========================================================
*/

