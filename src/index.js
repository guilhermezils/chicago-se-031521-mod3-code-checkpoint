const url = 'http://localhost:3000/images'
let likes = document.querySelector('span.likes')

//1st - Display the data for the first image

fetch(`${url}/1`)
    .then(response => response.json())
    .then(data => {
        //title
        const detailH2 = document.querySelector('h2.title')
        detailH2.textContent = data.title
        //image
        const img = document.querySelector('img.image')
        img.src = data.image
        img.alt = data.title
        likes.textContent = `${data.likes} Likes`
        //comments
        const commentsUl = document.querySelector('ul.comments')
        //iterate over array of comments
        data.comments.forEach(commentObj =>{
            const li = document.createElement('li')
            li.textContent = commentObj.content
            commentsUl.append(li)
        })

    })

    //2nd - Patch for LIKES

    const newLikes = document.querySelector('button.like-button')
    newLikes.addEventListener('click', event => {
        // console.log("clicked")
        event.preventDefault()
        //user input
        const likeInput = parseInt(likes.textContent) + 1
        //update the form + keep it in the server
        fetch(`${url}/1`,{
            method: 'PATCH',
            headers: { 
                'Content-type':'application/json'
            },
            body: JSON.stringify({likes: likeInput})
        })
        .then(res => res.json())
        .then(newLikes => {
            likes.textContent = `${newLikes.likes} likes`
        })
    })

    //3rd - New Comments

    const newComment = document.querySelector('form.comment-form')
    newComment.addEventListener('submit', event => {
        event.preventDefault()
        //user input
        const commentInput = event.target.comment.value
        
        
        const li = document.createElement('li')
        li.textContent = commentInput
        
        const commentsUl = document.querySelector('ul.comments')
        commentsUl.append(li)

        // clear the form
        event.target.comment.value = " "
    })


