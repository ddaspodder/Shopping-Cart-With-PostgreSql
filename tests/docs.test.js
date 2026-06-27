require("ts-node/register/transpile-only");

const { openApiDocument } = require("../src/docs/swagger");

describe("OpenAPI docs contract", () => {
  it("includes cart and order endpoints", () => {
    expect(openApiDocument.paths["/cart"]).toBeDefined();
    expect(openApiDocument.paths["/cart/add"]).toBeDefined();
    expect(openApiDocument.paths["/cart/remove"]).toBeDefined();
    expect(openApiDocument.paths["/cart/clear"]).toBeDefined();
    expect(openApiDocument.paths["/orders"]).toBeDefined();
    expect(openApiDocument.paths["/orders/{id}"]).toBeDefined();
    expect(openApiDocument.paths["/orders/{id}/status"]).toBeDefined();
  });
});
