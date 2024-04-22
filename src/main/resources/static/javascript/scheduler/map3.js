document.addEventListener("DOMContentLoaded", () => {
let markers = []; // 핀을 관리하는 배열
let map;
let geocoder;
let selectedSpots = new Set(); // 선택된 도시를 저장할 Set
const mapElement = document.getElementById("map");
const initialLocalValue = document.getElementById("initialLocal").value;

console.log("initialLocal:", initialLocalValue);
initMap(initialLocalValue);

function initMap(initialLocation) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.5665, lng: 126.978 }, // 초기 지도 중심 위치 (서울 시청)
        zoom: 11,
    });

    geocoder = new google.maps.Geocoder();

    if (initialLocation) {
        const locationText = initialLocation;

        geocoder.geocode({ address: locationText }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
                const location = results[0].geometry.location;
                // 검색된 위치를 지도의 중심으로 설정
                map.setCenter(location);
                geocodeAndAddBlueMarker(locationText);
            } else {
                console.error("위치를 찾을 수 없습니다.");
                // 초기 위치 설정에 실패한 경우, 지도는 서울 시청을 중심으로 유지됩니다.
            }
        });
    }

    const locationItems = document.querySelectorAll('.contents');

    locationItems.forEach((stay) => {
        const checkbox = stay.querySelector('.location-checkbox');
        const stayName = stay.querySelector('.stay-name').textContent;
        const stayId = stay.querySelector('.D').textContent.trim();

        checkbox.addEventListener('change', (event) => {
            const locationText = stayName;

            if (event.target.checked) {
                if (selectedSpots.has(locationText)) {
                    alert(`'${locationText}'는 이미 선택된 장소입니다.`);
                    event.target.checked = false;
                    return;
                }

                geocoder.geocode({ address: locationText }, (results, status) => {
                    if (status === "OK" && results && results.length > 0) {
                        const location = results[0].geometry.location;

                        const marker = new google.maps.Marker({
                            map: map,
                            position: location,
                            title: locationText,
                        });

                        markers.push(marker);
                        addCityToSelection(locationText, stayId, marker);
                        map.panTo(location);
                    } else {
                        console.error("위치를 찾을 수 없습니다.");
                    }
                });
            } else {
                const marker = markers.find((m) => m.getTitle() === locationText);
                const locationBlock = document.querySelector(`.selected-item[data-location="${locationText}"]`);
                if (marker && locationBlock) {
                    removeMarkerAndBlock(locationText, marker, locationBlock);
                }
            }
        });

        const locationBlock = document.querySelector(`.selected-item[data-location="${stayName}"]`);
        if (locationBlock) {
            locationBlock.addEventListener('click', () => {
                checkbox.checked = false; // 체크박스 상태 변경
                removeMarkerAndBlock(stayName, markers.find((m) => m.getTitle() === spotName), locationBlock);
            });
        }
    });
}

function addCityToSelection(locationText, locationId, marker) {
        if (selectedSpots.has(locationText)) {
            return;
        }

        const selectItem = document.getElementById("selectItem");

        const locationBlock = document.createElement("div");
        locationBlock.classList.add("selected-item");
        locationBlock.setAttribute("data-location", locationText);
        locationBlock.textContent = locationText;

        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "spotId";
        hiddenInput.value = locationId;
        locationBlock.appendChild(hiddenInput);

        selectItem.appendChild(locationBlock);
        selectedSpots.add(locationText);
    }

    function removeMarkerAndBlock(locationText, marker, locationBlock) {
        const index = markers.findIndex((m) => m === marker);
        if (index !== -1) {
            markers.splice(index, 1);
        }
        marker.setMap(null);

        selectedSpots.delete(locationText);
        locationBlock.remove();

        // 관련된 contents의 체크박스 상태 변경
        const relatedContent = document.querySelector(`.contents[data-content-type="${locationText}"]`);
        const checkbox = relatedContent.querySelector('.location-checkbox');
        if (checkbox) {
            checkbox.checked = false;
        }
    }
});