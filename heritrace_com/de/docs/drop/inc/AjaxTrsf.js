/*
function getPicToDo() {
	"use strict";
	new Ajax.Request('../script/getPicToDo.php', {
		onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success)  
    	  			{
            			//alert(adata.picID);
						$('picToDoNumber').innerHTML = adata.numb;
    	  			} else { alert("error")}
  	  	}
	});
}
function write_new_posting(profileID, pictureName, latitude, longitude, pictext) {
	"use strict";
	new Ajax.Request('../script/write_posting_sql.php', {
  		parameters: {profileID: profileID, pictureName: pictureName, latitude: latitude, longitude: longitude, description: pictext, dateMake: new Date(), verified: "0", completed: "0" },
		onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success)  
    	  			{
            			//alert(adata.picID);
						PageProperties.postID = adata.postID;
						getPicToDo();  
    	  			} else { alert("error")}
  	  	}
	});
}
function update_posting(postID, latitude, longitude, pictext, completed){
	"use strict";
	new Ajax.Request('../script/update_posting_sql.php', {
  		parameters: {postID: postID, latitude: latitude, longitude: longitude, description: pictext, completed: completed },
		onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success)  
    	  			{
            			getPicToDo(); 
    	  			} else { alert("error")}
  	  	}
	});
}

function write_sql(table, field, content) {
	"use strict";
	new Ajax.Request('../script/write_sql.php', {
  		parameters: {table: table, field: field, content: content },
		onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success)  
    	  			{
						//alert(html.responseText);    
    	  			}
  	  	}
	});
}
*/

function read_sql(table, field, name) {
	"use strict";
	new Ajax.Request('inc/read_sql.php', {
  		parameters: {table: table, field: field, name: name },
		onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success) 
    	  			{
		 				//if (name=="facebookID") $('C64').fire("pic:newtask", { task: 2, facebookID: adata.facebookID });
    	  			}
  	  	}
	});
}