describe("Person Page", () => {
  beforeEach(() => {
    cy.visit("/dontknowwhereitsgoing");
  });

  it("should visit non existent page", () => {
    cy.get("[data-cy=notFound]").should("be.visible");
    cy.get("[data-cy=message]")
      .should("be.visible")
      .contains("This is not the page you are looking for.");
  });
});
