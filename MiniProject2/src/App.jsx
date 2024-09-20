import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CORE_CONCEPTS } from "./data.js";
import { CoreConcept } from "./components/CoreConcept.jsx";
import { Header } from "./components/Header/Header.jsx";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import MainPage from "./components/pages/MainPage";
import RecordFormPage from "./components/pages/RecordFormPage";
import RecordListPage from "./components/pages/RecordListPage";
import RecordDetailPage from "./components/pages/RecordDetailPage";
import './button.css'; // 로그인 CSS 파일 추가


function App() {
  const [selectedTopic, setSelectedTopic] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null); // 사용자 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  // 구글 로그인 성공 시 호출되는 함수
  function handleLoginSuccess(credentialResponse) {
    console.log("Google 로그인 성공:", credentialResponse);

    try {
      // JWT 토큰에서 사용자 정보 추출
      const decodedResponse = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
      const userData = {
        googleId: decodedResponse.sub,
        email: decodedResponse.email,
        name: decodedResponse.name,
      };

      setUser(userData); // 사용자 정보를 상태로 저장
      localStorage.setItem("user", JSON.stringify(userData)); // localStorage에 사용자 정보 저장
    } catch (error) {
      console.error("로그인 정보 파싱 중 오류 발생:", error);
    }
  }

  // 로그아웃 함수
  function handleLogout() {
    googleLogout(); // 구글 로그아웃 호출
    setUser(null); // 사용자 상태 초기화
    localStorage.removeItem("user"); // localStorage에서 사용자 정보 제거
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  }

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
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
        <br></br>
          {!user ? (
            // 사용자 로그인 상태가 아닐 때 GoogleLogin 표시
          <div className="login-container">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap={false} // 자동 로그인 방지
              auto_select={false} // 자동 계정 선택 방지
            />
            </div>

          ) : (
            <div className="logout-container">
            <h2>환영합니다. 오늘도 러닝으로 refresh 해보시죠!</h2>
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          )}
        </section>
        <p>test</p>

        {/* Routes 설정 */}
        <Routes>
          <Route path="/" element={<MainPage user={user} />} />
          <Route path="/record" element={<RecordFormPage user={user} />} />
          <Route path="/records" element={<RecordListPage user={user} />} /> {/* user 전달 */}
          <Route path="/record/:id" element={<RecordDetailPage user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}