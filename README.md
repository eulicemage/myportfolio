# Eulice Mage - Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. showcasing full-stack development projects and technical skills.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works seamlessly on all devices
- **Interactive Elements**: Typing animation, mouse-follow effects, and scroll-based animations
- **Project Showcase**: Dynamic project cards with images, tech stacks, and live demos
- **Contact Form**: Functional contact form with validation and user feedback
- **SEO Optimized**: Comprehensive meta tags for search engines and social media
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eulicemage/myportfolio.git
   cd myportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect and deploy your React app

## 📁 Project Structure

```
myportfolio/
├── public/
│   ├── images/          # Project images and assets
│   └── vite.svg         # Vite icon
├── src/
│   ├── components/
│   │   └── Portfolio.jsx    # Main portfolio component
│   ├── App.jsx               # App root component
│   ├── main.jsx              # Application entry point
│   ├── index.css             # Global styles and animations
│   └── App.css               # App-specific styles
├── index.html                # HTML template with SEO meta tags
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎨 Customization

### Adding New Projects
1. Add your project images to `public/images/`
2. Update the `projects` array in `src/components/Portfolio.jsx`:
   ```javascript
   {
     title: 'Your Project',
     description: 'Project description...',
     tech: ['React', 'Node.js', 'MongoDB'],
     image: '/images/your-project.png',
     live: 'https://your-project-demo.com',
     github: 'https://github.com/username/your-project',
     color: 'from-blue-500 to-purple-600',
     highlights: ['Feature 1', 'Feature 2']
   }
   ```

### Updating Skills
Modify the `skills` object in `src/components/Portfolio.jsx` to update your technical skills and proficiency levels.

### Customizing Colors
Update the Tailwind CSS configuration in `tailwind.config.js` to customize the color scheme.

## 📧 Contact Form Setup

The contact form is currently set up with a simulation. To make it fully functional:

1. **Option 1: EmailJS (Recommended)**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service and template
   - Update the form submission in `Portfolio.jsx` with your EmailJS credentials

2. **Option 2: Backend Integration**
   - Create a backend API endpoint (Node.js, PHP, etc.)
   - Update the form submission to call your API

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📱 Mobile Optimization

The portfolio is fully optimized for mobile devices with:
- Responsive navigation menu
- Touch-friendly buttons and interactions
- Optimized images and performance
- Proper viewport configuration

## 🚀 Performance Features

- **Lazy Loading**: Images load only when needed
- **Optimized Animations**: Hardware-accelerated CSS animations
- **Minimal Bundle**: Tree-shaking and code splitting
- **Fast Loading**: Optimized assets and caching

## 🌐 SEO Features

- **Meta Tags**: Comprehensive title, description, and keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Semantic HTML**: Proper HTML5 semantic structure
- **Structured Data**: Ready for schema markup implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Eulice Mage**
- Full Stack Developer
- Email: eulice.mage57@gmail.com
- GitHub: [@eulicemage](https://github.com/eulicemage)
- LinkedIn: [Eulice Mage V. Gonzales](https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/)

---

⭐ If you like this portfolio, consider giving it a star!
