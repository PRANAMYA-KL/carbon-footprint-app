// Modern Carbon Footprint App - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Form submission with loading animation
    const form = document.getElementById('carbonForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const loading = submitBtn.querySelector('.loading');
            
            // Show loading animation
            btnText.style.display = 'none';
            loading.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Add a small delay for better UX
            setTimeout(() => {
                form.submit();
            }, 500);
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all containers
    document.querySelectorAll('.container, .graph-container, .insight-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add input validation feedback
    document.querySelectorAll('input[type="number"], select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#4CAF50';
                this.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
            } else {
                this.style.borderColor = '#f44336';
                this.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add carbon value animation
    const carbonValue = document.querySelector('.carbon-value');
    if (carbonValue) {
        const finalValue = parseFloat(carbonValue.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const animateValue = () => {
            if (currentValue < finalValue) {
                currentValue += increment;
                carbonValue.textContent = currentValue.toFixed(2) + ' kg CO₂';
                requestAnimationFrame(animateValue);
            } else {
                carbonValue.textContent = finalValue.toFixed(2) + ' kg CO₂';
            }
        };
        
        setTimeout(animateValue, 500);
    }
    
    // Add tooltip functionality
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            });
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const form = e.target.closest('form');
            if (form) {
                const inputs = Array.from(form.querySelectorAll('input, select'));
                const currentIndex = inputs.indexOf(e.target);
                const nextInput = inputs[currentIndex + 1];
                
                if (nextInput) {
                    nextInput.focus();
                } else {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.click();
                    }
                }
            }
        }
    });
    
    // Add progress indicator for form
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress based on form completion
    if (form) {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const filledInputs = Array.from(inputs).filter(inp => inp.value.trim() !== '');
                const progress = (filledInputs.length / inputs.length) * 100;
                progressBar.style.width = progress + '%';
            });
        });
    }
    
    // Add success message animation
    const successMessages = document.querySelectorAll('.success-message');
    successMessages.forEach(msg => {
        msg.style.transform = 'translateY(-20px)';
        msg.style.opacity = '0';
        msg.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            msg.style.transform = 'translateY(0)';
            msg.style.opacity = '1';
        }, 100);
    });
    
    console.log('🌱 Carbon Footprint App - Enhanced JavaScript Loaded!');
});
