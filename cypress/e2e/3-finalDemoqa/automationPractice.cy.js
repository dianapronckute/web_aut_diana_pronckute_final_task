describe('Form input test', () => {
    it('fills out the form correctly', () => {
      // Navigate to the page containing the form
      cy.visit('https://demoqa.com/automation-practice-form');
  
      // Fill out the form inputs
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userEmail').type('johndoe@example.com');
      cy.contains('Male').click(); 
      cy.get('#userNumber').type('1234567890');

        // Click on the input field to open the date picker
        cy.get('#dateOfBirthInput').click();

        // Select March 1930
        cy.get('.react-datepicker__month-select').select('2'); // March is at index 2
        cy.get('.react-datepicker__year-select').select('1930');

        // Click on the 28th day
        cy.contains('.react-datepicker__day', '28').click();


              // Scroll into view if necessary
      cy.get('#subjectsInput').scrollIntoView();
              // Wait for the element to become visible and not covered
      cy.get('#subjectsInput').should('be.visible').click({ force: true });
      
      cy.get('.subjects-auto-complete__input').type('Economics')
      cy.contains('.subjects-auto-complete__option', 'Economics').click();
      
      cy.get('#hobbies-checkbox-3').check({force: true}); // Music

     
        const fileName = 'files/studentImage.jpg';

        // Load the file from the fixtures folder
        cy.fixture(fileName).then(fileContent => {
        // Find the file input element and attach the file
        cy.get('#uploadPicture').attachFile({
            fileContent,
            fileName,
            mimeType: 'image/jpeg' // Adjust the MIME type if necessary
        });
        });


      cy.get('#currentAddress').type('Terry street 1');
  
      // Select State and City
     // Click on the "Select State" dropdown to open it
      cy.get('#state').click();
    // Locate and click on the "NCR" option from the dropdown list
      cy.contains('.css-1wa3eu0-placeholder', 'Select State').siblings('.css-1g6gooi').find('input').type('NCR{enter}');
     
      cy.get('#city').click();
      cy.get('.css-1wa3eu0-placeholder').siblings('.css-1g6gooi').find('input').type('Delhi{enter}');
  
      // Submit the form
      cy.get('#submit').click();
  
        // Validate each labeled row
    cy.get('.table tbody tr').each(($row) => {
        const label = $row.find('td').eq(0).text().trim();
        const value = $row.find('td').eq(1).text().trim();
  
        switch (label) {
          case 'Student Name':
            expect(value).to.eq('John Doe');
            break;
          case 'Student Email':
            expect(value).to.eq('johndoe@example.com');
            break;
          case 'Gender':
            expect(value).to.eq('Male');
            break;
          case 'Mobile':
            expect(value).to.eq('1234567890');
            break;
          case 'Date of Birth':
            expect(value).to.eq('28 February,1930');
            break;
          case 'Subjects':
            expect(value).to.eq('Economics');
            break;
          case 'Hobbies':
            expect(value).to.eq('Music');
            break;
          case 'Picture':
            expect(value).to.eq('files/studentImage.jpg');
            break;
          case 'Address':
            expect(value).to.eq('Terry street 1');
            break;
          case 'State and City':
            expect(value).to.eq('NCR Delhi');
            break;
          default:
            // Handle unexpected labels if needed
            break;
        }
      });


    });
  });
  