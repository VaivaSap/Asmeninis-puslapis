// A function to load all units
function loadAllUnits() {
  // Make a call to contentful API to get units
  fetch('https://cdn.contentful.com/spaces/xxndm0vovd5e/environments/master/entries', {
    headers: {
      'Authorization': 'Bearer E7vZtncrXcxAqLvuJddMzmep26retkONd_TV0tClj0k'
    }
  }).then(result => {
    // Data is received as HTML response and it need's to be converted to data using .json() method.
    result
      .json()
      .then(data => {
        /* data object contains all received information.
        *  The data object has the following structure: 
        *  {
        *			includes: Has data about attached content.
        *				Asset: It is an array of attached images. Image URL can be found by exploring the objects inside the array
        *			items: It is an array of individual posts (units). Each item has the following structure.
        *				fields: Object containing different fields created in contentful UI (like title, content and etc.)
        *				metadata: Object that contains a list of tags
        *				sys: Object containing additional data about the post (unit). Like id, creation date, type and etc.
        *			limit: A number of posts received in this response. Can be used for pagination.
        *			skip: A numbber of posts skipped before getting this list of posts. Can be used for pagination.
        *			total: A total numeber of posts available. Can be used for pagination.
        *			sys: Object containing information about received data (for now only data type).
        *	 }
        * You can always explore the structure of that data by uncommenting console.log below.
        */ 
        // console.log(data)

        // Element with id 'content' is selected form HTML. All the other elements will be inerted into it.
        const content = document.getElementById('content')

        // Take all items (units) and for each of them create elements and add them into the 'content' element
        data.items.forEach(item => {
          // For each unit create its container. It will be a <section> element and have a class 'unit'.
          const contentContainer = document.createElement('secion')
          contentContainer.classList.add('unit')

          // Create title element. It will be <h2> element and have a class 'unit-title'.
          const titleNode = document.createElement('h2')
          titleNode.classList.add('unit-title')
          // Set the content of the title element to the title of unit received form the API.
          titleNode.innerText = item.fields.title
          // Add title element into the container element.
          contentContainer.appendChild(titleNode)

          // Create contnet element. It will be a div with a class 'unit-content'.
          const contentNode = document.createElement('div')
          contentNode.classList.add('unit-content')

          // Content is recieved from an API as an Array of paragraps. We need to loop through it and add paragraphs one by one.
          item.fields.content.content.forEach(paragraph => {
            // Each paragraph is further separated into smaller pieces so we need to loop again
            paragraph.content.forEach(({ value }) => {
              // Each paragraph is added into <p> element. The content of the pragraph is set to the value from API and the paragraph is added to the content element.
              const paragraphNode = document.createElement('p')
              paragraphNode.innerText = value
              contentNode.appendChild(paragraphNode)
            })
          })

          // After putting all the paragraphs we put content element inside the content container
          contentContainer.appendChild(contentNode)

          // Finally we put content container into the main content element.
          content.appendChild(contentContainer)        
        })
      })
  }).catch(error => {
    console.error(error)
  })
}

// Event listener waits for the page to be loaded and then loads the posts (units)
document.addEventListener('DOMContentLoaded', loadAllUnits)
