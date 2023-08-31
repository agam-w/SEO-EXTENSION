# SEO Tool
A chrome extension for SEO Tool

![screenshoot](/docs/images/ss1.png)

## Development

### Installations
```
npm install
```

### Run Dev Server
```
npm run dev
```
- dev server is for development with modern stack, building svelte components, and styling with tailwindcss. 
- dev server is cannot interact with chrome runtime api. So, please build the extension first to testing

### Build the extension
```
npm run build
```

The built version is located under `dist/` folder.

To install the extension:
- You need to enable developer mode
- Load unpacked
- Locate to the `dist/` folder
