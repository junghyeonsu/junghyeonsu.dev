---
title: 'HTTP가 무엇인가'
description: '읽고 쓰고 맛보고 즐기고'
coverImage: '/assets/blog/computer-science/What-is-http/cover.png'
category: '컴퓨터 과학'
date: '2022/04/16'
path: 'computer-science'
---

# HTTP

> HTTP(Hyper Text Transfer Protocol)

[인터넷](https://junghyeonsu-dev.vercel.app/posts/What-is-internet)이 발달하면서 서로 소통할 수 있는 방법이 필요했습니다.

HTTP는 HTML, CSS, JS, image, JSON, XML, Plain Text, 등과 같은 리소스들을 가져올 수 있도록 해주는 프로토콜입니다.

> Protocol: 프로토콜은 컴퓨터 내부에서, 또는 컴퓨터 사이에서 데이터의 교환 방식을 정의하는 규칙 체계입니다.

사용자가 브라우저를 통해서 서버에 요청(request)를 하면 서버에서는 요청에 맞는 결과를 브라우저에게 응답(response)하는 형태로 동작합니다.

# HTTP 특징

## Client, Server

> Request and Response

연결상태가 없기 때문에 요청과 응답의 형태로 소통합니다. 요청은 client에서 응답은 server에서 합니다.

## Stateless

> HTTP는 상태를 저장하지 않습니다.

서버와 클라이언트 사이에는 연결고리가 있는 것이 아닙니다.

연결상태를 관리하지 않아서 일관된 방식으로 상호작용할 때 문제가 될 수 있지만, 쿠키와 세션으로 이러한 문제를 해결할 수 있습니다.

## Connectionless

> HTTP는 기본적으로 연결을 유지하지 않습니다. (HTTP 1.0 기준)

## HTTP 메소드

> 주요 5가지 메소드

- `GET`: 리소스 조회, `GET`을 사용하는 요청은 오직 데이터를 받기만 합니다.
- `POST`: 요청 데이터 처리, 주로 데이터 등록에 사용
- `PUT`: 리소스를 대체, 해당 리소스가 없으면 생성
- `PATCH`: 리소스를 일부만 변경
- `DELETE`: 리소스 삭제
  기타 메소드 4가지

> 자주 사용되지 않는 4가지 메소드

- `HEAD`: `GET`과 동일하지만 메시지 부분을 제외하고, 상태 줄과 헤더만 반환
- `OPTIONS`: 대상 리소스에 대한 통신 가능 옵션을 설명(주로 CORS에서 사용)
- `CONNECT`: 대상자원으로 식별되는 서버에 대한 터널을 설정
- `TRACE`: 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행

# 참고

- [HTTP 개요](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)
- [HTTP란 무엇인가?](https://velog.io/@surim014/HTTP%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
- [[네트워크/HTTP] HTTP란? – 특징(무상태와 비 연결성)](https://hanamon.kr/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-http-http%EB%9E%80-%ED%8A%B9%EC%A7%95-%EB%AC%B4%EC%83%81%ED%83%9C-%EB%B9%84%EC%97%B0%EA%B2%B0%EC%84%B1/)
