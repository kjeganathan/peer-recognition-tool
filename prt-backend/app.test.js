// Reference: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

const request = require('supertest')
const app = require('./app')

test('Hello World Test', () => {
  expect(1 + 1).toBe(2)
})

// Here is what an actual test might look like. We can use "describe" to group
// tests together like so.
//
// describe('/hello', () => {
//
//   test('GET /hello returns "hello"', () => {
//     return request(app)
//       .get('/hello')
//       .then(response => {
//         expect(response.body).toBe('hello')
//         expect(response.statusCode).toBe(200)
//       })
//   })
//
// })
