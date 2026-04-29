/**
 * 2026 농생대 체육대회 베팅 이벤트 - 구글 시트 연동 스크립트
 *
 * 📋 설치 방법:
 * 1. 구글 드라이브에서 새 스프레드시트 생성
 * 2. 상단 메뉴 → [확장 프로그램] → [Apps Script] 클릭
 * 3. 이 파일의 내용을 전부 복사해서 붙여넣기
 * 4. 저장 후 [배포] → [새 배포] → 유형: '웹 앱' 선택
 * 5. '다음 사용자로 실행': 나(본인), '액세스 권한': 모든 사용자 → 배포
 * 6. 생성된 웹 앱 URL을 복사
 * 7. index.html 상단의 SHEET_URL 변수에 붙여넣기
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'morning') {
      writeMorning(ss, data);
    } else if (data.type === 'afternoon') {
      writeAfternoon(ss, data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function writeMorning(ss, d) {
  let sheet = ss.getSheetByName('오전 베팅');
  if (!sheet) {
    sheet = ss.insertSheet('오전 베팅');
    sheet.appendRow([
      '제출시각', '이름', '학번', '전화번호', '학부',
      '농구 상위3팀', '농구 결승점수차',
      '좌식배드민턴 우승', '남자피구 우승', '여자피구 우승',
      '접시콘 우승',
      '족구 상위3팀', '족구 결승점수차',
      '오전경기 1등팀',
    ]);
    sheet.getRange(1, 1, 1, 14).setBackground('#145a32').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    d.timestamp, d.name, d.studentId, d.phone, d.dept,
    d['농구_상위3팀'],    d['농구_결승점수차'],
    d['좌식배드민턴_우승'], d['남자피구_우승'], d['여자피구_우승'],
    d['접시콘_우승'],
    d['족구_상위3팀'],    d['족구_결승점수차'],
    d['오전경기_1등팀'],
  ]);
}

function writeAfternoon(ss, d) {
  let sheet = ss.getSheetByName('오후 베팅');
  if (!sheet) {
    sheet = ss.insertSheet('오후 베팅');
    sheet.appendRow([
      '제출시각', '이름', '학번', '전화번호', '학부',
      '미션달리기 우승', '꼬리잡기 상위3팀', '줄다리기 상위3팀',
      '계주 우승', '최종 우승팀',
    ]);
    sheet.getRange(1, 1, 1, 10).setBackground('#145a32').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    d.timestamp, d.name, d.studentId, d.phone, d.dept,
    d['미션달리기_우승'], d['꼬리잡기_상위3팀'], d['줄다리기_상위3팀'],
    d['계주_우승'], d['최종_우승팀'],
  ]);
}

// 테스트용: Apps Script 편집기에서 직접 실행해 확인
function testPost() {
  const mock = {
    postData: {
      contents: JSON.stringify({
        type: 'morning',
        timestamp: new Date().toLocaleString('ko-KR'),
        name: '홍길동', studentId: '2020-12345',
        phone: '010-0000-0000', dept: '조경지역시스템공학부',
        '농구_상위3팀': '식물생산과학부, 응용생물화학부',
        '농구_결승점수차': '6~10점 차',
        '좌식배드민턴_우승': '햇님반',
        '남자피구_우승': '햇님반',
        '여자피구_우승': '병아리반',
        '접시콘_우승': '새싹반',
        '족구_상위3팀': '농경제사회학부, 산림과학부, 바이오시스템소재학부',
        '족구_결승점수차': '0~3점 차',
        '오전경기_1등팀': '햇님반',
      }),
    },
  };
  doPost(mock);
  Logger.log('테스트 완료 - 시트를 확인하세요.');
}
