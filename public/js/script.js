(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


//Tax switch
let taxSwitch = document.getElementById("switchCheckDefault");
    taxSwitch.addEventListener("click", () =>{
      let taxInfo = document.getElementsByClassName("tax-info");
        for(info of taxInfo) {
          if(info.style.display != "inline") {
                info.style.display = "inline";
          } else{
                info.style.display = "none";
          }
        }
    })


//filter
document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      // window.location.href = `/listings?category=${category}`;
    });
});


//Review form
function showReviewForm() {
  const form = document.getElementById('review-form');
  const link = event.target;
  form.style.display = 'block';
  link.style.display = 'none';  
  form.scrollIntoView({ behavior: 'smooth' });
  document.getElementById('comment').focus();
}


//Filter categories
document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.filter');
  const listingItems = document.querySelectorAll('.listing-item');

  filters.forEach(filter => {
    filter.addEventListener('click', function () {
      const category = this.dataset.category.toLowerCase();

      // Toggle active filter
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');

      // Show/hide listings
      listingItems.forEach(item => {
        const itemCategory = item.dataset.category.toLowerCase();

        if (category === 'all') {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else if (
          itemCategory === category ||
          itemCategory.includes(category)
        ) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  
    // Set 'All' as default active filter
    document.querySelector('.filter[data-category="all"]').classList.add('active');

    // Smooth scrolling for anchor links
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

    // Image lazy loading fallback for older browsers
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.card-img-top').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add error handling for broken images
    document.querySelectorAll('.card-img-top').forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/images/placeholder.jpg';
            this.alt = 'Image not available';
        });
    });

    
});


//Login password
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    if (isPassword) {
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
}


//For heart icon
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault(); 
        this.querySelector('i').classList.toggle('fa-solid');
        this.querySelector('i').classList.toggle('fa-solid');
        this.querySelector('i').classList.toggle('text-danger'); 
      });
    });
  });