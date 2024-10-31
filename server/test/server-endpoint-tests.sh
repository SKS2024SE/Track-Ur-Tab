curl -X POST http://localhost:5001/register -H "Content-Type: application/json" -d '{"email": "araviku@ncsu.edu", "password": "admin123", "name": "Amar Ravikumar"}'

curl -X POST http://localhost:5001/login -H "Content-Type: application/json" -d '{"email":"kswamin@ncsu.edu", "password":"admin123"}'

curl -X POST http://localhost:5001/update-user -H "Content-Type: application/json" -d '{"email": "kswamin3@ncsu.edu","name": "Krithika S", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNjI3MTd9.BG3Z7XWxyEWj0sZipfODeSz3n9fdrmAJxYeHILym92Y"}'

curl -X POST http://localhost:5001/delete-user -H "Content-Type: application/json" -d '{"email": "kswamin3@ncsu.edu", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNjI3MTd9.BG3Z7XWxyEWj0sZipfODeSz3n9fdrmAJxYeHILym92Y"}'

curl -X POST http://localhost:5001/user/fetch-exp -H "Content-Type: application/json" -d '{"email": "kswamin3@ncsu.edu", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNjI3MTd9.BG3Z7XWxyEWj0sZipfODeSz3n9fdrmAJxYeHILym92Y"}'

curl -X GET http://localhost:5001/user-info/kswamin3 -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNjI3MTd9.BG3Z7XWxyEWj0sZipfODeSz3n9fdrmAJxYeHILym92Y"

# Checking for add-expense
curl -X POST http://localhost:5001/group/add-expense -H "Content-Type: application/json" -d '{"owner": "kswamin3", "member_costs": {"kswamin3": -40},"total_cost": 40, "type":"personal", "grp_id":"1234", "email": "kswamin3@ncsu.edu", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwODAwMDZ9.nUrg-Rms1vZHWJU18s5Tp1D3IDZmM3_liP9eB0VGtJ0"}'

# Trying to add a user 
curl -X POST http://localhost:5001/group/add-member -H "Content-Type: application/json" -d '{ "user_id": "kswamin3", "member_id": "araviku@ncsu.edu", "grp_id":"1223", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNjI3MTd9.BG3Z7XWxyEWj0sZipfODeSz3n9fdrmAJxYeHILym92Y"}'

# For group
curl -X POST http://localhost:5001/group/create -H "Content-Type: application/json" -d '{ "owner": "kswamin3", "type": "group", "name": "Krithika group", "email_ids": ["araviku@ncsu.edu", "kswamin3@ncsu.edu", "sshunmu@ncsu.edu", "sshunmu2@ncsu.edu"], "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNzc4Njl9.yeVeGj0UNy-OLgFmFuGERNi45phH3Ytevp_1ZzGe6TQ"}'

# For personal expenses
curl -X POST http://localhost:5001/group/create -H "Content-Type: application/json" -d '{ "owner": "EpIYdI1MCc9a", "type": "personal", "name": "Amar personal expenses", "email_ids": ["araviku@ncsu.edu"], "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRXBJWWRJMU1DYzlhIiwiaWF0IjoxNzMwMDc4MTg2fQ.11ojuqBszTVxH8YiuGPWafBCIKBPUthVjVSD-J3QAsc"}'

curl -X GET http://localhost:5001/group/1234 -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwNzg2MTh9.5rW89fM8SmCI8sEKvxdCur_uR8qmpton8WHJ5JVmJKs"

curl -X POST http://localhost:5001/group/expenses -H "Content-Type: application/json" -d '{ "grp_id": "1234", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwODAwMDZ9.nUrg-Rms1vZHWJU18s5Tp1D3IDZmM3_liP9eB0VGtJ0"}'

curl -X POST http://localhost:5001/user/group-details -H "Content-Type: application/json" -d '{ "user_id": "kswamin3", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwODAwMDZ9.nUrg-Rms1vZHWJU18s5Tp1D3IDZmM3_liP9eB0VGtJ0"}'

curl -X POST http://localhost:5001/user/fetch-exp -H "Content-Type: application/json" -d '{ "user_id": "kswamin3", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwODAwMDZ9.nUrg-Rms1vZHWJU18s5Tp1D3IDZmM3_liP9eB0VGtJ0"}'

curl -X POST http://localhost:5001/group/delete/1225 -H "Content-Type: application/json" -d '{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwODAwMDZ9.nUrg-Rms1vZHWJU18s5Tp1D3IDZmM3_liP9eB0VGtJ0"}'

curl -X POST http://localhost:5001/expense/delete/e13 -H "Content-Type: application/json" -d '{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia3N3YW1pbjMiLCJpYXQiOjE3MzAwODAwMDZ9.nUrg-Rms1vZHWJU18s5Tp1D3IDZmM3_liP9eB0VGtJ0"}'
