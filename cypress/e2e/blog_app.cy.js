describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'hasferrr',
      password: '12345678',
      name: 'Hasfer',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('hasferrr')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('Hasfer logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('hasferrr')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('hasferrr')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('How to Code')
      cy.get('#author').type('Famous Person')
      cy.get('#url').type('example.com')
      cy.get('#add-note-button').click()
      cy.get('.notification')
        .should('contain', 'a new Blog How to Code by Famous Person')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })
})
