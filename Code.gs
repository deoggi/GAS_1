const SHEETS = {
  members: {
    name: '회원',
    headers: ['ID', '이름', '전화번호', '가입일', '상태', '메모'],
  },
  payments: {
    name: '회비납부',
    headers: ['ID', '회원ID', '회원명', '회비월', '금액', '납부일', '납부방법', '메모'],
  },
  ledger: {
    name: '회계',
    headers: ['ID', '구분', '카테고리', '금액', '날짜', '설명'],
  },
};

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('탁구장 운영 웹앱')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getMembers() {
  const sheet = getOrCreateSheet_(SHEETS.members);
  return getRows_(sheet);
}

function addMember(member) {
  const sheet = getOrCreateSheet_(SHEETS.members);
  const row = [
    Utilities.getUuid(),
    member.name || '',
    member.phone || '',
    member.joinDate || new Date().toISOString().slice(0, 10),
    member.status || '활동',
    member.notes || '',
  ];
  sheet.appendRow(row);
  return row;
}

function getPayments() {
  const sheet = getOrCreateSheet_(SHEETS.payments);
  return getRows_(sheet);
}

function addPayment(payment) {
  const sheet = getOrCreateSheet_(SHEETS.payments);
  const row = [
    Utilities.getUuid(),
    payment.memberId || '',
    payment.memberName || '',
    payment.month || '',
    Number(payment.amount || 0),
    payment.paidDate || new Date().toISOString().slice(0, 10),
    payment.method || '현금',
    payment.notes || '',
  ];
  sheet.appendRow(row);
  return row;
}

function getLedger() {
  const sheet = getOrCreateSheet_(SHEETS.ledger);
  return getRows_(sheet);
}

function addLedgerEntry(entry) {
  const sheet = getOrCreateSheet_(SHEETS.ledger);
  const row = [
    Utilities.getUuid(),
    entry.type || '수입',
    entry.category || '',
    Number(entry.amount || 0),
    entry.date || new Date().toISOString().slice(0, 10),
    entry.description || '',
  ];
  sheet.appendRow(row);
  return row;
}

function getOrCreateSheet_(sheetConfig) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetConfig.name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetConfig.name);
    sheet.appendRow(sheetConfig.headers);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(sheetConfig.headers);
  }
  return sheet;
}

function getRows_(sheet) {
  const range = sheet.getDataRange();
  const values = range.getValues();
  if (values.length <= 1) {
    return [];
  }
  const headers = values[0];
  return values.slice(1).map((row) => {
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = row[index];
    });
    return entry;
  });
}
