# Open WebUI - Frontend Only Version

## Overview

Open WebUI is a comprehensive web-based user interface for interacting with AI language models. Built with SvelteKit 5, it provides a feature-rich chat interface. **This is a frontend-only version** that runs entirely in the browser without a backend server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **SvelteKit 5**: Primary framework with static adapter for SPA deployment
- **Vite**: Build tool and development server
- **TypeScript**: Type-safe development with strict mode enabled
- **Tailwind CSS 4**: Utility-first styling with custom color system and typography plugins
- Decision: SvelteKit was chosen for its excellent developer experience, performance, and built-in SSR/SSG capabilities. The static adapter enables deployment as a pure SPA while maintaining routing capabilities.

**UI Components & Libraries**
- **TipTap**: Rich text editor for note-taking and content creation
- **CodeMirror 6**: Code editing with syntax highlighting for multiple languages
- **Chart.js**: Data visualization for analytics
- **XYFlow**: Node-based workflow/diagram visualization
- **bits-ui**: Accessible UI component primitives
- Decision: Component libraries were selected for accessibility and customization flexibility rather than using a monolithic UI framework.

**State Management**
- **Svelte Stores**: Native reactive state management using writable stores
- **Context API**: Component-level state sharing for i18n, user preferences, and configuration
- Key stores include: `user`, `config`, `settings`, `models`, `chatId`, `mobile`, `theme`
- Decision: Svelte's built-in store system provides sufficient reactivity without external state management libraries.

**Internationalization (i18n)**
- **i18next**: Translation framework with browser language detection
- **i18next-parser**: Extraction tool for translation keys
- Dynamic locale loading from `src/lib/i18n/locales/{locale}/translation.json`
- Decision: i18next provides mature i18n capabilities with good TypeScript support and community ecosystem.

### Styling & Theming

**CSS Architecture**
- Custom CSS variable system for theming (`--color-gray-*`, `--app-text-scale`)
- Dark mode support via class-based toggling
- Responsive design with mobile-first approach
- Custom font loading: Inter, Archivo, Mona Sans, InstrumentSerif, Vazirmatn
- Decision: CSS variables enable runtime theme switching without rebuilding styles.

### File Processing & Media

**Document Processing**
- PDF.js: Client-side PDF rendering and text extraction
- TurnDown: HTML to Markdown conversion
- HEIC to JPEG conversion support
- Multiple file format support (PDF, DOCX, code files, audio)
- Decision: Client-side processing reduces server load and improves privacy.

**Media Handling**
- Audio processing: MP3, WAV, OGG, M4A
- Video embedding support
- Image upload and display
- File size validation and formatting utilities

### AI & ML Features

**Text-to-Speech (TTS)**
- **Kokoro-JS**: Web-based TTS using ONNX Runtime
- Web Workers for background processing (`kokoro.worker.ts`)
- WebGPU/WASM backend detection for optimal performance
- AudioQueue system for sequential audio playback
- Decision: Client-side TTS maintains privacy and reduces API costs.

**Transformers & AI Models**
- **@huggingface/transformers**: Client-side model inference
- ONNX Runtime Web: Optimized neural network execution
- Support for multiple model backends (WebGPU, WASM)

### Data Management

**Chat & Conversation Management**
- Local chat history storage (browser-based)
- Folder organization for chats
- Tags and categorization system
- Export/import functionality
- Decision: Client-side storage enables offline capabilities and privacy.

### Code Features

**Code Editing & Display**
- Multiple language support via CodeMirror language packages
- Syntax highlighting with highlight.js
- Code block copying functionality
- Elixir and HCL language support
- Decision: CodeMirror 6 provides modern, extensible code editing with better performance than legacy editors.

### Development & Build

**Developer Experience**
- Hot Module Replacement (HMR) via Vite
- TypeScript strict mode for type safety
- ESLint + Prettier for code quality
- Source maps disabled in production for smaller builds
- Version tracking via Git commit hash
- Decision: Modern tooling improves developer productivity while maintaining production performance.

**Build Output**
- Static HTML generation with SPA fallback
- Minification disabled for easier debugging (can be enabled)
- Asset optimization and code splitting
- Version polling for update detection (60-second interval)

## Frontend-Only Mode

### API Handling

In this frontend-only version, all API requests are handled by SvelteKit hooks (`src/hooks.server.ts`) that return mock/stub responses. This allows the UI to function without a backend server.

**Key Features in Frontend-Only Mode:**
- ✅ UI fully functional with all components
- ✅ Local chat history in browser storage
- ✅ Client-side file processing
- ✅ Client-side TTS (Kokoro-JS)
- ✅ Internationalization (i18n)
- ✅ Theme switching
- ❌ No actual AI model inference (requires external API connection)
- ❌ No server-side data persistence
- ❌ No authentication/authorization
- ❌ No image generation
- ❌ No web search

### Connecting to External APIs

To enable AI chat functionality, you can configure external API connections:
- OpenAI-compatible APIs
- Ollama (local installation)
- Other LLM providers

Configure these in the application settings once running.

## External Libraries

**Utilities**
- uuid (v4): Unique identifier generation
- js-sha256: Cryptographic hashing
- dayjs: Date/time manipulation with localization
- yaml: YAML parsing for configurations
- file-saver: Client-side file downloads
- dompurify: XSS protection for HTML sanitization
- marked: Markdown parsing and rendering

**UI Enhancement**
- alpinejs: Lightweight interactivity framework
- svelte-confetti: Celebration animations
- panzoom: Image/diagram pan and zoom functionality

**Development Dependencies**
- @sveltejs/adapter-static: Static site generation
- i18next-parser: Translation key extraction
- eslint + prettier: Code quality tools
- sass-embedded: SASS compilation

## Running the Application

```bash
cd vite-main
npm install --legacy-peer-deps
npm run dev
```

The application will be available at http://localhost:5000

## Building for Production

```bash
cd vite-main
npm run build
```

The static build will be in `vite-main/build` directory, ready for deployment to any static hosting service.