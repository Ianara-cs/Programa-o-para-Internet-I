window.onload = () => {
    var newPost = document.getElementById('add-post');
    newPost.addEventListener('click', addPost);
    loadPosts()
}

const loadPosts = async () => {
    console.log("Ok!")
    const response = await fetch('http://localhost:3000/posts')
    const posts = await response.json()
    console.log(posts)
    
    posts.forEach(post => {
        appendPost(post)
    });
    
}

appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    document.getElementById('timeline').append(postElement);
}

const addPost = async () => {
    const newPost = {
        "text" : document.getElementById('post-text').value,
        "likes" : 0,
    }
    const config = {
        'method': 'POST',
        'headers': {    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    }
    const response = await fetch('http://localhost:3000/posts', config);

    const post = await response.json();

    appendPost(post)

}