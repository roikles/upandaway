/**
 * upandaway.js
 *
 * Lightweight vanilla js library that creates the 
 * popular scroll up to reveal menu pattern as seen
 * on sites such as medium.com
 *
 * Author: Rory Ashford
 * URL: http://github.com/roikles
 */


function addCssClass(element,cssClass,previousClasses){ 
    if(element.className !== previousClasses + ' ' + cssClass){
        element.className = previousClasses + ' ' + cssClass;
    } 
}


function resetCssClass(element,initElementClasses){
    element.className = initElementClasses;
}


function scrollDirection(delta){
    if(delta > 0){
        return 'up';
    } else {
        return 'down';
    }
}


function upAndAway(options){

    var targetElement       = options.element     || 'menu',
        hiddenClass         = options.hiddenClass || 'hidden-menu',
        showClass           = options.showClass   || 'show-menu',    
        element             = document.getElementsByClassName(targetElement)[0],
        initElementClasses  = element.className,
        elementHeight       = element.clientHeight;

    // Mouse Scroll Listener
    window.addEventListener('mousewheel', function(e){

        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if(scrollTop > elementHeight){
        
            if( scrollDirection( e.wheelDelta ) === 'up'){

               if(e.wheelDelta > 10){
                   addCssClass(element,showClass,initElementClasses);
               }

            } else if( scrollDirection( e.wheelDelta ) === 'down' ){

               if( e.wheelDelta < -10 ){
                   resetCssClass(element,initElementClasses);
                   addCssClass(element,hiddenClass,initElementClasses);
                }    

            }

        } else {
            resetCssClass(element,initElementClasses);
        }

    }); 

    // Listen for keypresses that make the browser scroll up:
    // Up Keys - 'up arrow (38)', 'page up (33)' , 'home (36)' 
    // Down Keys - 'down arrow (40)', 'page down (34)','End (35)'
    window.addEventListener('keydown', function(e){
        
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if(scrollTop > elementHeight){

            if(e.keyCode === 33 || e.keyCode === 36 || e.keyCode === 38){
                
                addCssClass(element,showClass,initElementClasses);

                //console.log('show menu');
            } else if(e.keyCode === 34 || e.keyCode === 35 || e.keyCode === 40){

                resetCssClass(element,initElementClasses);
                addCssClass(element,hiddenClass,initElementClasses);

            }
        }

    });


}


upAndAway({
    element: "nav",
    hiddenClass: 'nav--hidden',
    showClass: "nav--show",
});