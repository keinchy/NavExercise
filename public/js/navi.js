
/*!
 * HUGE : NavExcercis
 * Fredie J. June.6.15:Sat v0.1
 */
 /*
   
*/


var init = function(){


  // Variables - Variables available throughout the scope of this object
  // -------------------------------------------------------------------
  var navData;


   loadJSON(function(response) {
      navData = JSON.parse(response);
      
      console.log(navData.items);
      console.log(navData.items.length);
      console.log(navData.items[0]);
      
     for (var navItem = 0; navItem < navData.items.length; navItem++) {
        console.log(navData.items[navItem].label+' '+navData.items[navItem].items+' '+navData.items[navItem].url);

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






