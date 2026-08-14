# Toss Dashboard

토스증권처럼 깔끔하고 미니멀한 투자 대시보드 초기 화면입니다. 현재는 API 연동 없이 정적 mock 데이터로 총 자산, 수익률, 관심종목, 차트, 자산 구성, 뉴스와 알림 위젯을 보여줍니다.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- ESLint

## Run

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## Verify

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Structure

- `DESIGN.md`: 색상, 타이포그래피, 카드/위젯 규칙을 담은 디자인 시스템 문서
- `src/app/page.tsx`: 대시보드 페이지 조립
- `src/components/dashboard/`: 재사용 가능한 대시보드 위젯 컴포넌트
- `src/lib/dashboard/mock-data.ts`: 정적 mock 데이터
- `src/lib/dashboard/widget-registry.ts`: 위젯 표시 순서와 그리드 span 정의
- `src/lib/dashboard/types.ts`: 위젯과 mock 데이터 타입

위젯은 `widget-registry.ts`의 배열로 순서와 배치를 제어합니다. 이후 사용자별 위젯 추가, 삭제, 재배치나 드래그앤드롭을 붙일 때 이 registry를 서버/클라이언트 상태와 연결하면 됩니다.

## Scope

- 현재 버전은 mock 데이터만 사용합니다.
- 실시간 시세, 인증, 저장소, 사용자별 레이아웃 저장은 아직 포함하지 않았습니다.
- UI는 흰 배경, 큰 숫자, 부드러운 카드, 한국 주식시장 관례의 빨간색 상승/파란색 하락 표현을 기준으로 설계했습니다.
