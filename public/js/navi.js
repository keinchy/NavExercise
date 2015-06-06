
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
      $navWrapper = document.getElementById('navigation-links');


   loadJSON(function(response) {
      navData = JSON.parse(response);
      
      console.log(navData.items);
      console.log(navData.items.length);
     
      
     for (var navItem = 0; navItem < navData.items.length; navItem++) {

        var linkBox = document.createElement( 'div' );  
        linkBox.className = "nav-btn";

        var linkSubBox = document.createElement( 'div' );
        linkSubBox.className = "sub-nav-holder";

        var linkBoxContent = '<a href="'+navData.items[navItem].url+'">'+navData.items[navItem].label+'</a>';

        linkBox.innerHTML = linkBoxContent;
        $navWrapper.appendChild(linkBox);

        if(navData.items[navItem].items.length > 0){
            for (var navSubItem = 0; navSubItem < navData.items[navItem].items.length; navSubItem++) {
                  
                  var a = document.createElement('a');
                  var linkText = document.createTextNode(navData.items[navItem].items[navSubItem].label);
                  a.appendChild(linkText);
                  a.title = navData.items[navItem].items[navSubItem].label;
                  a.href = navData.items[navItem].items[navSubItem].url;

                  linkSubBox.appendChild(a);
            };

            linkBox.appendChild(linkSubBox);
        }

        


        

      }
    });



}
  // FUNCTIONS
  // ===================================================================
  // ===================================================================
  // ===================================================================

  var loadJSON = function( callback ){
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', '../json/nav.json', true); 
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);  
  }






window.onload = init;






