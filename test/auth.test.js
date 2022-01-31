import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server.js";


chai.should();

chai.use(chaiHttp);

// Todo After All remove created user

describe('Auth API', () => {

    /**
     * Test the GET route
     */
    // describe("POST /api/auth/signup", () => {

    //     it("It should signup", (done) => {
    //         const user = {
    //             "secretKey": process.env.API_KEY,
    //             "name": "asdf23423",
    //             "email": "aaa234234@gmail.com",
    //             "password": "123456"
    //         };
    //         chai.request(server)
    //             .post("/api/auth/signup")
    //             .query({
    //                 secretKey: process.env.API_KEY
    //             })
    //             .send(user)
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 done();
    //             });
    //     });

    //     it("It should NOT Create User", (done) => {
    //         chai.request(server)
    //             .post("/api/auth/signup")
    //             .end((err, response) => {
    //                 response.should.have.status(401);
    //                 done();
    //             });
    //     });

    // });


    /**
     * Test the GET (by id) route
     */
    describe("POST /api/auth/signin", () => {
        it("It should login", (done) => {
            const user = {
                "secretKey": process.env.API_KEY,
                "email": "aaa234234@gmail.com",
                "password": "123456"
            };

            chai.request(server)
                .post("/api/auth/signin")
                .query({
                    secretKey: process.env.API_KEY
                })
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });

        it("It should NOT login without secretKey", (done) => {

            const user = {
                "email": "aaa234234@gmail.com",
                "password": "123456"
            };

            chai.request(server)
                .post("/api/auth/signin")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

        it("It should NOT login if user does not exists", (done) => {

            const user = {
                "secretKey": process.env.API_KEY,
                "email": "fakeUser@gmail.com",
                "password": "123456"
            };
            chai.request(server)
                .get("/api/auth/signin")
                .query({
                    secretKey: process.env.API_KEY
                })
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });


});