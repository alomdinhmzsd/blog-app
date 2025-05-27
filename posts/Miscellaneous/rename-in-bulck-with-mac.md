"I have 20 PNG files in a folder on my Mac, and I want to rename them all at once by adding a prefix, so they follow a pattern like land-image1.png, land-image2.png, and so on. What’s the easiest way to do this by selecting them all together?"

You can easily do this on your Mac using the built-in **Finder batch rename** tool. Here's how to rename all your PNGs by adding a prefix like `land-image1.png`, `land-image2.png`, etc., all at once:

### ✅ Steps:

1. **Open the folder** with your PNG files.
2. **Select all 20 PNG files** (Cmd + A to select all).
3. **Right-click on the selection**, then choose **"Rename X items…"** from the context menu.
4. In the popup:

   - Choose **Format** from the dropdown.
   - Set **Name Format** to: `Name and Index`
   - Set **Where** to: `after name` or `before name` depending on preference (you’ll change the base name anyway).
   - In **Custom Format**, type: `land-image`
   - Set the **Start numbers at**: `1`

5. Click **Rename**.

### Example output:

```
land-image1.png
land-image2.png
...
land-image20.png
```

Let me know if you want it to include leading zeros like `land-image01.png` — that can be done too with a quick Terminal script.
