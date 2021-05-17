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
    .then(entery_setup);
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
  state = null;
  setState(state);
});

// Wehn click on the setting img
settings_button.addEventListener('click', () =>{
  state = {
   page_title: "Settings",
   className: "settings"
  };
  setState(state);
});

// When on an entry
function entery_setup(){
  const entries = document.getElementsByTagName('journal-entry');
  for (let i = 0; i < entries.length; i++){
    entries[i].addEventListener('click', ()=>{
      state = {
        page_title: "Entry " + (i+1), 
        className: "single-entry", 
        entry_number: "#entry" + (i+1), 
        entry_data: entries[i].entry
      };
      setState(state);
    });
  }
}

window.onpopstate = function(event) {
  const page_title = document.querySelector("h1");
  let body = document.body;
  if(event.state == null){
    page_title.textContent = "Journal Entries";
    body.className = "";
  }
  else {
    page_title.textContent = event.state.page_title;
    body.className = event.state.className;
  }
}
