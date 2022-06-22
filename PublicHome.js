const homeInfoList = [
  {
    name: "강남센트럴아이파크(개나리4차)",
    address: "서울특별시 강남구 역삼동 712-3",
  },
  {
    name: "건대프라하임3차(하양동 94-9)",
    address: "서울특별시 광진구 화양동 94-9",
  },
  {
    name: "다온타워(신림동 1420-6)",
    address: "서울특별시 관악구 신림동 1420-6",
  },
];

const markers = [];
const infoWindows = [];

var map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.3595316, 127.1052133),
  zoom: 15,
});

// var infoWindow = new naver.maps.InfoWindow({
//   anchorSkew: true,
// });

map.setCursor("pointer");

function searchAddressToCoordinate(address, idx) {
  naver.maps.Service.geocode(
    {
      query: address,
    },
    function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert("Something Wrong!");
      }

      if (response.v2.meta.totalCount === 0) {
        return alert("totalCount" + response.v2.meta.totalCount);
      }

      var htmlAddresses = [],
        item = response.v2.addresses[0],
        point = new naver.maps.Point(item.x, item.y);

      if (item.roadAddress) {
        htmlAddresses.push("[도로명 주소] " + item.roadAddress);
      }

      if (item.jibunAddress) {
        htmlAddresses.push("[지번 주소] " + item.jibunAddress);
      }

      if (item.englishAddress) {
        htmlAddresses.push("[영문명 주소] " + item.englishAddress);
      }

      //   infoWindow.setContent(
      //     [
      //       '<div style="padding:10px;min-width:200px;line-height:150%;">',
      //       '<h4 style="margin-top:5px;">검색 주소 : ' + address + "</h4><br />",
      //       htmlAddresses.join("<br />"),
      //       "</div>",
      //     ].join("\n")
      //   );

      map.setCenter(point);

      //   infoWindows.push(infoWindow.open(map, point))
      homeInfoList[idx].lng = item.x;
      homeInfoList[idx].lat = item.y;

      var position = new naver.maps.LatLng(item.y, item.x);

      var marker = new naver.maps.Marker({
        map: map,
        position: position,
      });

      var infoWindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;"> 단지이름 : <b>"' +
          homeInfoList[idx].name +
          '"</b>.</div>',
      });

      markers.push(marker);
      //   console.log(markers);
      infoWindows.push(infoWindow);
    }
  );
}

function updateMarkers(map, markers) {
  var mapBounds = map.getBounds();
  var marker, position;
  for (var i = 0; i < markers.length; i++) {
    marker = markers[i];
    position = marker.getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, marker);
    } else {
      hideMarker(map, marker);
    }
  }
}

function showMarker(map, marker) {
  if (marker.setMap()) return;
  marker.setMap(map);
}

function hideMarker(map, marker) {
  if (!marker.setMap()) return;
  marker.setMap(null);
}
// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
// function getClickHandler(seq) {
//   return function (e) {
//     var marker = markers[seq],
//       infoWindow = infoWindows[seq];

//     if (infoWindow.getMap()) {
//       infoWindow.close();
//     } else {
//       infoWindow.open(map, marker);
//     }
//   };
// }

function addListenerInfoWindows(markers) {
  console.log("info");
  console.log(markers);
  for (var i = 0; i < markers.length; i++) {
    naver.maps.Event.addListener(markers[i], "click", function (e) {
      if (infoWindows[i].getMap()) {
        infoWindows[i].close();
      } else {
        infoWindows[i].open(map, markers[i]);
      }
    });
  }
}

homeInfoList.forEach(({ name, address }, idx) => {
  searchAddressToCoordinate(address, idx);
});
console.log("global");
console.log(markers);
// console.log(infoWindows);
addListenerInfoWindows(markers);

naver.maps.Event.addListener(map, "idle", function () {
  console.log("idle");
  console.log(markers);
  updateMarkers(map, markers);
});

//   markers.forEach((marker, idx) => {
//     console.log("test");
//     naver.maps.Event.addListener(marker, "click", getClickHandler(idx));
//   });
