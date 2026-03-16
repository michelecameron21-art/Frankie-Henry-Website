---
description: How to use Canva via Browser Automation
---

# Canva Automation Workflow

Since there is no direct API, we use the **Browser Subagent** to interact with Canva.

## 1. Connect to Canva
// turbo
1. Ask user for their Canva credentials (if not already logged in).
2. Use `browser_subagent` to navigate to `https://www.canva.com/login`.
3. Wait for the user to log in manually (or detect login success).

## 2. Create a Design
1. Navigate to "Create a Design".
2. Search for the template (e.g., "Presentation", "Instagram Post").
3. Select a blank or specific template.

## 3. Upload Assets
1. Use the browser to click "Uploads".
2. Upload generated images (from `generate_image`) and text.

## 4. Assemble
1. Drag and drop assets onto the canvas.
2. Use text tools to add the report content.
