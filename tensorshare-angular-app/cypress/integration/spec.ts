describe('Tensor Models', () => {
  const username = ''
  const password = ''
  const tensorModelName = ''

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  beforeEach(() => {
    // Home page
    cy.visit('/')
    cy.contains('Create and share your supervised models')
    cy.contains('Sign in')

    // Login page
    cy.visit('/Login')
    cy.contains('Username')
    cy.contains('Password')
    cy.get('#mat-input-0').type(username)
    cy.get('#mat-input-1').type(password + '{enter}') // Pressing Enter
  });

  it('View all Tensor Models in Explore page', () => {
    // User's Tensor Models
    cy.url().should('include', `/${username}/TensorModels`)
    cy.contains(`All ${username}'s Tensor Models`)

    // Click Explore menu button, visit Explore
    cy.get('[routerlink="/Explore"] > .mat-button-wrapper').click();
    cy.contains('Explore other Tensor Models')

    // Sign out
    cy.contains('Sign out').click()
  });

  it('Update Tensor Model', () => {
    // User's Tensor Models
    cy.url().should('include', `/${username}/TensorModels`)
    cy.contains(`All ${username}'s Tensor Models`)

    // Tensor Model details page
    cy.contains(`${username} / ${tensorModelName}`).click()
    cy.contains(tensorModelName);

    // Update page
    cy.get('button').contains('more_vert').click();
    cy.get('button').contains('Edit').click();
    cy.contains('Update Tensor Model');

    const randomNumber = getRandomInt(1000);
    const updatedDescription = `A CNN model (yolov5) that detects frogs. ${randomNumber}`;

    cy.get('#mat-input-4').type(updatedDescription)
    cy.get('button').contains('Update').click();

    // Redirect back to detail page after updating
    cy.url().should('include', `/${username}/TensorModels`)
    cy.contains(updatedDescription);

    // Sign out
    cy.contains('Sign out').click()
  });
})
