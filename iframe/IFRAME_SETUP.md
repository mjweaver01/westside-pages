# Iframe Implementation Guide

This guide explains how to embed your Westside Barbell pages in iframes on another website with automatic height adjustment.

## What's Been Set Up

1. **iframe-resizer Library**: Installed to handle automatic height adjustment
2. **BaseLayout Updates**: Added the iframe-resizer child script to all pages
3. **Example Implementation**: Created `iframe-implementation-example.html` showing how to embed the pages

## How It Works

### On Your Astro Pages (Child/Content)

- The `iframe-resizer` content window script is loaded in `BaseLayout.astro`
- This script communicates the page height to the parent window
- Pages automatically detect when they're running in an iframe

### On the Parent Site (Where iframes are embedded)

- The parent page loads the iframe-resizer parent script
- It listens for height messages from the child frames
- Automatically adjusts iframe height based on content

## Implementation Steps

### 1. Deploy Your Astro Site

First, deploy your Astro pages to your domain (e.g., `https://your-domain.com`)

### 2. Parent Site Setup

On the website where you want to embed the iframes:

#### Add the parent script to your HTML head:

```html
<script src="https://cdn.jsdelivr.net/npm/iframe-resizer@5.5.2/js/iframeResizer.min.js"></script>
```

#### Create iframes for your pages:

```html
<!-- Home Page -->
<iframe
  id="homeFrame"
  src="https://your-domain.com/"
  scrolling="no"
  style="width: 100%; border: none;"
  data-iframe-resizer='{"checkOrigin": false, "heightCalculationMethod": "max"}'
  title="Westside Barbell Home"
>
</iframe>

<!-- About Page -->
<iframe
  id="aboutFrame"
  src="https://your-domain.com/about"
  scrolling="no"
  style="width: 100%; border: none;"
  data-iframe-resizer='{"checkOrigin": false, "heightCalculationMethod": "max"}'
  title="Westside Barbell About"
>
</iframe>

<!-- Staff Page -->
<iframe
  id="staffFrame"
  src="https://your-domain.com/staff"
  scrolling="no"
  style="width: 100%; border: none;"
  data-iframe-resizer='{"checkOrigin": false, "heightCalculationMethod": "max"}'
  title="Westside Barbell Staff"
>
</iframe>
```

#### Initialize the iframe resizer:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  iFrameResize(
    {
      checkOrigin: false,
      heightCalculationMethod: 'max',
      onInit: function (iframe) {
        console.log('Iframe initialized:', iframe.id)
      },
      onResized: function (data) {
        console.log('Iframe resized:', data.iframe.id, 'Height:', data.height)
      },
    },
    'iframe'
  )
})
```

## Configuration Options

### Important iframe-resizer Options:

- `checkOrigin: false` - Allows cross-domain embedding
- `heightCalculationMethod: 'max'` - Uses the maximum height calculation
- `scrolling="no"` - Prevents internal scrollbars in the iframe

### Height Calculation Methods:

- `'bodyOffset'` - Uses document.body.offsetHeight
- `'bodyScroll'` - Uses document.body.scrollHeight
- `'documentElementOffset'` - Uses document.documentElement.offsetHeight
- `'documentElementScroll'` - Uses document.documentElement.scrollHeight
- `'max'` - Uses the maximum of the above methods (recommended)

## Testing Locally

1. Start your Astro dev server:

   ```bash
   npm run dev
   ```

2. Open `iframe-implementation-example.html` in your browser to see the implementation in action

3. The example uses `http://localhost:4321/` - change this to your actual domain when deploying

## Styling Tips

### Parent Site CSS:

```css
.iframe-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
}

iframe {
  width: 100%;
  border: none;
  display: block;
  min-height: 400px; /* Fallback height */
}
```

### Making iframes responsive:

```css
.responsive-iframe {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.responsive-iframe iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## Troubleshooting

### Common Issues:

1. **Height not adjusting**: Check browser console for errors and ensure both scripts are loaded
2. **Cross-origin errors**: Make sure `checkOrigin: false` is set
3. **Content cut off**: Try different `heightCalculationMethod` values
4. **Performance issues**: Consider lazy loading iframes that aren't immediately visible

### Debug Mode:

Add `log: true` to the iframe-resizer options to see detailed logs:

```javascript
iFrameResize(
  {
    log: true,
    checkOrigin: false,
    heightCalculationMethod: 'max',
  },
  'iframe'
)
```

## Browser Support

iframe-resizer supports:

- Chrome
- Firefox
- Safari
- Edge
- Internet Explorer 11+

## Security Considerations

- The `checkOrigin: false` setting allows any domain to embed your pages
- If you need to restrict embedding, remove this option and set up proper CORS headers
- Consider implementing additional security measures if needed

## Files Modified

1. `src/layouts/BaseLayout.astro` - Added iframe-resizer child script
2. `iframe-implementation-example.html` - Example implementation (can be deleted after reference)
3. `IFRAME_SETUP.md` - This documentation file

Your Astro pages are now ready to be embedded as iframes with automatic height adjustment!
