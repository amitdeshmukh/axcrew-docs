# AxCrew Documentation

The official documentation website for [AxCrew](https://github.com/amitdeshmukh/ax-crew) - a no-code framework for building and managing crews of AI agents.

**Live site:** [axcrew.dev](https://axcrew.dev)

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [Fumadocs](https://fumadocs.vercel.app/) - Documentation engine
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
```

This generates a static site in the `out/` directory, ready for deployment to any static hosting provider.

## Project Structure

```
docs/
├── app/                    # Next.js app router
│   ├── docs/              # Documentation pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   └── landing/           # Landing page sections
├── content/docs/          # MDX documentation content
│   ├── core-concepts/
│   ├── advanced-features/
│   ├── examples/
│   └── reference/
├── lib/                   # Utilities
├── public/                # Static assets
└── scripts/               # Build scripts
```

## AI Agent Support

This documentation includes support for AI agent consumption:

- `/llms.txt` - Concise manifest with key concepts and links
- `/llms-full.txt` - Complete documentation in plain text

These files are generated at build time from the MDX content.

## Deployment

### Cloudflare Pages

1. Connect repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`

### Other Platforms

The static `out/` directory can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes to the MDX files in `content/docs/`
4. Submit a pull request

## License

MIT
