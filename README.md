# 탁구장 운영 웹앱 (Google Apps Script + Google 스프레드시트)

이 프로젝트는 Google Apps Script와 Google 스프레드시트를 이용해 **탁구장 운영 웹앱**을 만드는 기본 템플릿입니다. 회원관리, 회비납부관리, 회계관리(수입/지출) 기능을 포함합니다.

## 주요 기능
- **회원관리**: 회원 등록 및 목록 조회
- **회비납부관리**: 회원별 회비 납부 기록 관리
- **회계관리**: 수입/지출 내역 기록 및 조회

## 스프레드시트 구조
앱은 스프레드시트에 다음 시트를 자동으로 생성합니다.

| 시트명 | 용도 | 기본 컬럼 |
| --- | --- | --- |
| Members | 회원 목록 | ID, Name, Phone, JoinDate, Status, Notes |
| Payments | 회비 납부 기록 | ID, MemberID, MemberName, Month, Amount, PaidDate, Method, Notes |
| Ledger | 회계 내역 | ID, Type, Category, Amount, Date, Description |

## 설치 및 배포
1. Google 스프레드시트 생성
2. **확장 프로그램 → Apps Script** 열기
3. 이 저장소의 파일을 Apps Script 프로젝트에 복사
   - `Code.gs`
   - `index.html`
   - `appsscript.json`
4. Apps Script에서 `doGet`을 포함한 함수가 있는지 확인
5. **배포 → 새 배포 → 웹 앱** 선택 후 배포

## 개발/디자인 참고
`index.html`은 Google Apps Script HTML 서비스 기준으로 구성되었습니다. 필요에 따라 스타일과 레이아웃을 확장하세요.
