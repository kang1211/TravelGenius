$(document).ready(function () {

    $('#saveModalBtn').click(function () {
        var touristSpotName = $('#touristSpotName').val();
        var address = $('input[name="address"]').val();
        var contact = $('input[name="contact"]').val();
        var features = $('#InputFeatures').val();

        if (!touristSpotName || !address || !contact || !features) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        var businessHours = {};
        $('.day-time-entry').each(function () {
            var day = $(this).find('label').text(); // 요일 가져오기
            var amTime = $(this).find('input[name$="_am"]').val(); // 오전 시간 가져오기
            var pmTime = $(this).find('input[name$="_pm"]').val(); // 오후 시간 가져오기
            businessHours[day] = amTime + ' - ' + pmTime; // 요일과 시간을 JSON 객체에 추가
        });

        var formData = new FormData();
        var imageFile = $('#imageInput')[0].files[0];

        if (!imageFile) {
            alert('이미지 파일을 선택해주세요.');
            return;
        }

        formData.append('imageFile', imageFile);
        formData.append('touristSpotName', touristSpotName);
        formData.append('address', address);
        formData.append('contact', contact);
        formData.append('features', features);
        formData.append('businessHours', JSON.stringify(businessHours)); // JSON 객체를 문자열로 변환하여 추가

        // 현재 URL에서 localId 파라미터 값을 추출
        var localId = extractLocalIdFromUrl();

        $.ajax({
            type: 'post',
            url: '/admin/item/' + localId,
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-XSRF-TOKEN': getCsrfToken()
            },
            success: function (response) {
                console.log('Form submitted successfully!');
                alert('저장되었습니다!');

                saveLocalBlocks(); // 로컬 스토리지 업데이트
                $('#myModal').modal('hide'); // 모달 닫기
            },
            error: function (xhr, status, error) {
                console.error('Form submission failed:', error);
                alert('저장에 실패했습니다. 다시 시도해주세요.');
            }
        });

    });

    function extractLocalIdFromUrl() {
        var url = window.location.href;
        var lastSegment = url.substr(url.lastIndexOf('/') + 1);
        return lastSegment;
    }

    function getCsrfToken() {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const csrfCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));

        if (csrfCookie) {
            return csrfCookie.split('=')[1];
        } else {
            return null; // CSRF 토큰을 찾지 못한 경우
        }
    }

    function saveLocalBlocks() {
        var localBlocks = [];
        $('.local_block').each(function () {
            var blockData = {};
            blockData.imageUrl = $(this).find('img').attr('src');
            blockData.touristSpotName = $(this).find('p').text();
            localBlocks.push(blockData);
        });
        localStorage.setItem('localBlocks', JSON.stringify(localBlocks));
    }

    // 모달 열기 전에 데이터 채우기
    $('.content_box').on('click', '.local_block', function () {
        var imageUrl = $(this).find('img').attr('src');
        var touristSpotName = $(this).find('p').text();

        $('#modalImage').attr('src', imageUrl);
        $('#touristSpotName').val(touristSpotName);

        $('#myModal').modal('show');
    });

    // 동적으로 생성된 삭제 버튼에 이벤트 핸들러 추가
    $('.content_box').on('click', '.delete-btn', function () {
        $(this).closest('.local_block').remove();
        saveLocalBlocks(); // 삭제 후 로컬 스토리지 업데이트
    });

    function bindImg() {
        $("#imageInput").on("change", function () {
            var filename = $(this).val().split("\\").pop(); // Extract file name
            var fileExt = filename.split('.').pop().toLowerCase(); // Extract file extension

            var validExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
            if (!validExtensions.includes(fileExt)) {
                alert("Only JPG, JPEG, PNG, GIF, BMP files are allowed.");
                $(this).val(''); // Clear file input
                return;
            }

            $(this).prev(".input-group-text").html(filename);
        });
    }

    bindImg(); // Call the function to bind image input
});
