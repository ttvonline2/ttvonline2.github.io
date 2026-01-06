// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Get system theme preference and print log
const getSystemTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    console.log('System theme preference:', systemTheme);
    return systemTheme;
};

// Check for saved theme preference or default to system theme
const currentTheme = localStorage.getItem('theme') || getSystemTheme();
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle button click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-item').forEach((card, index) => {
    card.style.transition = `all 0.5s ease ${index * 0.05}s`;
    observer.observe(card);
});

document.querySelectorAll('.experience-item').forEach((card, index) => {
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

document.querySelectorAll('.project-card-modern').forEach((card, index) => {
    card.style.transition = `all 0.5s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Subtle fade-in for sections on scroll
const fadeElements = document.querySelectorAll('.experience-item, .project-card-modern, .skill-item');
fadeElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .active-link {
        color: #2563eb !important;
        position: relative;
    }
    .active-link::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #2563eb;
    }
`;
document.head.appendChild(style);

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// Export to PDF functionality
const exportPdfBtn = document.getElementById('exportPdfBtn');

exportPdfBtn.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set document properties
    doc.setProperties({
        title: 'Truong Tan Vang - CV',
        subject: 'Professional Resume',
        author: 'Truong Tan Vang',
        keywords: 'cv, resume, android, developer',
        creator: 'Portfolio Website'
    });
    
    const leftMargin = 20;
    const rightMargin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let yPos = 20;
    
    // Color palette
    const colors = {
        primary: [37, 99, 235],
        secondary: [71, 85, 105],
        accent: [239, 68, 68],
        text: [15, 23, 42],
        lightGray: [226, 232, 240],
        darkGray: [100, 116, 139]
    };
    
    // Helper function to check page overflow and add new page
    const checkPageOverflow = (requiredSpace = 10) => {
        if (yPos + requiredSpace > pageHeight - 20) {
            doc.addPage();
            yPos = 20;
            return true;
        }
        return false;
    };
    
    // Header with modern design (draw first)
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('TRUONG TAN VANG', leftMargin, 25);
    
    // Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    doc.text('Software Engineer | Android Developer', leftMargin, 35);
    
    // Load and add profile image (on top of header)
    const profileImg = document.getElementById('profileImage');
    console.log('Profile image element:', profileImg);
    console.log('Image src:', profileImg ? profileImg.src : 'not found');
    console.log('Image complete:', profileImg ? profileImg.complete : 'N/A');
    console.log('Natural height:', profileImg ? profileImg.naturalHeight : 'N/A');
    
    if (profileImg && profileImg.complete && profileImg.naturalHeight > 0) {
        try {
            // Create canvas and draw image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size to match image
            canvas.width = profileImg.naturalWidth;
            canvas.height = profileImg.naturalHeight;
            
            // Draw image to canvas
            ctx.drawImage(profileImg, 0, 0);
            
            // Get image data
            const imgData = canvas.toDataURL('image/png');
            console.log('Image data URL created, length:', imgData.length);
            
            // Position for profile image with aspect ratio
            const maxHeight = 35;
            const aspectRatio = profileImg.naturalWidth / profileImg.naturalHeight;
            const imgHeight = maxHeight;
            const imgWidth = imgHeight * aspectRatio;
            const imgX = pageWidth - rightMargin - imgWidth;
            const imgY = 10;
            
            // Draw white background rectangle
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(imgX - 1, imgY - 1, imgWidth + 2, imgHeight + 2, 2, 2, 'F');
            
            // Add image with correct aspect ratio
            doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
            
            // Draw blue border on top
            doc.setDrawColor(...colors.primary);
            doc.setLineWidth(1.5);
            doc.roundedRect(imgX - 1, imgY - 1, imgWidth + 2, imgHeight + 2, 2, 2, 'S');
            
            console.log('✓ Profile image added successfully to PDF!');
        } catch (error) {
            console.error('Error loading profile image:', error);
            // Draw placeholder circle if image fails
            const imgSize = 35;
            const imgX = pageWidth - rightMargin - imgSize;
            const imgY = 10;
            doc.setFillColor(200, 200, 200);
            doc.circle(imgX + imgSize/2, imgY + imgSize/2, imgSize/2, 'F');
        }
    } else {
        console.warn('Profile image not ready - complete:', profileImg?.complete, ', height:', profileImg?.naturalHeight);
        // Draw placeholder circle
        const imgSize = 35;
        const imgX = pageWidth - rightMargin - imgSize;
        const imgY = 10;
        doc.setFillColor(200, 200, 200);
        doc.circle(imgX + imgSize/2, imgY + imgSize/2, imgSize/2, 'F');
    }
    
    yPos = 60;
    doc.setTextColor(...colors.text);
    
    yPos = 60;
    doc.setTextColor(...colors.text);
    
    // Contact Information with icons
    doc.setFillColor(...colors.lightGray);
    doc.roundedRect(leftMargin, yPos, contentWidth, 20, 2, 2, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.secondary);
    
    const contactY = yPos + 7;
    
    // Location
    doc.setFont('helvetica', 'bold');
    doc.text('Location:', leftMargin + 5, contactY);
    doc.setFont('helvetica', 'normal');
    doc.text('Da Nang, Viet Nam', leftMargin + 20, contactY);
    
    // Phone
    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', leftMargin + 5, contactY + 6);
    doc.setFont('helvetica', 'normal');
    doc.text('+84 346602206', leftMargin + 20, contactY + 6);
    
    // Email
    doc.setFont('helvetica', 'bold');
    doc.text('Email:', pageWidth/2 + 5, contactY);
    doc.setFont('helvetica', 'normal');
    doc.text('truongtanvang@gmail.com', pageWidth/2 + 18, contactY);
    
    // LinkedIn
    doc.setFont('helvetica', 'bold');
    doc.text('LinkedIn:', pageWidth/2 + 5, contactY + 6);
    doc.setFont('helvetica', 'normal');
    doc.text('linkedin.com/in/truong-vang-a4b464134', pageWidth/2 + 23, contactY + 6);
    
    yPos += 28;
    
    // Section divider helper
    const addSectionTitle = (title) => {
        checkPageOverflow(15);
        doc.setFillColor(...colors.primary);
        doc.rect(leftMargin, yPos, 3, 7, 'F');
        
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.primary);
        doc.text(title, leftMargin + 6, yPos + 5);
        
        doc.setDrawColor(...colors.lightGray);
        doc.setLineWidth(0.5);
        doc.line(leftMargin + 6 + doc.getTextWidth(title) + 3, yPos + 3, pageWidth - rightMargin, yPos + 3);
        
        yPos += 12;
    };
    
    // Professional Summary
    addSectionTitle('PROFESSIONAL SUMMARY');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.text);
    const summary = 'Passionate software engineer with 7+ years of expertise in Android development and automotive systems. Proven track record of leading technical teams, architecting complex solutions, and delivering high-quality software for automotive OEMs including LG Electronics, Nissan, Renault, BMW, and Land Rover. Specialized in Android Automotive OS, embedded systems, and modern software architecture.';
    const summaryLines = doc.splitTextToSize(summary, contentWidth);
    doc.text(summaryLines, leftMargin, yPos);
    yPos += summaryLines.length * 5 + 8;
    
    // Core Skills with visual enhancement
    addSectionTitle('CORE COMPETENCIES');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const skills = [
        ['Java/Kotlin', 'C++', 'Python'],
        ['Android Automotive OS', 'Android SDK', 'QNX OS'],
        ['Linux Environment', 'Git', 'CI/CD Tools'],
        ['AIDL/Binder/IPC', 'Algorithm', 'Agile/ASPICE'],
        ['AI Tools', 'Github Copilot', 'System Architecture']
    ];
    
    skills.forEach((row, rowIndex) => {
        checkPageOverflow(10);
        row.forEach((skill, colIndex) => {
            const boxX = leftMargin + (colIndex * (contentWidth / 3));
            const boxY = yPos;
            
            doc.setFillColor(...colors.lightGray);
            doc.roundedRect(boxX, boxY, (contentWidth / 3) - 2, 7, 1, 1, 'F');
            
            doc.setTextColor(...colors.secondary);
            doc.setFont('helvetica', 'bold');
            doc.text(skill, boxX + 2, boxY + 5);
        });
        yPos += 9;
    });
    
    yPos += 5;
    
    yPos += 5;
    
    // Experience with modern card design
    addSectionTitle('PROFESSIONAL EXPERIENCE');
    
    const addExperience = (role, company, period, description, highlights, tech) => {
        checkPageOverflow(35);
        
        // Role and company
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.text);
        doc.text(role, leftMargin, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.primary);
        doc.text(company, leftMargin, yPos);
        
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...colors.darkGray);
        doc.text(period, pageWidth - rightMargin - doc.getTextWidth(period), yPos);
        yPos += 7;
        
        // Description
        if (description) {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(...colors.secondary);
            const descLines = doc.splitTextToSize(description, contentWidth);
            doc.text(descLines, leftMargin, yPos);
            yPos += descLines.length * 4 + 3;
        }
        
        // Highlights
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.text);
        highlights.forEach(item => {
            checkPageOverflow(10);
            doc.setTextColor(...colors.accent);
            doc.setFont('helvetica', 'bold');
            doc.text('>', leftMargin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.text);
            const lines = doc.splitTextToSize(item, contentWidth - 5);
            doc.text(lines, leftMargin + 4, yPos);
            yPos += lines.length * 4.5;
        });
        
        // Technologies
        yPos += 2;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.darkGray);
        doc.text('Technologies:', leftMargin, yPos);
        yPos += 4;
        
        doc.setFont('helvetica', 'normal');
        const techBadges = tech.split(', ');
        let xPos = leftMargin;
        techBadges.forEach((badge, index) => {
            const badgeWidth = doc.getTextWidth(badge) + 4;
            if (xPos + badgeWidth > pageWidth - rightMargin) {
                xPos = leftMargin;
                yPos += 6;
            }
            doc.setFillColor(240, 242, 245);
            doc.roundedRect(xPos, yPos - 3, badgeWidth, 5, 1, 1, 'F');
            doc.setTextColor(...colors.secondary);
            doc.text(badge, xPos + 2, yPos);
            xPos += badgeWidth + 2;
        });
        
        yPos += 8;
        
        // Divider line
        doc.setDrawColor(...colors.lightGray);
        doc.setLineWidth(0.3);
        doc.line(leftMargin, yPos, pageWidth - rightMargin, yPos);
        yPos += 6;
    };
    
    addExperience(
        'Function Architect (Android) - Coding Expert',
        'LG ELECTRONICS',
        'June 2024 - Present',
        '',
        [
            'Building new modules in Android services and apps across multiple automotive projects',
            'FOD Service (Features on Demand) for Nissan CDC project',
            'WebOS Projection for BMW (Rolls Royce) project',
            'Setup SWUT for GM modules (SystemUI, Settings, Keyboard, Vehicle Status)',
            'Technical management for HKMC, BMW, and GM projects'
        ],
        'Android Automotive OS, Architecture Design, WebOS, Developer Tools'
    );
    
    addExperience(
        'Functional Owner (Technical Leader)',
        'LG ELECTRONICS',
        'July 2023 - June 2024',
        'Project: AIVI – Nissan & Renault (Automotive)',
        [
            'Led team of 5 engineers on automotive project with 240 total members',
            'Maintained and developed HVAC, Seat, and Unit Services',
            'Designed and developed FoD Service from scratch based on customer requirements',
            'Successfully suggested Architecture and business logic for implementation'
        ],
        'Android Automotive OS, Binder, AIDL, IPC'
    );
    
    addExperience(
        'Android Developer',
        'LG ELECTRONICS',
        'June 2021 - July 2023',
        'Project: PIVI – Land Rover (Automotive)',
        [
            'Maintained and developed online media apps (Spotify, TuneIn, Deezer)',
            'Developed Cluster Service on automotive infotainment system',
            'Improved app performance through caching implementation',
            'Enhanced UX with dynamic background colors based on album artwork'
        ],
        'QNX OS, QT Framework, IPC, C++'
    );
    
    addExperience(
        'Embedded Software Developer',
        'DOOSAN Viet Nam',
        'June 2019 - June 2021',
        '',
        [
            'Developed Mini-Car Inspection System using Raspberry Pi and camera modules',
            'Created Temperature and Humidity Monitoring System with real-time data',
            'Built Xamarin mobile app for Wi-Fi control'
        ],
        'Xamarin C#, Raspberry Pi, C# WPF, IoT'
    );
    
    // Projects
    addSectionTitle('FEATURED PROJECTS');
    
    const addProject = (title, description, tech) => {
        checkPageOverflow(25);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.text);
        doc.text(title, leftMargin, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.secondary);
        const descLines = doc.splitTextToSize(description, contentWidth);
        doc.text(descLines, leftMargin, yPos);
        yPos += descLines.length * 4.5 + 3;
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...colors.darkGray);
        const techLines = doc.splitTextToSize('Technologies: ' + tech, contentWidth);
        doc.text(techLines, leftMargin, yPos);
        yPos += techLines.length * 4 + 6;
    };
    
    addProject(
        'Containerized Android on Automotive Linux',
        'Designed and implemented modern automotive architecture running Android 15 as LXC container on Yocto Linux OS for Qualcomm SA8155 platform. Provides better isolation, security, and maintainability with independent updates and enhanced system stability.',
        'Qualcomm SA8155, Yocto Linux, Android 15, LXC Container, Automotive'
    );
    
    addProject(
        'AI Massage Robot (Graduation Project)',
        'Developed AI-powered massage robot using backpropagation algorithm. Integrated Kinect sensor for human-back detection and processed input data (age, medical history, gender) to output precise position coordinates and movement timing.',
        'AI, Backpropagation, Kinect Sensor, Robotics'
    );
    
    // Education & Certificates
    addSectionTitle('EDUCATION & CERTIFICATIONS');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.text);
    doc.text('HCMC University of Technology and Education', leftMargin, yPos);
    yPos += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.secondary);
    doc.text('Bachelor of Engineering', leftMargin, yPos);
    doc.setFont('helvetica', 'italic');
    doc.text('2015 - 2019', pageWidth - rightMargin - 25, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.text);
    doc.text('Professional Certifications:', leftMargin, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.secondary);
    const certs = [
        'AI Coder Certification',
        'Coding Expert Certification',
        'Functional Architect Certification',
        'Best Member Award',
        'Best Project Award'
    ];
    
    const halfCerts = Math.ceil(certs.length / 2);
    certs.forEach((cert, index) => {
        checkPageOverflow(8);
        const xPosition = index < halfCerts ? leftMargin : pageWidth / 2 + 10;
        const yOffset = index < halfCerts ? index : index - halfCerts;
        doc.setTextColor(...colors.accent);
        doc.setFont('helvetica', 'bold');
        doc.text('+', xPosition, yPos + (yOffset * 5));
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.secondary);
        doc.text(cert, xPosition + 4, yPos + (yOffset * 5));
    });
    
    yPos += halfCerts * 5 + 5;
    
    // Footer with modern design
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(2);
    doc.line(leftMargin, pageHeight - 15, pageWidth - rightMargin, pageHeight - 15);
    
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkGray);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated from professional portfolio | truongtanvang@gmail.com', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Save the PDF
    doc.save('Truong_Tan_Vang_CV.pdf');
    
    // Show success message with better styling
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `;
    modal.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
        <div style="font-size: 18px; font-weight: 600; color: #10b981; margin-bottom: 8px;">CV Exported Successfully!</div>
        <div style="font-size: 14px; color: #6b7280;">Your professional CV has been downloaded</div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }, 2000);
});

console.log('Portfolio website loaded successfully! 🚀');
