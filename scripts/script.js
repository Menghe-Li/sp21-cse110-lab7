// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

const journal_button = document.querySelector("h1");
const settings_button= document.querySelector("img");
let state;


// Make sure you register your service worker here too
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    })
    .then(entries => {
      for (let i = 0; i < entries.length; i++){
        entries[i].addEventListener('click', ()=>{
          state = {
            page_title: "Entry " + (i+1), 
            entry_number: "#entry" + (i+1), 
            entry_data: entries[i].entry
          };
          document.body.className = "single-entry";
          setState(state);
        });
      }
    });
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register("./sw.js").then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// When click on the Jounral Entery
journal_button.addEventListener('click' ,() => {
  state = {
    page_title: "Journal_Entries",
  };
  document.body.className = "";
  setState(state);
});

// When click on the setting img
settings_button.addEventListener('click', () =>{
  state = {
   page_title: "Settings",
  };
  document.body.className = "settings";
  setState(state);
});

window.onpopstate = function(event) {
  const header_title = document.querySelector("h1");
  header_title.textContent = event.state.page_title;
  if(event.state.page_title == "Journal_Entries"){
    document.body.className = "";
  }
  else if(event.state.page_title == "Settings") {
    document.body.className = "settings";
  }
  else {
    document.body.className = "single-entry";
  }
}
