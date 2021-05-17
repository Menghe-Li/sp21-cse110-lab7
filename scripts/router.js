// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state) {
  const page_title = document.querySelector("h1");
  //  default
  if (state == null) {
    history.pushState(null, "", "/");
    page_title.textContent = "Journal Entries";
    document.body.className = "";
  }
  // Setting page
  else if (state.page_title == "Settings") {
    history.pushState(state, "Settings", "#settings");
    page_title.textContent = state.page_title;
    document.body.className = state.className;
  }
  // individual entry page
  else {
    history.pushState(state, state.page_title, state.entry_number);
    page_title.textContent = state.page_title;
    document.body.className = state.className;
    let entry_page = document.querySelector("entry-page");
    entry_page.remove();
    entry_page = document.createElement("entry-page");
    document.body.appendChild(entry_page);
    entry_page.entry = state.entry_data;
  }  
}
