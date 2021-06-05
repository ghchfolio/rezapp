function Funk() {
   function sayHi() {
      console.log('Funk Hi')
   }

   function sayBye() {
      console.log('Funk Bye')
   }

   return {
      hi: function () {
         sayHi()
      },
      bye: function () {
         sayBye()
      }
   }
}

const Funk2 = (function() {
   function sayHi() {
      console.log('Funk2 Hi')
   }

   function sayBye() {
      console.log('Funk2 Bye')
   }

   return {
      hi: function () {
         sayHi()
      },
      bye: function () {
         sayBye()
      }
   }
})()