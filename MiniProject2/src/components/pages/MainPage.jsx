import React from "react";
import { Link } from "react-router-dom";

function MainPage({ user }) {
  return (
    <div>
      <br></br>
      {user ? (
        <>
          {/* 러닝 기록하기 버튼 */}
          <Link to="/record">
            <button>러닝 기록하기</button>
          </Link>
          <br></br>
          <br></br>

          {/* 기록 보기 버튼 */}
          <Link to="/records">
            <button>기록 보기</button>
          </Link>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}

// 파일의 끝에서 export 선언
export default MainPage;