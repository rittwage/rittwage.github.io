/* Click a badge or keyboard picture to show only rows of that type.
 *
 * Uses bootstrap-table's own filterBy(), so the search box and the column
 * sorting keep working while a type filter is applied.
 */
(function () {
  "use strict";

  var LABELS = { badge_type: "Badge", key_type: "Keyboard" };

  function describe(field, value) {
    var map = field === "badge_type" ? window.C64_BADGES : window.C64_KEYS;
    var entry = map && map[value];
    var name = entry ? entry.name : (value === "99" ? "Other" : "Type " + value);
    return LABELS[field] + ": " + name + (entry ? " (" + value + ")" : "");
  }

  function init() {
    var $ = window.jQuery;
    if (!$ || !$("#table").length) return;

    var $table = $("#table");
    var $bar = $("#filter-bar");
    var active = {};

    function render() {
      var fields = Object.keys(active);
      if (!fields.length) {
        $bar.addClass("d-none").removeClass("d-flex");
        return;
      }

      var shown = $table.bootstrapTable("getData").length;
      var total = $table.bootstrapTable("getData", { unfiltered: true }).length;
      var text = fields.map(function (field) {
        return describe(field, active[field]);
      }).join("  +  ");

      $("#filter-text").text(text + " - showing " + shown.toLocaleString() +
        " of " + total.toLocaleString() + " entries");
      $bar.removeClass("d-none").addClass("d-flex");
    }

    $table.on("click", ".c64-type-link", function (event) {
      event.preventDefault();
      var field = String($(this).attr("data-c64-field") || "");
      var value = String($(this).attr("data-c64-value") || "");
      if (!field || !value) return;

      active[field] = value;
      $table.bootstrapTable("filterBy", active);
      render();
    });

    $("#clear-filter").on("click", function () {
      active = {};
      $table.bootstrapTable("filterBy", {});
      $table.bootstrapTable("resetSearch", "");
      render();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
