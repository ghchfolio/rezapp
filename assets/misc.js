function SetWindowTitle(title) {
   const defTitle = 'CHFolio';
   var el = document.getElementById('appTitle');
   el.textContent = defTitle + ' | ' + title || defTitle;
}

function ScrollToTop() {
   window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
}

function TechLogosWidget() {

   let boxes;

   //when animation ends, delay for a randnom no. of sec
   //then 'bounce' again
   function delayThenBounce() {
      seconds = [0, 1, 3, 5];
      const delay = (Math.floor(Math.random() * seconds.length)) * 1000;
      this.classList.remove('bounce-7');
      setTimeout(() => {
         this.classList.add('bounce-7');
      }, delay);
   }
   
   //add event listener only when element is present
   function _init() {
      if (document.getElementById('tech-logos-widget')) {
         boxes = document.getElementsByClassName('box');
         for (b of boxes) {
            b.addEventListener('animationend', delayThenBounce);
         }
      }
   }
   
   //remove event listners before component is destroyed
   function _cleanUp() {
      if (document.getElementById('tech-logos-widget')) {
         for (b of boxes) {
            b.removeEventListener('animationend');
         }
      }
   }

   return {
      init: function () {
         _init();
      },
      cleanUp: function () {
         _cleanUp();
      }
   }
}
