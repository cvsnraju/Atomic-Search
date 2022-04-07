
//write code to create the exception with tile "Atomic Search Bookmarks"

function searchError(){
// create bookmarks folder for Atomic Search 
console.log("Something went wrong");
}

function onPresent(newFolder){
  // console.log(newFolder.length);
  if(newFolder.length){
    bookmarkid = newFolder[0].id;
    // processbookmarks(bookmarkid);
  }
  else{
    chrome.bookmarks.create({
      'title': "Atomic Search Bookmarks"
    }, function (newFolder) {
      bookmarkid = newFolder.id;
      // processbookmarks(bookmarkid);
    });
  }
  }

// function processbookmarks(id){
//   chrome.bookmarks.getChildren(
//     id,
//     function (getnode){
//       getnode.forEach(function(node) {
//         console.log(node.url);
//       });
//     });
//   // console.log(id);
// }

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener((text) => {
  // Encode user input for special characters , / ? : @ & = + $ #
  chrome.bookmarks.getChildren(bookmarkid,function(getnode){
    getnode.forEach(function(node){
      var durl = node.url.replace("%s",text);
      
      chrome.tabs.create({url : durl});
      // console.log(text);
    });
  }
  
  );
  

});

  // var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  // chrome.tabs.create({ url: newURL });

chrome.runtime.onInstalled.addListener(async () => {

  // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
  // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
  // runtime.

  let alreadybooked = chrome.bookmarks.search({'title' : "Atomic Search Bookmarks"});
    alreadybooked.then(onPresent,searchError);
    //  console.log(alreadybooked);
});
