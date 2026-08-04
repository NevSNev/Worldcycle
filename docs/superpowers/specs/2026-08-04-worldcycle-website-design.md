# WorldCycle Research Website Design

## Objective

Build an English-language research project website for **WorldCycle: Self-Verifiable Reinforcement Learning for Long-Horizon Video World Models**. The site will follow the proven information architecture and polished single-page presentation of the supplied WorldCraft reference while establishing a distinct visual identity based on closed loops, reversible trajectories, and long-horizon consistency.

The website must work as a self-contained static site that can be opened locally or hosted on any ordinary static file server.

## Source Material

- `worldcraft.zip` supplies the interaction and information-architecture reference: fixed navigation, full-height hero, section reveals, method cards, synchronized video comparisons, result presentation, and copyable citation.
- `WorldCycle__Self_Verifiable_Reinforcement_Learning_for_Long_Horizon_Video_World_Models__arxiv_.zip` supplies the paper title, abstract, method description, benchmark description, quantitative results, figures, and citation metadata.
- `worldcycle_media.zip` supplies nine MP4 comparison videos grouped into three scenarios: composite action, long-term repetition, and rectangular closed-cycle motion. Each group compares WorldPlay, WorldCompass, and WorldCycle.

The paper is an anonymous submission and contains no public project, paper, code, or model URLs. The initial website will therefore identify the authorship as **Anonymous Submission** and will not render non-functional external-link buttons.

## Chosen Approach

Implement one static page using semantic HTML, modern CSS, and small, dependency-free JavaScript modules. Assets will be extracted into a predictable local directory structure. No package manager, build step, framework, analytics, backend, or network-dependent runtime will be required.

This approach is preferred because the reference is itself a compact static research page, the available content is fixed, and the primary interactions are scrolling, tabs, synchronized media playback, and citation copying.

## Visual Direction

The page will use a near-black navy background with cool blue, electric violet, and cyan accents. Circular paths, mirrored arcs, orbit-like strokes, and repeated phase markers will express WorldCycle's closed-action-cycle idea. The visual language must feel related in quality to WorldCraft without copying its amber palette or specific decorative motifs.

Typography will combine an editorial display face for the project title with a highly legible sans-serif face for body text and a monospaced face for compact labels and metric names. Font loading may use a remote enhancement, but the CSS must provide robust local fallbacks so the page remains readable offline.

Motion will be restrained: hero trajectory accents, scroll reveals, tab transitions, button feedback, and synchronized progress indicators. All animation must respect `prefers-reduced-motion`.

## Information Architecture

### 1. Navigation

A translucent fixed navigation bar will link to Overview, Method, CycleBench, Comparisons, Results, and Citation. It will hide while scrolling down and reappear while scrolling up. On narrow screens, links may horizontally scroll rather than introduce a complex menu.

### 2. Hero

The hero will contain the full paper title, a concise one-sentence value proposition, **Anonymous Submission**, and a visual closed-loop trajectory motif. A compact summary strip will surface three evidence points from the paper, including the reported reduction in state-returning drift, the four CycleBench task families, and annotation-free verification. Only claims that can be traced to the supplied manuscript will appear.

### 3. Abstract

The manuscript abstract will be presented in a centered editorial block with selective emphasis on reversible action cycles, spatial closure, temporal consistency, and CycleBench.

### 4. Method

The method section will explain the system as three ordered units:

1. Construct closed reversible cycles from ordinary action sequences.
2. Apply spatial closure and temporal consistency rewards.
3. Optimize the video world model with the cycle-consistent RL curriculum.

The supplied method figure will anchor this section. Compact cards will explain the two rewards and the spatial-warmup-to-joint-training schedule without reproducing dense paper prose.

### 5. CycleBench

CycleBench will be presented as four task cards: Reversible-Cycle, Closed-Cycle, Repeated-Cycle, and Cascaded-Cycle. The section will also identify the four scenario settings and the three principal state-consistency metrics. The supplied benchmark figure will provide the detailed visual explanation.

### 6. Video Comparisons

The nine videos will be organized into three tabs:

- Composite action
- Long-term repeated cycle
- Rectangular closed cycle

Each tab will show WorldPlay, WorldCompass, and WorldCycle in a responsive three-column comparison. Videos in the active group will restart together on a common cycle, remain muted and inline, pause outside the viewport, and offer replay on click. Labels and a progress indicator will make comparison state explicit.

If autoplay is blocked, the videos will remain visible with native controls or a clear replay affordance; content must not disappear.

### 7. Results

The results section will combine manuscript-backed headline metrics with the supplied quantitative figures. It will highlight improvements in state-returning consistency, composite-action accuracy, and preservation of visual quality. Metric direction indicators will be explicit so readers can interpret lower-is-better and higher-is-better results correctly.

### 8. Citation and Footer

The page will provide a BibTeX block based on the supplied manuscript title and anonymous authorship, with an accessible copy button and visible success feedback. The footer will state that the page is for an anonymous research submission and was built from the supplied project materials.

## Asset Pipeline

The implementation will extract only publishable site assets, excluding archive metadata, `.DS_Store`, and nested Git data. PDF figures will be rendered into web-friendly PNG or WebP images at a resolution suitable for desktop zoom while keeping page weight reasonable. Original MP4 files will be retained unless a compatibility or size issue is found during verification.

Planned structure:

```text
index.html
assets/
  figures/
  videos/
  icons/
styles/
  main.css
scripts/
  main.js
```

## Component Boundaries

- **Navigation controller:** active-section state and scroll-direction visibility.
- **Reveal controller:** intersection-based entrance effects with a no-animation fallback.
- **Comparison controller:** tab selection, active media group, synchronized restart, progress display, viewport pause, and replay.
- **Citation controller:** Clipboard API use with a selection/copy fallback and status announcement.

Each controller will fail independently. A JavaScript failure must not prevent the document, figures, or videos from being read and played through ordinary browser behavior.

## Responsive and Accessibility Requirements

- Semantic headings and landmark elements will preserve a logical document outline.
- Text, borders, and controls will meet practical contrast requirements on the dark background.
- All interactive elements will be keyboard reachable and have visible focus states.
- Video groups will collapse from three columns to one column on phones.
- Figures will remain legible through responsive sizing and optional click-to-open behavior if needed.
- The site will avoid horizontal page overflow at 320 px width.
- Reduced-motion preferences will disable decorative animation and smooth scrolling.
- Status changes such as citation copy success will be announced without relying on color alone.

## Verification

Verification will cover:

- Local static-server loading with no missing first-party assets.
- All six navigation targets and active-section behavior.
- All three comparison tabs and all nine videos.
- Synchronized restart, viewport pause, manual replay, and autoplay fallback.
- Citation copy success and fallback behavior.
- Desktop and phone-width layouts, including overflow checks.
- Keyboard navigation, focus visibility, reduced-motion behavior, and basic semantic inspection.
- A final visual pass against the WorldCraft reference for comparable polish while preserving WorldCycle's distinct identity.

## Explicit Non-Goals

- No invented author names, affiliations, publication venue, repository URL, paper URL, model URL, or demo URL.
- No backend, database, authentication, analytics, CMS, or form submission.
- No framework or build tooling unless a concrete browser-compatibility issue makes it necessary.
- No verbatim cloning of WorldCraft's color system, copy, or project-specific graphics.
