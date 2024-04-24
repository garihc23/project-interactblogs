const { Post } = require('./models/index'); // Adjust the import path based on your file structure

// Create a new Post instance without specifying postId
const newPost = Post.build({
    title: 'Sample Title 4224',
    shortDescription: 'Sample Description2',
    content: 'Sample Content',
    category: 'Sample Category',
    date: '2024-01-09',
    time: '12:00 PM',
    author: 'Sample Author',
    authorId: "1223",
    // other attributes...
});

// Log the generated postId
console.log('Generated postId:', newPost.postId);

// Save the new post to the database
newPost.save()
    .then(() => {
        console.log('Post saved successfully.');
    })
    .catch((error) => {
        console.error('Error saving post:', error);
    });
