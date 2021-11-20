const API_BASE_URL = "http://localhost:9999/happyhouse";
const APT_DEAL_URL = "openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
const MAP_BASE_URL = "//dapi.kakao.com/v2/maps/sdk.js?appkey=";

// ! 이렇게 export를 했기 떄문에, 상위에서 계층구조 차례로 import 받아가면 됨
export { API_BASE_URL, APT_DEAL_URL, MAP_BASE_URL };
