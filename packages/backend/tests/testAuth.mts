const body = JSON.stringify({
  email: "user@example.com",
  password: "user123",
});

const res = await fetch("http://localhost:3000/api/v1/users/login", {
  method: "POST",
  body,
  headers: {
    "Content-Type": "application/json",
  },
});

console.info("status:", res.status);
console.info("body:", await res.json());

const res2 = await fetch("http://localhost:3000/api/v1/users/protected", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJfaWQiOiIyIiwiaWF0IjoxNzcxNTY1NDIyLCJleHAiOjE3NzE2NTE4MjJ9.GYfeB3RKx2xLiLHiM7jCRqgDp-ldALNu1YAk4Un0-08",
  },
});

console.info("status:", res2.status);
console.info("body:", await res2.json());
