// الصق هذا الكود في Google Apps Script داخل الشيت (Extensions > Apps Script)
// ثم Deploy > New deployment > Web app ← Execute as: Me ، Who has access: Anyone
// وضع رابط /exec في site.config.json (sheetUrl). بعد أي تعديل على الكود انشر "New version".
const H = {
  register: ['name','phone','grade','gradeLabel'],
  results:  ['name','phone','grade','gradeLabel','examId','title','branch','skill','score','total','secs','minutes']
};
function doPost(e) {
  const p = e.parameter, name = p['form-name'] === 'results' ? 'results' : 'register';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(['time'].concat(H[name])); }
  const row = [Utilities.formatDate(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd HH:mm:ss')].concat(H[name].map(k => p[k] || ''));
  sh.getRange(sh.getLastRow() + 1, 1, 1, row.length).setNumberFormat('@').setValues([row]);
  return ContentService.createTextOutput('ok');
}
