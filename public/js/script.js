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
      window.location.href = `/listings?category=${category}`;
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
