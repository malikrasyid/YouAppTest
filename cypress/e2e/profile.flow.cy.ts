describe('User Profile Flow', () => {
  beforeEach(() => {
    // Start at the login page
    cy.visit('/auth/login');
  });

  it('should allow a user to login and update interests', () => {
    // 1. Login
    cy.get('input[placeholder*="Username"]').type('testuser');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains('Login').click();

    // 2. Verify we are on the Home/Profile page
    cy.url().should('include', '/main/home');
    cy.contains('Interest').should('be.visible');

    // 3. Navigate to Interests Page
    // Assuming the Edit2 icon is inside a link or button
    cy.get('a[href*="interests"]').click();

    // 4. Add a new interest
    const newInterest = 'React Testing';
    cy.get('input').last().type(`${newInterest}{enter}`);
    
    // Check if the chip/tag appeared
    cy.contains(newInterest).should('be.visible');

    // 5. Save and Go Back
    cy.get('button').contains('Save').click();

    // 6. Final Verification on Home Page
    cy.url().should('include', '/main/home');
    cy.get('main').should('contain', newInterest);
  });
});