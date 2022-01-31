import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server.js";


chai.should();

chai.use(chaiHttp);

describe('Category API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/categories", () => {
        it("It should GET all the categories", (done) => {
            chai.request(server)
                .get("/api/categories")
                .query({
                    secretKey: process.env.API_KEY
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });

        it("It should NOT GET all the categories", (done) => {
            chai.request(server)
                .get("/api/categories")
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /api/categories/:id", () => {
        it("It should GET a category by ID", (done) => {

            const categoryId = "mens-clothing-jackets";
            chai.request(server)
                .get("/api/categories/" + categoryId)
                .query({
                    secretKey: process.env.API_KEY
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('page_description');
                    response.body.should.have.property('page_title');
                    response.body.should.have.property('image');
                    response.body.should.have.property('id').eq(categoryId);
                    done();
                });
        });

        it("It should NOT GET a category by ID without secretKey", (done) => {
            const categoryId = 'mens-clothing-jackets';
            chai.request(server)
                .get("/api/categories/" + categoryId)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

        it("It should NOT GET a category by ID", (done) => {
            const categoryId = 123;
            chai.request(server)
                .get("/api/categories/" + categoryId)
                .query({
                    secretKey: process.env.API_KEY
                })
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

    });

    /**
     * Test the GET by ParentId route
     */
    describe("GET /api/categories/parent/:id", () => {

        it("It should GET all the sub categories of that parent category ", (done) => {
            const parentId = 'mens-clothing';
            chai.request(server)
                .get("/api/categories/parent/" + parentId)
                .query({
                    secretKey: process.env.API_KEY
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });

        it("It should NOT GET all the sub categories", (done) => {
            const parentId = 'mens-clothing';
            chai.request(server)
                .get("/api/categories/parent/" + parentId)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

    });

});