describe('Navigation', () => {
  it('should navigate to the Index page', () => {
    // Start from the index page
    cy.visit('/')

    // The new page should contain an h1 with "Index Page"
    cy.get('h1').contains('Index Page')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
