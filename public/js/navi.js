
/*!
 * HUGE : NavExcercis
 * Fredie J. June.6.15:Sat v0.1
 */
 /*
   
*/

var init = function(){


  // Variables - Variables available throughout the scope of this object
  // -------------------------------------------------------------------
  var navData,
      $navWrapper,
      $navWrapper = document.getElementById('navigation-links'),
      $navLinks,
      $subNavHeight,
      $subNavExpand,
      $subNavWrapper,

      $mobileMenuOpen = false,
      $menuBtn,
      $homeBtn,
      $closeBtn,
      $siteCover,
      $mainWrapper;
      



     

    /* POPULATE DATA : BEGIN */


   loadJSON(function(response) {
      navData = JSON.parse(response);
      
      console.log(navData.items);
      console.log(navData.items.length);
     
      
     for (var navItem = 0; navItem < navData.items.length; navItem++) {

        var linkBox = document.createElement( 'div' );  
        linkBox.className = "nav-btn";


        var linkSubBox = document.createElement( 'div' );
        var linkSubBoxHolder = document.createElement( 'div' );

        linkSubBox.className = "sub-nav-holder";
        linkSubBox.id = "sub-nav-"+navItem;

        linkSubBoxHolder.className = "sub-nav-holder-wrapper";
        linkSubBoxHolder.id = "sub-nav-wrap-"+navItem;
        

        var linkBoxContent = '<a id="nav-'+navItem+'"data-sub-wrapper="sub-nav-wrap-'+navItem+'" data-sub-holder="sub-nav-'+navItem+'" href="'+navData.items[navItem].url+'">'+navData.items[navItem].label+'</a>';

        linkBox.innerHTML = linkBoxContent;
        $navWrapper.appendChild(linkBox);
         

        

        if(navData.items[navItem].items.length > 0){
            linkBox.className = "nav-btn with-sub";
            linkSubBox.appendChild(linkSubBoxHolder);
            for (var navSubItem = 0; navSubItem < navData.items[navItem].items.length; navSubItem++) {
                  
                  var a = document.createElement('a');
                  var linkText = document.createTextNode(navData.items[navItem].items[navSubItem].label);
                  a.appendChild(linkText);

                  a.setAttribute('target',"_blank");
                  a.setAttribute('data-sub-holder',"sub-nav-"+navItem);
                  a.title = navData.items[navItem].items[navSubItem].label;
                  a.href = navData.items[navItem].items[navSubItem].url;

                  linkSubBoxHolder.appendChild(a);


            };
             

            linkBox.appendChild(linkSubBox);
        }

      }

     /* POPULATE DATA : END */ 


     /* NAVIGATIO ROLLOVERS : BEGIN */
      
      var elements = document.getElementsByClassName('with-sub');
      if($windowWidth > 900){
          for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('mouseover', function(event) {navRollIn();}, false);
            elements[i].addEventListener('mouseout', function(event) {navRollOut();}, false);
            elements[i].addEventListener('click', function(event) {navRollOut();}, false);
        }
      }else if($windowWidth < 901){
          var currOpen;
          for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', function(event) {
                if(event.target != currOpen){
                  navRollOut(currOpen);

                  navRollIn();
                  currOpen = event.target;
                }else{
                    if($subNavHeight > 0){
                      navRollOut();
                      currOpen = event.target;
                     
                    }else{
                      navRollIn();
                      currOpen = event.target;
                      
                    }
                     
                }
            }, false);

          }
            
      }
        
      function navRollIn(){
         $subNavExpand = event.target.getAttribute('data-sub-holder');
         $subNavWrapper = event.target.getAttribute('data-sub-wrapper');
         if($windowWidth < 901){

            event.target.style.backgroundImage="url('images/arrow-up.png')";
         }
         
         if($subNavHeight == null){
           $subNavHeight = document.getElementById($subNavWrapper).offsetHeight;
           document.getElementById($subNavExpand).style.height= ($subNavHeight+12)+"px";
         }
      }
      function navRollOut(){
         if(window.getComputedStyle(event.target).backgroundColor != "rgb(255, 255, 255)"){
               if($subNavHeight >0){
                $subNavHeight = null;
                 document.getElementById($subNavExpand).style.height= "0px";
                 if($windowWidth < 901){
                    event.target.style.backgroundImage="url('images/arrow-down.png')";
                 }
                 
               }
           }
      } 
      
    
    });
    /* NAVIGATIO ROLLOVERS : END */

  
}
  // FUNCTIONS
  // ===================================================================
  // ===================================================================
  // ===================================================================

  var loadJSON = function( callback ){
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', '/api/nav.json', true); 
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);  
  }

  var viewportChecking = function(){
      $win = window,
      $docu = document,
      $docuEl = $docu.documentElement,
      $bodyEl = $docu.getElementsByTagName('body')[0],
      $windowWidth = $win.innerWidth || $docuEl.clientWidth || $bodyEl.clientWidth;
      

      
     
     
  }
  var settingButtons  = function(){
      viewportChecking();

      $mobilMenu = document.getElementById('mobile-menu'),
      $navWrapper = document.getElementById('navigation-links'),
      $mainWrapper = document.getElementById('main-holder');
      $siteCover = document.getElementById('site-cover');
      $menuBtn = document.getElementById('mobile-menu');
      $homeBtn = document.getElementById('btn-home');
      $closeBtn = document.getElementById('mobile-menu-close');

      
      
      



      if($windowWidth < 901){
      /*----*/

          $mobilMenu.addEventListener("click", function(){
              openMobileMenu();
              $mobileMenuOpen = true;
          });

          $closeBtn.addEventListener("click", function(){
              closeMobileMenu();
              $mobileMenuOpen = false;  
          });

          $siteCover.addEventListener("click", function(){
              closeMobileMenu();
              $mobileMenuOpen = false;  
          });





      /*-----*/
      }

      var openMobileMenu = function(){
          $navWrapper.className += " " + "menu-on";
          $mainWrapper.className += " " + "content-off";
          $siteCover.className += " " + "cover-site";
          $siteCover.style.visibility='visible';

          $menuBtn.className += " " + "hamburger-out";
          $homeBtn.className += " " + "home-btn-in";
          $closeBtn.className += " " + "close-in";

          document.body.style.overflowY = "hidden";
          document.body.style.overflowX = "hidden";

      }

      var closeMobileMenu = function(){

          $navWrapper.className += " " + "menu-off";
          $siteCover.className += " " + "cover-site-off";
          $mainWrapper.className += " " + "content-on";

          
          $menuBtn.className += " " + "hamburger-in";
          $homeBtn.className += " " + "home-btn-out";
          $closeBtn.className += " " + "close-out";

          setTimeout(function(){
            $navWrapper.className -= " " + "menu-on";
            $navWrapper.className += " " + "nav-btn-holder";
            
            $mainWrapper.className -= " " + "content-off";
            $mainWrapper.className += " " + "main-wrapper";
            
            $siteCover.className -= " " + "cover-site";
            $siteCover.className += " " + "site-cover";

            $siteCover.style.visibility='hidden';

            $menuBtn.className -= " " + "hamburger-out";
            $homeBtn.className -= " " + "home-btn-in";
            $closeBtn.className -= " " + "close-in";

            document.body.style.overflowY = "auto";
            document.body.style.overflowX = "auto";
          },1100)

      }

  }

  // CLICKING
  // ===================================================================
  // ===================================================================
  


    
  
  

  



window.onload = function(){
   init();
   viewportChecking(); 
   settingButtons();
}
window.onresize = function(){
  viewportChecking();
    if($windowWidth < 901){
      settingButtons();
    }

    if($windowWidth>900 && $mobileMenuOpen == true){
      $closeBtn.click();
    }
}





