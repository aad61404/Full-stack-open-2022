describe("Blog app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3001");
    cy.contains("blogs");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  it('user can login', function () {
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
    cy.contains('login').click()
  })  

});
