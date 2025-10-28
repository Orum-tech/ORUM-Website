document.addEventListener("DOMContentLoaded",()=>{
  // Fade-in animation
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
  },{threshold:0.1});
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

  // Mobile menu
  const menuBtn=document.getElementById('menuBtn');
  const nav=document.getElementById('navLinks');
  menuBtn.addEventListener('click',()=>{nav.style.display=nav.style.display==='block'?'none':'block';});

  // Contact form
  const form=document.getElementById("contactForm");
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const msg=document.getElementById("message").value;
    const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${msg}`);
    window.location.href=`mailto:orumofficial05@gmail.com?subject=Contact from ${name}&body=${body}`;
  });
});
