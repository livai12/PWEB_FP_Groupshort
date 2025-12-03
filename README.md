# GroupMatch - Drag & Drop Learning Game

An interactive educational platform for creating and playing drag-and-drop matching games, similar to Wordwall.

## Features

- 🎮 **Drag & Drop Interface** - Intuitive drag-and-drop mechanics for categorizing items
- 📝 **Create Lessons** - Easy-to-use lesson creator to design custom matching activities
- 🎯 **Instant Feedback** - Real-time scoring and visual feedback for correct/incorrect placements
- 📚 **Lesson Browser** - Browse and filter lessons by category and difficulty
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Beautiful UI** - Modern, colorful interface designed for learning

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/group-match.git
cd group-match

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Play a Lesson**: Navigate to "Browse Lessons" and select a lesson to play
2. **Create a Lesson**: Click "Create Lesson" to design your own matching activity
3. **Drag Items**: Drag items from the left bank to the correct groups on the right
4. **Submit & Score**: Submit your answers to see your score and feedback

## Project Structure

\`\`\`
group-match/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── play/[id]/page.tsx   # Game play page
│   ├── lessons/page.tsx      # Lessons browser
│   └── create/page.tsx       # Lesson creator
├── components/
│   ├── ui/                   # UI components (shadcn/ui)
│   └── drag-drop-game.tsx    # Main game component
└── public/                   # Static assets
\`\`\`

## Deployment

### Deploy to Vercel

\`\`\`bash
# Push to GitHub
git push origin main

# Connect your repository to Vercel and auto-deploy
# Visit vercel.com and import your GitHub repository
\`\`\`

### Deploy to GitHub Pages (Static Export)

1. Update `next.config.mjs`:
   \`\`\`javascript
   const nextConfig = {
     output: 'export',
   };
   export default nextConfig;
   \`\`\`

2. Build and deploy:
   \`\`\`bash
   npm run build
   git add out/
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   \`\`\`

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Icon library

## Features in Detail

### Drag & Drop Game
- Shuffle items to prevent memorization
- Visual feedback for drag operations
- Color-coded groups for easy identification
- Automatic validation on submit
- Retry functionality with item reshuffling

### Lesson Creator
- Add unlimited groups and items
- Customize group names and colors
- Preview lessons before publishing
- Export lesson data as JSON

### Scoring System
- Accurate hit/miss tracking
- Percentage-based scoring
- Encouraging messages based on performance
- Retry option for improvement

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue or contact the maintainers.

---

Made with ❤️ for educators and learners
