# Mbishi Tech Shop - Modern E-Commerce Landing Page

A sleek, futuristic e-commerce landing page for "Mbishi Tech Shop" built with React and TailwindCSS.

## 🎨 Design Features

- **Dark Theme**: Premium dark navy (#0B0A1E) background with purple-gray cards
- **Modern UI**: Clean, minimal design with soft shadows and rounded corners
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth hover effects, scroll animations, and floating elements
- **Interactive Elements**: Live countdown timer, contact form, and WhatsApp integration

## 🚀 Technologies Used

- **React 18** - Frontend framework
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Google Fonts** - Poppins & Inter fonts

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mbishi-tech-shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Top navigation with timer
│   ├── Hero.js               # Hero section with CTA
│   ├── FeaturedProducts.js   # Featured products grid
│   ├── Discounts.js          # Discounted products
│   ├── NewArrivals.js        # New arrival products
│   ├── BlackFridayDeals.js   # Black Friday specials
│   ├── Testimonials.js       # Customer reviews
│   ├── CallToAction.js       # Contact form
│   ├── Footer.js             # Footer with social links
│   └── FloatingWhatsApp.js   # Floating WhatsApp button
├── App.js                    # Main app component
├── index.js                  # Entry point
└── index.css                 # Global styles & Tailwind imports
```

## 🎯 Features

### Navigation
- Fixed header with transparent background
- Live countdown timer for promotions
- Mobile-responsive hamburger menu
- Smooth scroll navigation

### Hero Section
- Full-width background with tech workspace image
- Gradient overlays for better text readability
- Call-to-action buttons with hover effects
- Verification badge

### Product Sections
- **Featured Products**: Popular items with hover animations
- **Discounts**: Special offers with discount badges
- **New Arrivals**: Latest products with "New" labels
- **Black Friday Deals**: Special pricing with neon borders

### Testimonials
- Customer reviews with star ratings
- Profile avatars
- Message buttons for each review
- Statistics section

### Contact Form
- Name, email, and product selection fields
- Form validation
- Success/error states
- WhatsApp integration

### Footer
- Company information
- Social media links with follower counts
- Glowing MBISHI logo
- Back-to-top button

## 🎨 Color Palette

- **Background**: `#0B0A1E` (Dark Navy)
- **Cards**: `#1C1A2E` (Deep Purple-Gray)
- **Text**: `#F3F4F6` (Soft White)
- **Primary Blue**: `#3B82F6` (Electric Blue)
- **Accent Purple**: `#8B5CF6` (Neon Purple)
- **Accent Orange**: `#F59E0B` (Orange/Yellow)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🚀 Deployment

To build the project for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 📞 Contact Integration

The WhatsApp button is configured to open a chat with a predefined number. Update the phone number in `FloatingWhatsApp.js`:

```javascript
const phoneNumber = '+1234567890'; // Replace with actual number
```

## 🎭 Customization

### Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  'dark-navy': '#0B0A1E',
  'card-purple': '#1C1A2E',
  // ... other colors
}
```

### Fonts
Change fonts in `public/index.html` and `tailwind.config.js`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet">
```

### Content
Update product information, testimonials, and other content in respective component files.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For support or questions, please contact us through the website's contact form or WhatsApp button.




