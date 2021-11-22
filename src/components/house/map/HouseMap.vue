<template>
  <div>
    <div id="map" style="width: 100%"></div>
    <!-- <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="getGeocode(selectedHouse)">현재선택된항목</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      markerPositions2: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      markers: [],
      infowindow: null,
      // 11.20 주소-좌표 변환 객체를 생성합니다
      // geocoder: null,
      // 현재 선택된 항목의 위경도 값
      selectedHouseGeocode: [0, 0],
    };
  },
  computed: {
    ...mapState("houseStore", ["selectedHouse"]),
  },
  watch: {
    selectedHouse: function () {
      this.getGeocode(this.selectedHouse);
      // console.log(this.latlng);
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      // script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3d41e8a4af2ee36dc518d26a34f41505&libraries=services";
      //! 11.20 에러해결 완료: Uncaught TypeError: Cannot read property 'Geocoder' of undefined => 여기 맨 뒤에 "&libraries=services" 를 붙인다
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3d41e8a4af2ee36dc518d26a34f41505&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 5 /* 지도의 확대 레벨 */,
      };
      this.map = new kakao.maps.Map(container, options);
      // 주소-좌표 변환 객체를 생성 및 초기화하기 위해
      this.initGeocoder();
    },
    initGeocoder() {
      this.geocoder = new kakao.maps.services.Geocoder();
      // console.log(this.geocoder);
      // 테스트
      //// this.getGeocode("제주특별자치도 제주시 첨단로 242");
    },
    getGeocode(selectedHouse) {
      // console.log(selectedHouse);
      // 주소 계산
      let addressString = selectedHouse.법정동 + " " + selectedHouse.지번;
      // console.log(addressString);

      //! 에러해결 (X) 이렇게 하면 addressSearch의 콜백 함수 안에서는 this가 undefined (function을 뺴야함 -> lambda로)
      // this.geocoder.addressSearch(this.keyword, function(result, status) { /* do something */ });
      this.geocoder.addressSearch(addressString, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          //? ISSUE::CODE02 - 왜 이 함수표현식 안에서는 "this."가 안될까? 비동기 함수라 그런가...
          // this.selectedHouseGeocode =  [[result[0].y, result[0].x]]; --> ERROR
          let c = [[result[0].y, result[0].x]];
          console.log(c);
          this.displayMarker(c);

          //// (개발자 문서 기본코드)
          // console.log(result);
          // var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // console.log(coords);

          // // 결과값으로 받은 위치를 마커로 표시합니다
          // var marker = new kakao.maps.Marker({
          //   map: this.map,
          //   position: coords,
          // });

          // // 인포윈도우로 장소에 대한 설명을 표시합니다
          // var infowindow = new kakao.maps.InfoWindow({
          //   content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          // });
          // infowindow.open(this.map, marker);

          // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          // this.map.setCenter(coords);
        }
      });
    },
    changeSize(size) {
      const container = document.getElementById("map");
      // container.style.width =`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      // console.log(this.selectedHouse);
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
