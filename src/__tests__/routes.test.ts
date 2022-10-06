import app from "../server";
import supertest from "supertest";
describe("/ GET", () => {
  it("should return a message", async () => {
    const res = supertest(app);
    expect((await res.get("/")).statusCode).toEqual(200);
    expect(await (await res.get("/")).body.message).toBe("welcome");
  });
});
