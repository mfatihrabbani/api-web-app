curl http://localhost:3001/api/users/register \
--include \
--header "Content-Type: application/json" \
--request "POST" \
--data '{"email": "admin1@gmail.com", "password": "12345678", "confirmPassword": "12345678"}'

curl http://localhost:3001/api/users/login \
--include \
--header "Content-Type: application/json" \
--request "POST" \
--data '{"email": "admin1@gmail.com", "password": "12345678"}'

curl http://localhost:3001/api/users/forgot \
--include \
--header "Content-Type: application/json" \
--request "POST" \
--data '{"idUser": "1kjqhpa6ulfalk7x2"}'

curl http://localhost:3001/api/users/forgot/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxa2pxaHBhNnVsZmFsazd4MiIsImlhdCI6MTY3ODk1MjM4NywiZXhwIjoxNjc4OTU1OTg3fQ.Jwzya0S1E3IJ6Y9C5k5oI_yJ34ETxmwRI4ko63Z9F6Q \
--include \
--header "Content-Type: application/json" \
--request "POST" \
--data '{"newPassword": "papa1234", "confirmPassword": "papa1234"}'
