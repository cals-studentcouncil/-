# Firebase 연결 체크리스트

## 1. 웹 앱 설정값 확인

`index.html`의 Firebase 설정에는 현재 Realtime Database URL, authDomain, projectId가 들어가 있습니다.
Firebase Console의 `프로젝트 설정 > 일반 > 내 앱 > SDK 설정`에서 아래 값을 복사해 주석을 해제하고 채워주세요.

```js
apiKey: "...",
messagingSenderId: "...",
appId: "..."
```

## 2. Authentication 설정

관리자 패널은 `/#admin`에서 Firebase Authentication 이메일/비밀번호 로그인을 사용합니다.

1. Firebase Console > Authentication > Sign-in method에서 `이메일/비밀번호`를 사용 설정합니다.
2. Authentication > Users에서 관리자 계정을 만듭니다.
3. 생성된 관리자 사용자의 UID를 복사합니다.
4. Realtime Database에 아래 값을 추가합니다.

```json
{
  "admins": {
    "관리자_UID": true
  }
}
```

## 3. Realtime Database Rules 배포

`database.rules.json`은 다음 방식으로 동작합니다.

- 학생은 `morning`, `afternoon`에 제출만 할 수 있습니다.
- 학생은 제출 데이터와 전화번호 목록을 읽을 수 없습니다.
- `status`는 학생 화면에 필요해서 읽기만 공개됩니다.
- `results`와 제출 데이터는 관리자만 읽을 수 있습니다.
- 관리자 UID만 상태 변경, 결과 저장, 응답 데이터 조회를 할 수 있습니다.

Firebase CLI를 쓴다면 아래 명령으로 배포합니다.

```bash
firebase deploy --only database
```

## 4. Hosting 배포

정적 사이트이므로 Firebase Hosting으로 배포할 수 있습니다.

```bash
firebase deploy --only hosting
```

배포 후 일반 사용자는 사이트 주소로 접속하고, 관리자는 `사이트주소/#admin`으로 접속하면 됩니다.
