import React, { useEffect, useState } from 'react';

export default function CheckToken({ match }) {
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    // Kiểm tra tính hợp lệ của token ở đây, ví dụ gửi yêu cầu API kiểm tra.
    const token = match.params.token; // Lấy token từ URL

    // Thực hiện kiểm tra token ở đây, ví dụ sử dụng fetch
    fetch(`http://localhost:8080/forgot/check_token?token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isValid) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      })
      .catch((error) => {
        console.error('Error checking token: ', error);
        setIsValidToken(false);
      });
  }, [match.params.token]);

}
