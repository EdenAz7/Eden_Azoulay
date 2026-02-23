document.addEventListener("DOMContentLoaded", function () {
    
    /* =========================
       NAVBAR SCROLL EFFECT & SMOOTH SCROLL
    ========================== */
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - navbarHeight + 10; // קצת מרווח
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // סגירת תפריט המובייל לאחר לחיצה
                const navbarToggler = document.querySelector(".navbar-toggler");
                const navbarCollapse = document.querySelector(".navbar-collapse");
                if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                    navbarToggler.click();
                }
            }
        });
    });

    /* =========================
       REVEAL ANIMATION ON SCROLL
    ========================== */
    const reveals = document.querySelectorAll(".reveal");

    function handleReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerBottom) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", handleReveal);
    handleReveal(); // הפעלה ראשונית

    /* =========================
       FORM SUBMISSION (Placeholder)
    ========================== */
    const form = document.getElementById("contact-form");
    const feedbackBox = document.getElementById("form-feedback");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            // כאן צריך להוסיף את הקוד ששולח את הנתונים לשרת (כמו ב-Google Apps Script מהדוגמה הקודמת)
            
            // סימולציה של שליחה:
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';

            setTimeout(() => {
                // הצגת הודעת הצלחה (דמה)
                feedbackBox.style.display = "block";
                feedbackBox.innerHTML = '<span class="text-success font-weight-bold">ההודעה נשלחה בהצלחה! ניצור קשר בהקדם.</span>';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'שליחת הודעה';
                
                // הסתרת ההודעה אחרי כמה שניות
                setTimeout(() => {
                     feedbackBox.style.display = "none";
                }, 5000);

            }, 2000); // מחכה 2 שניות כאילו זה נשלח
        });
    }
});