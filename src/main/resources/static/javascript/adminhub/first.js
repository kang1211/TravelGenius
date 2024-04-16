$(document).ready(function() {
    // CSRF 토큰 가져오기
    function getCsrfToken() {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const csrfCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));

        if (csrfCookie) {
            return csrfCookie.split('=')[1];
        } else {
            return null; // CSRF 토큰을 찾지 못한 경우
        }
    }


    // .content_box 내부에서 .local_block을 클릭했을 때의 이벤트 처리
    $('.content_box').on('click', '.local_block', function() {
        var country = $(this).find('.country').text().trim();
        var local = $(this).find('.local').text().trim().slice(1, -1);
        var localId = $(this).data('local-id'); // 클릭한 지역의 ID 가져오기

        // localId가 정상적으로 설정되어 있다면 URL 생성 및 이동
        if (localId) {
            window.location.href = '/admin/localDetail?localId=' + localId;
        } else {
            console.error('클릭한 지역의 local-id가 정의되지 않았습니다.');
            // localId가 정의되지 않은 경우에 대한 처리
            // 예: 경고 메시지 표시 또는 오류 처리
        }
    });



    // 폼 제출 시 데이터 전송
    $('#localForm').submit(function(event) {
        event.preventDefault(); // 기본 동작 방지

        var country = $('#countryInput').val();
        var local = $('#localInput').val();
        var csrfToken = getCsrfToken(); // CSRF 토큰 가져오기

        // 서버에 데이터를 전송하여 저장
        $.ajax({
            type: 'POST',
            url: '/admin/saveLocal',
            data: {
                country: country,
                local: local
            },
            headers: {
                'X-XSRF-TOKEN': csrfToken // 헤더에 CSRF 토큰 추가
            },
            success: function(response) {
                // 성공적으로 저장된 경우
                alert(response); // 성공 메시지 표시
                $('#countryInput').val(''); // 입력 필드 초기화
                $('#localInput').val(''); // 입력 필드 초기화
            },
            error: function(xhr, status, error) {
                // 오류 발생 시 처리
                if (xhr.status === 400) {
                    // 중복된 지역이 이미 존재하는 경우
                    var errorMessage = xhr.responseText;
                    alert(errorMessage); // 오류 메시지 표시
                } else {
                    console.error('오류 발생:', error);
                    alert('오류가 발생했습니다: ' + error); // 일반적인 오류 메시지 표시
                }
            }
        });
    });

    // 페이지 로드 시 서버로부터 모든 국가와 지역 정보를 요청하여 블록 생성
    $.ajax({
        type: "GET",
        url: "/admin/getAllLocals",
        success: function(data) {
            data.forEach(function(local) {
                var newLocalBlock = '<div class="local_block" data-local-id="' + local.id + '">' +
                    '<p class="country">' + local.country + '</p>' +
                    '<p class="local">(' + local.local + ')</p>' +
                    '</div>';

                var $newLocalElement = $(newLocalBlock);
                $('.content_box').append($newLocalElement);
            });
        },
        error: function(xhr, status, error) {
            console.error("Failed to fetch data:", error);
        }
    });
});
