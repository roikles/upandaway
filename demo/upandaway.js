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

/**
 * [addCssClass takes a single element and adds a new class to previous classes]
 * @param {[object]} element         [array like object returned by something like getElementByClass]
 * @param {[str]} cssClass        [the new class string to be added]
 * @param {[str]} previousClasses [a string containing the initial classes of 'element']
 */
function addCssClass(element,cssClass,previousClasses){ 
    if(element.className !== previousClasses + ' ' + cssClass){
        element.className = previousClasses + ' ' + cssClass;
    } 
}

/**
 * [resetCssClass resets the element css classes back to their defaults]
 * @param {[obj]} element            [array like object returned by something like getElementByClass]
 * @param {[str]} initElementClasses [string that contains the initial element classes]
 */
function resetCssClass(element,initElementClasses){
    element.className = initElementClasses;
}

/**
 * [scrollDirection determines the scroll direction (up or down) of mousewheel]
 * @param  {[int]} delta   [description]
 * @return {[str]}         [returns]
 */
function detectScrollDirection(delta){
    
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var newPosition = 0;
    var oldPosition = 0;

    newPosition = this.getScrollPos();
            console.log(this.posNew);
            if ( this.posNew > this.posOld && this.posNew > this.minHeight ) this.stepSensor( false ); ;
            if ( this.posNew < this.posOld && this.posNew > this.minHeight ) this.stepSensor( true ); ;
            this.posOld = this.posNew;


    return direction;
}

//debounce function (thanks David Walsh: http://davidwalsh.name/javascript-debounce-function)
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * [upAndAway description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function upAndAway(options){

    var targetElement       = options.element     || 'menu',
        hiddenClass         = options.hiddenClass || 'hidden-menu',
        showClass           = options.showClass   || 'show-menu',    
        element             = document.getElementsByClassName(targetElement)[0],
        initElementClasses  = element.className,
        elementHeight       = element.clientHeight,
        timer               = null,
        lastScrollPause     = 0;


    var scrolling = function() {

        // the distance from teh top of the screen
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        // if not yet set scrolling.y is set to the distance from the top of the page
        if ( typeof scrolling.y == 'undefined' ) {
            scrolling.y = scrollTop;
        }

        var delta = scrolling.y - scrollTop;


        //IF DIRECTION CHANGES ISSUE PAUSE 

        // check if the user has stopped scrolling
        if(timer !== null) {
            clearTimeout(timer);    
            //console.log('scrollTop= '+scrollTop);
        }

        timer = setTimeout(function() {
            lastScrollPause = scrollTop; 
        }, 250);

        // If the distance a user has scrolled down the page
        // is greater than the height of the target element
        if(scrollTop > elementHeight){

            // If user scrolled up
            if(scrollTop < lastScrollPause){
                
                console.log('up');

                // IF the user scrolls up greater than 20px 
                // add the 'show' class
                if(lastScrollPause - scrollTop > 20){
                    addCssClass(element,showClass,initElementClasses);
                }

            // If user scrolled down  
            } else if (scrollTop > lastScrollPause) {

                console.log('down');
                resetCssClass(element,initElementClasses);
                addCssClass(element,hiddenClass,initElementClasses);  
            }
       
        }

    };


    window.addEventListener('scroll', scrolling);


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