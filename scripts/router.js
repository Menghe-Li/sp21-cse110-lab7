// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state) {
  const page_title = document.querySelector("h1");
  //  main page
  if (state.page_title == "Journal_Entries") {
    history.pushState(null, "", "/");
    page_title.textContent = state.page_title;
    document.body.className = state.class_name;
  }
  // Setting page
  else if (state.page_title == "Settings") {
    history.pushState(state, "Settings", "#settings");
    page_title.textContent = state.page_title;
    document.body.className = state.class_name;
  }
  // individual entry page
  else {
    const entry_page = document.querySelector("entry-page");
    let singal_entry_page = document.createElement("entry-page");
    history.pushState(state, state.page_title, state.entry_number);
    page_title.textContent = state.page_title;
    document.body.className = state.class_name;
    entry_page.remove();
    document.body.appendChild(singal_entry_page);
    singal_entry_page.entry = state.entry_data;
  }  
}
