# seb44_main_022

<br/>

<div  align="center">
  <img width="45%" height= "50%" src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/65256e57-211b-4e13-b537-aa6ecfd5f9c6" alt="">
</div>

</br>

- **`팀 이름` :**  🥯 BUYTE
- **`프로젝트 명` :**  커스텀 케이크, 빵, 쿠키를 제작해주는 제과점 중개 유통 서비스입니다.
- **`프로젝트 기간` :** 2023.06.28 ~ 2023.07.24
- `팀원` : 김준표(팀장), 민정호, 양효정, 김현우(부팀장), 오숙현, 이준기
- **`배포 링크` :** [배포링크](https://www.buyte.site/)

## 목차

1. [**팀원 소개**](#1)
1. [**서비스 소개/주요 기능**](#2)
1. [**프로젝트 문서**](#3)
1. [Git ](#4)
1. [**기술 스택**](#5)
1. [**실행&빌드**](#6)
1. [**미리 보기**](#7)

<br/>

<div id="1"></div>

## 🧑‍💻 팀원 소개

<div  align="center">

  ### Contributors
| [김준표](https://github.com/KimJunpyo)(FE, 팀장)  |[민정호](https://github.com/jungo0 ) (FE)| [양효정](https://github.com/Raros17 ) (FE)| [김현우](https://github.com/j6d9s)     (BE, 부팀장)    | [오숙현](https://github.com/oshyun00)(BE) | [이준기](https://github.com/ljg980708)(BE)| 
| :-----------------------------------: | :-----------------------------------: | :----------------------------------: | :----------------------------------: | :------------------------------------: | :-------------------------------------: |
|<img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/3892ae63-64c2-4193-8816-c10ed9cf7b1c" width = "120" alt = ""/> |<img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/8db25782-41ce-4dde-bda5-a4dddc98363e" width="120" alt=""/> | <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/11a41a41-d034-451f-af20-40f581b91c18" width="120" alt =""/> |<img src = "https://github.com/codestates-seb/seb44_main_022/assets/81670100/2bbe07cc-e988-47bd-bef7-8b5c0f327377" width = "120" alt = ""/>| <img src = "https://github.com/codestates-seb/seb44_main_022/assets/81670100/b7f580ab-3d41-4353-aba1-7e83c422919f" width = "120" alt = ""/> |<img src = "https://github.com/codestates-seb/seb44_main_022/assets/81670100/b1fc756f-6384-41bd-a60b-feb0046f021a" width="120" alt=""/>  |

</div>


<details>
<summary>담당 파트</summary>
<div markdown="1">

**김준표**
- Login/SignUp
- OAuth Google 2.0
- Private Routing
- Header
- Map Page
- Cart Page
- Payment Page
- Order Complete Page
- Not Found Page
- Chatting
- Chat List Page
 
 **민정호**
 - Main Page
 - Header
 - Footer
 - Custom Page
 - Design

 
 **양효정**
 - Store List Page
- Preference Product List Page
- MyPage
- Store Detail Page
 
 **김현우**
- Cart
- Order
- Payment
- Chatting
- Deploy
 
 **오숙현**
- Member CRUD
- Log In, Log out
- Spring Security
- JWT
- OAuth2 (Google)
- Order History
 
 **이준기**
 - Store
- Product
- Ingredients
- Logging

</div>
</details>

<br />



<div id="2"></div>

## 서비스 소개/주요 기능

> <h3><strong>BUYTE</strong>는 커스텀 제과를 판매하는 서비스입니다. </h3>
> <h3>  나만의 빵을 원하시나요? BUTYE에서 주문해보세요!</h3>

* 🍪 주문방법 <br/>
  - 지도에서 가까운 매장 찾기
  - 입점된 매장리스트 확인하기
  - BUYTE에서 추천해주는 추천 메뉴 확인하기
  - 커스텀 제품, 기존 판매중인 제품 구매
* 🍩 커스텀
  - 사용자가 원하는 디자인의 케이크, 도넛, 쿠키의 디자인시안을 제작
  - 그림판에서 원하는 이미지를 업로드
  - 사이드바에서 원하는 재료를 추가
* 🥐 장바구니/결제
  - 제품 이미지 클릭 시 확해된 이미지 제공
  - 체크박스를 통한 수량변경
  - 장바구니 내 일부/전체 제품 선택 및 결제
  - 상세 주소를 입력받고 가상 결제
* 💬 채팅
   - 채팅을 통한 사용자와 사장님간 소통
   - 판매자 계정으로 접근한 채팅(기존 채팅목록 확인 가능)
* 👤 마이페이지
  - 주문내역 확인 / 주문한 제품의 페이지로 이동 가능
  - 프로필 (닉네임 수정, 회원 탈퇴)
    
<div id="3"></div>

##  📃 프로젝트 문서
- [사용자 요구사항 정의서](https://www.notion.so/codestates/0ea904ff8bf843e482c54c79f5b968d8?pvs=4)
- [API 명세서](https://buyte.docs.apiary.io/#)
- [DBDiagram](https://www.erdcloud.com/d/cweQuiw3cTWkugiDJ)
- [화면정의서](https://www.notion.so/codestates/fc8191319b9247d0a30e85fc06cf2344?pvs=4)
- [프로젝트 매뉴얼](https://docs.google.com/presentation/d/1rhBxaLJ7gMKkn2cz6nAhMGHs2sQR4q46CtkVvVI2y1Y/edit#slide=id.g25b4a5fc115_0_101)


<div id="4"></div>

## ✅ Git
# Commit rule

| 이름     | 내용                                                                      |
| :------- | :------------------------------------------------------------------------ |
| feat     | 새로운 기능을 추가할 경우                                                 |
| fix      | 버그를 고친 경우                                                          |
| refactor | 리팩토링                                                                  |
| design   | css, UI 수정                                                              |
| docs     | 문서를 수정한 경우                                                        |
| style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                     |
| test     | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)                        |
| chore    | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |
| rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                        |
| remove   | 파일을 삭제하는 작업만 수행한 경우                                        |
| comment  | 필요한 주석 추가 및 변경                                                  |

### Branch
`main`: 배포 브랜치

`dev`: 프론트, 백 통합 dev브랜치

`feat/be/"기능"`: 백엔드 기능 구현 브랜치

`feat/fe/"기능"`: 프론트엔드 기능 구현 브랜치


<div id="5"></div>

##  ⚙️ 기술 스택

## ⚙️ Tools
| Github | Discord |Notion|
| :---: | :---: |:---:|
| <img alt="github logo" src="https://techstack-generator.vercel.app/github-icon.svg" width="65" height="65"> | <img alt="Discord logo" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg" height="65" width="65"> |<img alt="Notion logo" src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/shared/icons/notion-app-icon-3d.png" height="65" width="65">|


##   🖥 Frontend
| Html | CSS| TypeScript| React | Styled-<br>Components | Redux-ToolKit |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img alt="Html" src ="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/440px-HTML5_logo_and_wordmark.svg.png" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://user-images.githubusercontent.com/111227745/210204643-4c3d065c-59ec-481d-ac13-cea795730835.png" alt="CSS" width="50" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://www.styled-components.com/atom.png" alt="styled-components icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/redux-icon.svg" alt="icon" width="63" height="63" /></div> |

## 🔒 Backend

| Java | AWS | Spring | Spring<br>Boot | MySQL|Spring<br/>Security
| :---: | :---: | :---: | :---: | :---: | :---: |
| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/java-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="spring logo" src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" height="50" width="50" > | <img alt="spring-boot logo" src="https://t1.daumcdn.net/cfile/tistory/27034D4F58E660F616" width="65" height="65" > | <img alt="spring-boot logo" src= "https://github.com/codestates-seb/seb44_pre_035/assets/81670100/56f2acff-92fc-4f0f-8eee-780dfb2d30d6" width="65" height="65" >| <img alt="spring-boot logo" src="https://blog.kakaocdn.net/dn/dIQDQP/btqZ09ESd8T/0ibqtotW52OaJS8HznXDQK/img.png" width="65" height="65" >|

### 아키텍처
<img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/5a0a9f4e-7dda-475a-adb5-e53f9b0a956f">


<div id="6"></div>

## 🕹️ 실행 & 빌드(Frontend)

+ 실행

```bash
# 폴더 진입
cd client

# 패키지 설치 ( "node" 필요 )
npm install

# 개발용 실행
npm start
```


<div id="7"></div>

## 😎 미리보기

<html>
<table>
  <tr>
    <th>
      메인 페이지
    </th>
    <th>
      로그인/회원가입 페이지
    </th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/e2596499-f048-4b9c-88a3-6c0362556978"  alt="signup page" width = "500" height = "300">
      <span><br/>   ✔ 처음 사용자를 위해 주문방법, 판매제품 등을 소개합니다.  <br/> ✔ 커스텀 기능을 사용해본 팀원들의 리뷰를 확인할 수 있습니다.  <br/><span/>
    </td>
    <td>
      <img src= "https://github.com/codestates-seb/seb44_main_022/assets/81670100/17e9d5c5-4ea7-47d7-b15e-e23fb39d2820" alt="login page" width = "500" height = "300">
       <span><br/> ✔  일반회원가입과 google oauth로 계정을 생성합니다.<br/> ✔ 유효성 검사를 모두 통과해야 로그인,가입버튼이 활성화 됩니다. <br/> ✔ 로그인 상태에 따라 헤더가 변경됩니다.<span/>
    </td>
   </tr> 
  <tr>
    <th>
      매장 리스트 페이지
    </th>
    <th>
      채팅 페이지
    </th>
  </tr>

  <tr>
    <td>
      <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/85f5d327-f569-4641-a7da-f3946c447bce" alt="main page"  width = "500" height = "300">
      <span><br/> ✔  매장 리스트들을 확인하여 원하는매장을 선택합니다.<br/> ✔ 매장명으로 검색이 가능합니다. <span/>
    </td>
    <td>
      <img src= "https://github.com/codestates-seb/seb44_main_022/assets/81670100/7ce83143-abf2-4f8d-94d7-43e77e92253a" alt="write page"  width = "500" height = "300">
             <span><br/> ✔ 채팅으로 소비자와 사장님간 소통이 가능합니다.<br/> ✔ 판매자 계정으로 접근하면 채팅목록을 확인할 수 있습니다.<span>
    </td>
   </tr>
   <tr>
    <th>
      커스텀 페이지
    </th> 
    <th>
      지도 페이지
    </th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/c66c2d3c-cc88-4d1e-ba19-bc44d1f3967a" alt="main page" width = "500" height = "300">
     <span><br/>✔ 케이크,쿠키,도넛 세가지 제품을 커스텀할 수 있습니다. <br/> ✔ 펜/지우개를 색상을 변경하여 사용할 수 있습니다. <br/> ✔ 사이드바에서 재료를 추가할 수 있습니다.<span/>
    </td>
    <td>
      <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/ee0c36c5-0bc8-4353-a63d-280145aa5494" alt="main page"  width = "500" height = "300">
       <span><br/>✔ 카카오맵을 사용한 지도를 통해 매장위치를 확인할 수 있습니다. <br/> ✔ 모달에서 매장사진,매장명,추천제품을 확인합니다.<span/>
    </td>
  </tr> 
   <tr>
    <th>
      장바구니/결제 페이지
    </th> 
    <th>
      마이 페이지
    </th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/1d71f68d-c58e-48a1-8e3c-b1c858023e99" alt="main page" width = "500" height = "300">
     <span><br/>✔ 장바구니에 담긴 제품들의 이미지를 새 창으로 확인하고 결제화면으로 넘어갑니다.<br/> ✔ iamport를 사용하여 카카오페이 가상결제를 할 수 있습니다. <span/>
    </td>
    <td>
      <img src="https://github.com/codestates-seb/seb44_main_022/assets/81670100/07c509b2-5fbf-4557-8f30-7ddf5155c43d" alt="main page"  width = "500" height = "300">
       <span><br/>✔ 사용자의 주문내역을 확인합니다. <br/> ✔ 회원탈퇴, 닉네임수정이 가능합니다. <span/>
    </td>
  </tr> 
</table>
</html>
<br/>



