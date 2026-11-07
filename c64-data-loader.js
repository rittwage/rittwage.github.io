/* Offline support for the C64 serial registry pages.
 *
 * The pages normally read c64.json with fetch(), which browsers refuse to do
 * for file:// pages and for pages in a sandbox. c64-data.js holds exactly the
 * same data as a plain script (regenerate it with build_c64_data.py), and this
 * loader falls back to it so the pages also work opened straight from disk.
 */
(function () {
  "use strict";

  function loadDataScript() {
    if (!window.__c64DataScriptPromise) {
      window.__c64DataScriptPromise = new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = "c64-data.js";
        script.onload = function () {
          if (window.C64_REGISTRY_DATA) resolve(window.C64_REGISTRY_DATA);
          else reject(new Error("c64-data.js did not define C64_REGISTRY_DATA"));
        };
        script.onerror = function () {
          reject(new Error("c64-data.js could not be loaded"));
        };
        document.head.appendChild(script);
      });
    }
    return window.__c64DataScriptPromise;
  }

  /* Resolve with the registry rows, from c64.json when possible and from the
     generated c64-data.js otherwise. */
  window.c64LoadRegistry = function () {
    if (window.C64_REGISTRY_DATA) return Promise.resolve(window.C64_REGISTRY_DATA);

    if (window.location.protocol === "file:") return loadDataScript();

    return fetch("c64.json").then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    }).catch(function (error) {
      return loadDataScript().catch(function () { throw error; });
    });
  };

  /* The registry table asks bootstrap-table to fetch c64.json through its
     data-url attribute, which cannot work from disk. Drop the url and feed the
     table from c64-data.js instead. */
  var table = document.getElementById("table");
  var isTablePage = table && table.getAttribute("data-toggle") === "table";
  if (!isTablePage || window.location.protocol !== "file:" || !window.jQuery) return;

  table.removeAttribute("data-url");

  window.jQuery(function () {
    var $table = window.jQuery(table);
    window.c64LoadRegistry().then(function (rows) {
      if ($table.data("bootstrap.table")) $table.bootstrapTable("load", rows);
      else $table.bootstrapTable({ data: rows });
    }).catch(function () {
      var note = document.createElement("p");
      note.className = "text-warning small mt-2";
      note.textContent = "Could not load the registry. Run build_c64_data.py to create " +
        "c64-data.js next to this page, or serve the folder over HTTP.";
      table.parentNode.insertBefore(note, table.nextSibling);
    });
  });
})();
