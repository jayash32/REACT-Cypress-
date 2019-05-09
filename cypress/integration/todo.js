import task from "../fixtures/tasks"
import tasks from "../fixtures/tasks";

it("No to-do(s)", function() {
	cy.visit("/");
	cy.get('.todo-list li').should('not.exist')
	cy.get('.main').should('not.exist')
  cy.get('.footer').should('not.exist')
})

it("Add items in To-do list", function() {
	cy.visit("/");
	
	cy.get('input').should('have.class','new-todo')
	cy.get('input').should('be.visible')

 tasks.map(task =>{
	cy.get('input[class="new-todo"]').type(task)
	.type('{enter}')
 })

	// Add items in to-do list
//	cy.get('input').type('Do yoga')
//	.type('{enter}')
	
//	cy.get('input[class="new-todo"]').type('Read Book')
//	.type('{enter}')
	
//	cy.get('input[class="new-todo"]').type('Book Ticket')
//	.type('{enter}')
	
})
    
 it("Mark an item complete", function() {
	// Check 'Complete' an item
	//cy.get('.todo-list > li').eq(2).should('contain', 'Book Ticket') // find item through index number
	cy.get('.todo-list').find('li').should('contain', 'Book Ticket') // find item through text
	// cy.get('[class="toggle"][type="checkbox"]').check() --- checks all the checkboxes in the list
	cy.get('[class="toggle"][type="checkbox"]').eq(2).check()

	// Unchecking an item in list
	//cy.get('.todo-list > li').eq(2).should('contain', 'Book Ticket')
	//cy.get('[class="toggle"][type="checkbox"]').eq(2).uncheck()

})
	
it("Check count in each tab", function() {

	// Check items in Completed 
	cy.get('.todo-list li')
	  .filter('.completed')
	  .should('have.length', 1)
	  .and('contain', 'Book Ticket')
	  .find('.toggle')
	  .should('be.checked')

	
	// Check items in Active
	cy.get("a[href= \'#/active']").click()
	cy.get('.todo-list').find('li').should('have.length', 2)

	// Check items in All
	cy.get("a[href= \'#/']").click()
	cy.get('.todo-list').find('li').should('have.length', 3)

})

it("Edit a task", function() {
	
	cy.get('.todo-list > li').eq(1)
	.find('label').dblclick({force: true})
	
	cy.get('.todo-list > li').eq(1).find('.edit').clear()
	.type('Charge laptop').type('{enter}')
	
	//find value
})

it("Delete a task", function() {
	
	cy.get('.todo-list > li').eq(0).should('contain', 'Do yoga')
	cy.get('button[class="destroy"]').eq(0).click({force: true})

})

it("Clear completed task", function() {
	
	cy.get('button[class="clear-completed"]').click()

	cy.get('.todo-list li')
	.find('.toggle')
	.should('not.be.checked')

	
})