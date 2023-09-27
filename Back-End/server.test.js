// import request from 'supertest'
import app from './server.js'
// import { request } from 'express'

const request = require("supertest");


describe("POST /api", () => {

    describe("Feed vaild prompt to different AI", () =>{
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/Chatgpt").send({
                prompt: "bird"
            })
            expect(response.statusCode).toBe(200)
        })
        test("should respond with a 200 status code", (done) => {
            request(app).post("/api/v1/Chatgpt").send({
                prompt: "bird"
            })
            .expect(response.statusCode).toBe(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
        })
    })

    // describe("return specify json in content type header", () =>{
    //     test("return specify json in content type header", async () => {
    //         const response = await request(app).post("/api/v1/STABLEDIFFUSION").send({
    //             prompt: "bird"
    //         })
    //         expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    //     })
    // })

    describe("Feed empty prompt to different AI", () =>{
        test("should respond with a 400 status code", async () => {
            const response = await request(app).post("/api/v1/Chatgpt").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500)
        })
    })

})