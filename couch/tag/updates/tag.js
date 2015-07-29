function(doc, req) { 
   if (!doc) { 
       doc = {}; 
       if (req.id) { 
           doc._id = req.id; 
       } else { 
            doc._id = req.uuid; 
       } 
       doc.created_on = new Date().getTime();
       doc.updated_on = doc.created_on;
       doc.account = req.userCtx;
       doc.type = 'tag';
       doc.body = eval('(' + req.body + ')'); 
       return [doc,'new']; 
   } 
   doc.updated_on = new Date().getTime(); 
   return [doc, 'updated'];
 }