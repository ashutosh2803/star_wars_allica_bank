describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit the homepage , logo and input should be mounted", () => {
    cy.get("[data-cy=logo]")
      .should("be.visible")
      .should("have.attr", "alt", "Star Wars Logo");

    cy.get("[data-cy=input]")
      .should("be.visible")
      .should("have.attr", "placeholder", "Search by name");
  });

  it("should search type a and should get at max 6 results in the search body", () => {
    const inputData = "s";

    cy.get("[data-cy=input]")
      .should("be.visible")
      .should("have.attr", "placeholder", "Search by name")
      .type(inputData);

    cy.get("[data-cy=searchBody]")
      .should("be.visible")
      .children()
      .should("be.visible")
      .should("have.length", 6);
  });

  it("should change background color when hovered over a search card , in short highlighted", () => {
    const inputData = "s";

    cy.get("[data-cy=input]").should("be.visible").type(inputData);

    cy.get("[data-cy=searchCard]")
      .eq(2)
      .should("be.visible")
      .trigger("mouseover")
      .should("have.css", "background-color", "rgb(255, 235, 0)");
  });

  it("should clear input value on clicking clear text icon", () => {
    const inputData = "s";

    cy.get("[data-cy=input]")
      .should("be.visible")
      .should("have.attr", "placeholder", "Search by name")
      .type(inputData);

    cy.get("[data-cy=clear]").should("be.visible").click();

    cy.get("[data-cy=input]").should("be.visible").should("have.value", "");
  });

  it("should click over a card and redirect to character page", () => {
    const inputData = "s";

    cy.get("[data-cy=input]")
      .should("be.visible")
      .should("have.attr", "placeholder", "Search by name")
      .type(inputData);

    cy.get("[data-cy=searchCard]")
      .eq(2)
      .should("be.visible")
      .trigger("mouseover")
      .click();

    cy.location("pathname").should("eq", "/person/7");
  });
});
