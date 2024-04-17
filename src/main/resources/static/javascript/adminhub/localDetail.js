$(document).ready(function () {

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

    /* businessHours 맵 데이터를 폼에 전달하기 위해 input 필드 생성 */
    var businessHours = /*[[${adminItemDto.businessHours}]]*/{};

    // 각 요일에 대해 am/pm 값을 적절한 input 필드에 설정
    for (var day in businessHours) {
        if (businessHours.hasOwnProperty(day)) {
            var am = businessHours[day].split(' - ')[0]; // 오전 시간
            var pm = businessHours[day].split(' - ')[1]; // 오후 시간

            // 해당 요일의 오전/오후 input 필드에 값을 설정
            $('input[name="' + day + '_am"]').val(am);
            $('input[name="' + day + '_pm"]').val(pm);
        }
    }
     $('.delete-btn').on('click', function(event) {
         event.preventDefault(); // 기본 동작 중지

         if (!confirm('정말 삭제하시겠습니까?')) {
             return; // 사용자가 취소하면 동작 중지
         }

         // 해당 요소의 부모인 .local_block에서 data-item-id 속성 값을 가져와서 itemId로 사용
         var itemId = $(this).closest('.local_block').attr('data-item-id');


         if (itemId === undefined) {
             console.error('Item ID is undefined');
             return;
         }

         // AJAX 요청을 이용하여 아이템 삭제
         $.ajax({
             url: '/admin/item/delete/' + itemId,
             type: 'DELETE',
             headers: {
                     'X-XSRF-TOKEN': getCsrfToken()
                 },
             success: function(response) {
                 console.log('Item deleted successfully:', response);
                 // 페이지 새로고침 또는 UI 업데이트 등
                 location.reload(); // 예시: 페이지 새로고침
             },
             error: function(xhr, status, error) {
                 console.error('Error deleting item:', xhr.responseText);
                 // 에러 처리
             }
         });
     });

    /* // 모달 저장 버튼 클릭 시 처리
     $('#saveModalBtn').on('click', function() {
         var formData = new FormData($('#modalForm')[0]);

         // AJAX를 이용해 모달 내용을 서버에 전송
         $.ajax({
             url: '/admin/item',
             method: 'POST',
             processData: false,
             contentType: false,
             data: formData,
             success: function(response) {
                 // 성공 시 처리
                 console.log(response);
                 // 저장 후 화면 갱신 등 필요한 작업 수행
                 location.reload(); // 페이지 새로고침 (예시로 사용)
             },
             error: function(xhr, status, error) {
                 // 실패 시 처리
                 console.error(xhr.responseText);
             }
         });
     });*/

       // `.content_box` 내의 `.block_detail` 클릭 이벤트 위임
       $('.content_box').on('click', '.block_detail', function() {
       var itemId = $(this).closest('.local_block').attr('data-item-id');

           // itemId를 사용하여 서버로부터 해당 아이템 정보를 가져옴
            $.get('/admin/item/' + itemId, function(data) {
                // 서버로부터 받은 모달 컨텐츠를 모달에 적용
                $('#myModal .modal-content').html(data);

                // 모달 표시
                $('#myModal').modal('show');
            });
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