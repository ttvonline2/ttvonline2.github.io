# My Skills Portfolio 🚀

A modern, responsive personal portfolio website to showcase your professional skills and expertise. Built with HTML, CSS, and JavaScript.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI** - Clean and professional interface with smooth animations
- **Interactive Navigation** - Smooth scrolling and mobile-friendly hamburger menu
- **Skills Showcase** - Organized skill cards with categories
- **Projects Section** - Display your featured projects with tags
- **Contact Links** - Easy-to-find social media and contact information
- **Scroll Animations** - Elements fade in as you scroll
- **Scroll-to-Top Button** - Quick navigation back to the top

## 🛠️ Technologies Used

- HTML5
- CSS3 (with modern features like Grid, Flexbox, and Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

## 📁 Project Structure

```
MySite/
│
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with all styling
├── script.js           # JavaScript for interactivity
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Option 1: View Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required

### Option 2: Deploy to GitHub Pages

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `your-username.github.io` (for user site) or any name (for project site)

2. **Initialize Git and Push Your Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal skills portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "main" branch as source
   - Click "Save"
   - Your site will be live at `https://your-username.github.io/your-repo-name/`

## 📝 Customization Guide

### 1. Update Personal Information

Edit `index.html` to customize:
- Your name in the navigation logo
- Hero section welcome message
- About section description
- Skills list (add/remove skills as needed)
- Project descriptions
- Contact links (email, GitHub, LinkedIn, Twitter)

### 2. Modify Colors

Edit `styles.css` root variables:
```css
:root {
    --primary-color: #6366f1;      /* Change primary color */
    --secondary-color: #8b5cf6;    /* Change secondary color */
    --dark-bg: #1e1b4b;            /* Change dark background */
    /* ... other colors ... */
}
```

### 3. Add Your Projects

In `index.html`, update the projects section:
```html
<div class="project-card">
    <h3>Your Project Name</h3>
    <p>Your project description</p>
    <div class="project-tags">
        <span>Technology 1</span>
        <span>Technology 2</span>
    </div>
</div>
```

### 4. Update Social Media Links

Replace placeholder URLs in the contact section:
```html
<a href="mailto:your.email@example.com">Email</a>
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourusername">LinkedIn</a>
<a href="https://twitter.com/yourusername">Twitter</a>
```

## 🎨 Skills Categories Included

- Programming Languages
- Web Development
- Database
- Tools & Technologies
- Soft Skills
- Other Skills

Feel free to add, remove, or modify categories based on your expertise!

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## 🌟 Advanced Features

The portfolio includes several interactive features:
- Intersection Observer for scroll animations
- Parallax effect on hero section
- Floating particles animation
- Active navigation link highlighting
- Smooth scroll behavior
- Mobile-responsive hamburger menu

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you have suggestions for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

If you have any questions or suggestions, feel free to reach out!

---

**Made with ❤️ and code**

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 🎯 Next Steps

1. ✅ Customize the content with your information
2. ✅ Update colors to match your personal brand
3. ✅ Add your actual projects
4. ✅ Update social media links
5. ✅ Deploy to GitHub Pages
6. 🔄 Share your portfolio with the world!

Happy coding! 🚀
