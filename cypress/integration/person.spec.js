describe("Person Page", () => {
  beforeEach(() => {
    cy.visit("/person/1");
  });

  it("should visit the person page , it should have a h1 tag with a name", () => {
    cy.get("[data-cy=person]").should("be.visible");
    cy.get("[data-cy=name]").should("be.visible").contains("Luke Skywalker");
  });

  it("should click the back to home button which should redirect to home page ", () => {
    cy.get("[data-cy=backToHome]").should("be.visible").click();
    cy.location("pathname").should("eq", "/");
  });
});
