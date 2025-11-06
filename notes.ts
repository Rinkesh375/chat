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
