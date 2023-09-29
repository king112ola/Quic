const request = require("supertest");
const app = require("./app");

describe("POST /api", () => {

    describe("Feed vaild prompt to different AI", () =>{
        
        test("Chatgpt should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/Chatgpt").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("DALLE2 should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/DALLE2").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("SAMSUM should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/SAMSUM").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("T2SEDEN should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/T2SEDEN").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("RIFFUSION should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/RIFFUSION").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("ANYTHING should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/ANYTHING").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("OPENJOURNEY should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/OPENJOURNEY").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        test("STABLEDIFFUSION should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/v1/STABLEDIFFUSION").send({
                prompt: "a yellow bird"
            })
            expect(response.statusCode).toBe(200);
        })

        // Error on testing QuicAI and DID and PDFTRANSEDEN

        // test.concurrent("QuicAI should respond with a 200 status code", async () => {
        //     const response = await request(app).post("/api/v1/QuicAI").send({
        //         prompt: "a yellow bird"
        //     })
        //     expect(response.statusCode).toBe(200);
        // })
        
        // No respond
        // test("should respond with a 200 status code", async () => {
        //     const response = await request(app).post("/api/v1/DID").send({
        //         prompt: "a yellow bird"
        //     })
        //     expect(response.statusCode).toBe(200);
        // })

        // test("should respond with a 200 status code", async () => {
        //     const response = await request(app).post("/api/v1/PDFTRANSEDEN").send({
        //         uploadedPdf: "a yellow bird"
        //     })
        //     expect(response.statusCode).toBe(200);
        // })

    })

    describe("Feed empty prompt to different AI", () =>{
        
        test("Chatgpt should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/Chatgpt").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("DID should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/DID").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("SAMSUM should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/SAMSUM").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("T2SEDEN should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/T2SEDEN").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("RIFFUSION should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/RIFFUSION").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("ANYTHING should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/ANYTHING").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("OPENJOURNEY should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/OPENJOURNEY").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })

        test("STABLEDIFFUSION should respond with a 500 status code", async () => {
            const response = await request(app).post("/api/v1/STABLEDIFFUSION").send({
                prompt: ""
            })
            expect(response.statusCode).toBe(500);
        })
    })

    //Error list
    // test("PDFTRANSEDEN should respond with a 500 status code", async () => {
    //     const response = await request(app).post("/api/v1/PDFTRANSEDEN").send({
    //         uploadedPdf: ""
    //     })
    //     expect(response.statusCode).toBe(500);
    // })

    // test.concurrent("QuicAI should respond with a 500 status code", async () => {
    //     const response = await request(app).post("/api/v1/QuicAI").send({
    //         prompt: ""
    //     })
    //     expect(response.statusCode).toBe(500);
    // })

})