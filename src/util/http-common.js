import axios from "axios";

// axios 객체 생성
export default axios.create({
  // ! 이 baseURL 부분이 잘 잡혀있는지 확인하자 (끝부분)
  baseURL: "http://localhost:9999/happyhouse",
  headers: {
    "Content-type": "application/json",
  },
});
