/* Badge and keyboard cross-reference for the C64 serial registry.
 *
 * Values are the same codes i_c64_registry.php stores in c64.json; the pictures
 * live in c64_registry/. Keep this in sync with the radio buttons in that file.
 */
var C64_IMAGE_PATH = "c64_registry/";

var C64_BADGES = {
  "1":  { file: "silver_badge.png",       name: "Silver Metal" },
  "2":  { file: "silver_sticker.png",     name: "Silver Sticker" },
  "11": { file: "rainbow_badge.png",      name: "Rainbow" },
  "21": { file: "c64c_badge.png",         name: "C64C" },
  "22": { file: "c64c_oddfont.jpg",       name: "C64C Plain Font" },
  "23": { file: "c64c_engraved.jpg",      name: "C64C Embossed" },
  "31": { file: "drean_badge.png",        name: "Drean C64" },
  "32": { file: "drean_64c_badge.png",    name: "Drean C64C" },
  "33": { file: "c64c_drean_brown.jpg",   name: "Brown Drean C64C" },
  "41": { file: "c64g_badge.png",         name: "C64G" },
  "42": { file: "c64g_badge_small_c.png", name: "C64G Small Font" }
};

var C64_KEYS = {
  "0": { file: "orange_f1.png",       name: "VIC Keyboard" },
  "1": { file: "gray_f1.png",         name: "Original Keyboard" },
  "2": { file: "lt_gray_f1.png",      name: "C64C Keyboard" },
  "3": { file: "lt_gray_f1_new.png",  name: "Newer C64C Keyboard" },
  "4": { file: "lt_gray_f1_new2.png", name: "Newer C64C Keyboard V2" }
};

function c64EscapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function c64TypeCell(table, field, value) {
  var key = (value === null || value === undefined) ? "" : String(value).trim();
  if (key === "") return "";

  // The anchor carries the field and code so c64-filter.js can narrow the table.
  var link = '<a class="c64-type-link" href="#" data-c64-field="' + field +
    '" data-c64-value="' + c64EscapeHtml(key) + '">';

  var entry = table[key];
  if (entry) {
    var label = c64EscapeHtml(entry.name);
    // The hidden text keeps the table searchable by name as well as by number.
    return link + '<img class="c64-type-img" src="' + C64_IMAGE_PATH + entry.file + '" alt="' + label +
      '" title="' + label + ' (' + c64EscapeHtml(key) + ') - click to show only this type"></a>' +
      '<span class="sr-only">' + label + ' ' + c64EscapeHtml(key) + '</span>';
  }

  var fallback = key === "99" ? "Other" : "Type " + key;
  return link + '<span class="text-muted c64-type-other" title="No picture for type ' +
    c64EscapeHtml(key) + ' - click to show only this type">' + c64EscapeHtml(fallback) + '</span></a>';
}

function c64BadgeFormatter(value) { return c64TypeCell(C64_BADGES, "badge_type", value); }
function c64KeyFormatter(value) { return c64TypeCell(C64_KEYS, "key_type", value); }
