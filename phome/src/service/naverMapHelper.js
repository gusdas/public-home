
const naver = window.naver;


console.log('HELPER EXECUTE');

 function createMap(position){
    return new naver.maps.Map('map', {center: position, zoom: 13})
}

function getPosition(lat, lng){
    return new naver.maps.LatLng(lat, lng);
}

/**
 * created At: 22-06-21
 * 
 * @param {Object} MarkerObj {title: 제목, position: Naver.LatLng }
 * @param {Naver.map} map  createMap으로 생성된 Map 
 * @param {Function} content (MarkerObj[Keys]): String
 */
function createMarker(MarkerObj, map, content){
    
    let markers = [];
    let infoWindows = [];


    for(let key in MarkerObj){
        
        const markerOption = setMarkerOption(map, MarkerObj[key].position, MarkerObj[key].title);
        const markerInfoWindow = setMarkerInfoWindow(content(MarkerObj[key]))

        markers.push(markerOption);
        infoWindows.push(markerInfoWindow);
    }

    naver.maps.Event.addListener(map, 'idle', function() {
        updateMarkers(map, markers);
    });


    for (var i=0, ii=markers.length; i<ii; i++) {
        naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    }
    
    /** Functions  **/
    function setMarkerOption(map, position, title, ...props){
        return new naver.maps.Marker({
            map,
            position,
            title,
            zIndex: 100,
            ...props
        });
    }
    
    function setMarkerInfoWindow(content){
        return new naver.maps.InfoWindow({content})
    }

    function updateMarkers(map, markers) {

        var mapBounds = map.getBounds();
        var marker, position;
    
        for (var i = 0; i < markers.length; i++) {
    
            marker = markers[i]
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
    function getClickHandler(seq) {
        return function(e) {
            var marker = markers[seq],
                infoWindow = infoWindows[seq];
    
            if (infoWindow.getMap()) {
                infoWindow.close();
            } else {
                infoWindow.open(map, marker);
            }
        }
    }
}

export {createMap, getPosition, createMarker}