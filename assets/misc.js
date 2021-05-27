function SetWindowTitle(str) {
   var el = document.getElementById('appTitle');
   el.textContent = str || 'Resume'
}

function ScrollToTop() {
   window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
}