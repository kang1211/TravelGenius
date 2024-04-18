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

    // 삭제 버튼 클릭 이벤트 핸들러 - 이벤트 위임 사용
   $('.content_box').on('click', '.delete', function() {
       var $localBlock = $(this).closest('.local_block'); // 클릭된 삭제 버튼의 상위 .local_block 요소 선택

       // 삭제할 국가와 지역 정보 가져오기
       var country = $localBlock.find('.country').text().trim();
       var local = $localBlock.find('.local').text().trim().slice(1, -1);

       console.log('Deleting:', country, local);

       // 삭제 요청 보내기 (예: 서버 API 호출)

       // 삭제된 요소 화면에서 제거
       $localBlock.remove();
       alert('삭제되었습니다.');
   });

   // 국가/지역 정보 클릭 이벤트 핸들러 - 이벤트 위임 사용
   $('.content_box').on('click', '.country, .local', function() {
       var $localBlock = $(this).closest('.local_block'); // 클릭된 요소의 상위 .local_block 요소 선택

       // 국가와 지역 정보 가져오기
       var country = $localBlock.find('.country').text().trim();
       var local = $localBlock.find('.local').text().trim().slice(1, -1);

       console.log('Viewing details:', country, local);

       // 지역 상세 페이지로 이동
       var url = '/admin/localDetail?country=' + encodeURIComponent(country) + '&local=' + encodeURIComponent(local) + '&content=명소';
       console.log('URL:', url);

       // 페이지 이동
       window.location.href = url;
   });

});


