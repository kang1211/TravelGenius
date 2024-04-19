document.addEventListener("DOMContentLoaded", () => {
   const checkboxes = document.querySelectorAll('.location-checkbox');

      checkboxes.forEach((checkbox) => {
          checkbox.addEventListener('change', (event) => {
              const isChecked = event.target.checked;
              const parentDiv = event.target.closest('.contents');
              const spotName = parentDiv.querySelector('#item_name').textContent.trim();
              const spotIndex = parentDiv.id.split('-')[1];

              if (isChecked) {
                  const locationText = spotName;
                  const spotCoordinates = findSpotCoordinates(spotIndex);

                  if (spotCoordinates) {
                      addMarker(spotCoordinates, locationText); // 마커 추가
                  }
              } else {
                  const locationText = spotName;
                  removeMarker(locationText); // 마커 제거
              }
          });
      });

    // 관광지의 ID를 사용하여 좌표를 가져오는 함수 (실제로는 여기에서 좌표를 가져오는 코드를 구현해야 함)
    function findSpotCoordinates(index) {
       const spotId = 'spot-1'; // 가져올 관광지의 ID
       const spotElement = document.getElementById(spotId); // ID를 사용하여 요소 선택

       if (spotElement) {
           // 해당 ID를 갖는 요소가 존재할 경우
           const spotName = spotElement.querySelector('#item_name').textContent.trim();
           console.log(`선택한 관광지의 이름: ${spotName}`);
       } else {
           console.log(`해당 ID를 갖는 요소가 존재하지 않습니다.`);
       }

    }

    // 지도에 마커를 추가하는 함수 (실제 구현에 맞게 수정 필요)
    function addMarker(coordinates, locationText) {
        const marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: locationText
        });
    }

    // 지도에서 마커를 제거하는 함수 (실제 구현에 맞게 수정 필요)
    function removeMarker(locationText) {
        // 해당 위치의 마커를 제거하는 로직을 구현 (예: marker.setMap(null))
        // 이 예시에서는 단순히 마커 객체를 생성만 하고 있으므로, 실제 구현에 맞게 수정 필요
    }
});
 let markers = []; // 핀을 관리하는 배열
 let map;
 let geocoder;
 let selectedCities = new Set(); // 선택된 도시를 저장할 Set
 const MAX_SELECTED_CITIES = 4; // 선택 가능한 최대 도시 개수

document.addEventListener("DOMContentLoaded", () => {
    initMap();

    const selectItem = document.getElementById("selectItem");

    selectItem.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("selected-item")) {
            const locationText = event.target.getAttribute("data-location");
            const marker = markers.find((m) => m.getTitle() === locationText);
            const locationBlock = event.target;
            removeMarkerAndBlock(locationText, marker, locationBlock);
        }
    });

function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
            zoom: 8,
        });

        geocoder = new google.maps.Geocoder();

        const locationItems = document.querySelectorAll('#locationList li');

        locationItems.forEach((item) => {
            item.addEventListener('click', () => {
                const cityName = item.querySelector('.B').textContent.trim();
                const countryName = item.querySelector('.C').textContent.trim();
                const localId = item.querySelector('.D').textContent.trim();

                const locationText = `${cityName}, ${countryName}`;
                const locationText2 = `${localId}`;

                if (selectedCities.size >= MAX_SELECTED_CITIES) {
                    alert("고를 수 있는 관광지는 최대 4개입니다. 먼저 등록한 관광지를 눌러 제거해주세요.");
                    return;
                }

                if (selectedCities.has(locationText)) {
                    alert(`'${locationText}'는 이미 선택된 지역입니다.`);
                    return;
                }
                var national = document.querySelector("#national");
                var city = document.querySelector("#city");
                var nationalValue= national.value;
                var cityValue=city.value;
                var id = item.querySelector('.C').dataset.id;
                var local = item.querySelector('.B').dataset.location;
                var local_Id = item.querySelector('.D').dataset.localID;

                national.value=nationalValue+","+id;
                city.value=cityValue+","+local;



                geocoder.geocode({ address: locationText }, (results, status) => {
                    if (status === "OK" && results && results.length > 0) {
                        const location = results[0].geometry.location;

                        const marker = new google.maps.Marker({
                            map: map,
                            position: location,
                            title: locationText,
                        });

                        const infowindow = new google.maps.InfoWindow({
                            content: locationText,
                        });

                        marker.addListener("click", () => {
                            infowindow.open(map, marker);
                        });

                        markers.push(marker);

                        addCityToSelection(locationText, locationText2, marker);
                        map.panTo(location); // 맵을 선택된 위치로 이동
                    } else {
                        console.error("위치를 찾을 수 없습니다.");
                    }
                });
            });
        });
    }
function addCityToSelection(locationText,locationText2, marker) {
    if (selectedCities.has(locationText)) {
        return;
    }

    if (selectedCities.size >= MAX_SELECTED_CITIES) {
        alert("고를 수 있는 관광지는 최대 4개입니다. 먼저 등록한 관광지를 눌러 제거해주세요.");
        return;
    }

    const selectItem = document.getElementById("selectItem");

    // 동일 지역명 블록이 이미 존재하는지 확인
    const existingBlock = selectItem.querySelector(`.selected-item[data-location="${locationText}"]`);
    if (existingBlock) {
        return;
    }

    const locationBlock = document.createElement("div");
    locationBlock.classList.add("selected-item");
    locationBlock.setAttribute("data-location", locationText);
    locationBlock.textContent = locationText;

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "localId";
    hiddenInput.value = locationText2;
    locationBlock.appendChild(hiddenInput);

    locationBlock.addEventListener("click", () => {
        removeMarkerAndBlock(locationText, marker, locationBlock);
    });

    selectItem.appendChild(locationBlock);
    selectedCities.add(locationText);
}
function removeMarkerAndBlock(locationText, marker, locationBlock) {
        const index = markers.findIndex((m) => m === marker);
        if (index !== -1) {
            markers.splice(index, 1);
        }
        marker.setMap(null);

        selectedCities.delete(locationText);
        locationBlock.remove();
    }

});
