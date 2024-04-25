document.addEventListener("DOMContentLoaded", () => {
    let map;
    let geocoder;

    initMap();

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 37.5665, lng: 126.978 },
            zoom: 12,
        });

        geocoder = new google.maps.Geocoder();

        const locationList = document.getElementById("locationList");
        const contents = Array.from(locationList.querySelectorAll('.contents'));

        // 각 contents를 거리순으로 정렬
        contents.sort((a, b) => {
            const addressA = a.querySelector('.result-address').textContent.trim();
            const addressB = b.querySelector('.result-address').textContent.trim();
            return addressA.localeCompare(addressB);
        });

        // 최초 공항 검색
        findNearestAirport(contents[0].querySelector('.result-address').textContent, (nearestAirport) => {
            if (nearestAirport) {
                const airportLocation = nearestAirport.geometry.location;

                // 공항 파랑 핀 생성
                const airportMarker = new google.maps.Marker({
                    position: airportLocation,
                    map: map,
                    icon: {
                        url: 'https://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
                        scaledSize: new google.maps.Size(30, 30)
                    },
                    title: nearestAirport.name
                });

                // 공항과 가장 가까운 contents 찾기
                let closestContents = [];

                contents.forEach((content) => {
                    const resultAddress = content.querySelector('.result-address').textContent;
                    const resultName = content.querySelector('.result-name').textContent;

                    geocoder.geocode({ address: resultAddress }, (results, status) => {
                        if (status === "OK" && results && results.length > 0) {
                            const location = results[0].geometry.location;

                            // 공항과 contents 위치 간의 거리 계산
                            const distanceToAirport = google.maps.geometry.spherical.computeDistanceBetween(location, airportLocation);

                            // 가장 가까운 contents 배열에 추가
                            closestContents.push({
                                location: location,
                                address: resultAddress,
                                name: resultName,
                                distance: distanceToAirport
                            });

                            // 모든 contents에 대한 처리가 완료된 후에 핀 및 선 연결
                            if (closestContents.length === contents.length) {
                                // 거리에 따라 가장 가까운 순으로 정렬
                                closestContents.sort((a, b) => a.distance - b.distance);

                                // 가장 가까운 contents부터 순서대로 핀과 선 그리기
                                let prevLocation = airportLocation;

                                closestContents.forEach((content, index) => {
                                    const contentLocation = content.location;
                                    const contentName = content.name; // 컨텐츠의 이름 가져오기

                                    // 컨텐츠 핀 생성
                                    const contentMarker = new google.maps.Marker({
                                        position: contentLocation,
                                        map: map,
                                        label: (index + 1).toString() // 순서대로 번호 부여
                                    });

                                    // 정보 창 (Infowindow) 생성
                                    const infowindow = new google.maps.InfoWindow({
                                        content: `<div><strong>${contentName}</strong></div>` // 이름을 정보 창에 표시
                                    });

                                    // 컨텐츠 핀 클릭 시 정보 창 열기
                                    contentMarker.addListener('click', () => {
                                        infowindow.open(map, contentMarker);
                                    });

                                    // 경로 연결선 그리기
                                    const lineCoordinates = [prevLocation, contentLocation];
                                    const line = new google.maps.Polyline({
                                        path: lineCoordinates,
                                        geodesic: true,
                                        strokeColor: "#FF0000",
                                        strokeOpacity: 1.0,
                                        strokeWeight: 2
                                    });
                                    line.setMap(map);

                                    // 이전 위치 갱신
                                    prevLocation = contentLocation;

                                    // Add content to the locationList
                                    const contentInput = document.createElement('input');
                                    contentInput.type = 'hidden';
                                    contentInput.className = `order-number`;
                                    contentInput.value = `${content.address}`;
                                    locationList.appendChild(contentInput);
                                });
                            }
                        } else {
                            console.error(`위치를 찾을 수 없습니다: ${resultAddress}`);
                        }
                    });
                });

                // 공항 위치를 중심으로 지도 화면 조정
                map.setCenter(airportLocation);
            } else {
                console.error('근처에 공항이 없습니다.');
            }
        });
    }

    function findNearestAirport(address, callback) {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
                const location = results[0].geometry.location;

                // 주변 공항 검색
                const request = {
                    location: location,
                    radius: 1000000,
                    type: 'airport' // 공항 타입
                };

                const placesService = new google.maps.places.PlacesService(map);

                // 주변 공항 검색 요청
                placesService.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const airportResults = results.filter(place => place.types.includes('airport'));

                        if (airportResults && airportResults.length > 0) {
                            const nearestAirport = airportResults[0];
                            callback(nearestAirport); // 가장 가까운 공항 반환
                        } else {
                            console.error('근처에 공항이 없습니다.');
                            callback(null);
                        }
                    } else {
                        console.error(`주변 공항 검색에 실패했습니다. 상태: ${status}`);
                        callback(null);
                    }
                });
            } else {
                console.error(`위치를 찾을 수 없습니다: ${address}`);
                callback(null);
            }
        });
    }
});
