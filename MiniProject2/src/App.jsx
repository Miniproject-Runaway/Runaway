import { useState } from "react";

import { CORE_CONCEPTS } from "./data.js";
import { CoreConcept } from "./components/CoreConcept.jsx";


import { Header } from "./components/Header/Header.jsx";
import { GoogleLogin, googleLogout } from "@react-oauth/google";


function App() {
  const [selectedTopic, setSelectedTopic] = useState();
  const [user, setUser] = useState(null); // 추가: 사용자 상태 관리

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  // 구글 로그인 성공 시 호출되는 함수
  function handleLoginSuccess(credentialResponse) {
    console.log(credentialResponse);
    const userData = credentialResponse; // 필요한 사용자 데이터로 교체
    setUser(userData); // 사용자 정보를 상태로 저장
    localStorage.setItem("user", JSON.stringify(userData)); // localStorage에 사용자 정보 저장
  }

  // 로그아웃 함수
  function handleLogout() {
    googleLogout(); // 구글 로그아웃 호출
    setUser(null); // 사용자 상태 초기화
    localStorage.removeItem("user"); // localStorage에서 사용자 정보 제거
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>주요 기능</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (
              <CoreConcept key={conceptItem.title} {...conceptItem} />
            ))}
          </ul>
        </section>
        <br></br>

        <section>
          {!user ? (
            // 사용자 로그인 상태가 아닐 때 GoogleLogin 표시
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap={false} // 자동 로그인 방지
              auto_select={false} // 자동 계정 선택 방지
            />
          ) : (
            // 사용자 로그인 상태일 때 로그아웃 버튼 표시
            <div>
              <h2>환영합니다. 오늘도 러닝으로 refresh 해보시죠!</h2>
              <h2><button id="logout" onClick={handleLogout}>Logout</button></h2>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
