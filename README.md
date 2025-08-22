# Personality Development Quiz Application

A modern, self-contained personality assessment application built with Next.js and Material-UI. This application helps users understand their personality traits and provides personalized development suggestions.

## Features

- **Interactive Quiz Interface**: Smooth, animated question transitions with a progress indicator
- **Personality Assessment**: Based on the Big Five personality traits model
- **Real-time Analysis**: Instant calculation and visualization of personality traits
- **Development Suggestions**: Personalized recommendations based on dominant traits
- **PDF Download**: Download your result as a PDF directly from the result page
- **Email Sharing**: Share your quiz result with the host via email in one click
- **Responsive Design**: Works seamlessly across all devices
- **No Database Required**: Completely self-contained application

## Technical Features

- Built with Next.js 13+ and React 18+
- Material-UI for consistent, modern styling
- Framer Motion for smooth animations
- TypeScript for type safety
- Modular architecture for easy maintenance and scalability

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd agapequiz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /components        # React components
  /data             # Quiz questions and scoring logic
  /types            # TypeScript type definitions
  /utils            # Utility functions
  /public           # Static assets
```

## Quiz Structure

- 16 personality assessment questions
- Questions are randomly shuffled for each session
- Each question contributes to multiple personality traits
- Scoring system based on the Big Five personality traits:
  - Openness to Experience
  - Conscientiousness
  - Extraversion
  - Agreeableness
  - Emotional Stability

## Deployment

This application can be easily deployed to various platforms:

### Vercel (Recommended)
```bash
vercel
```

### Static Export
```bash
npm run build
npm run export
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
