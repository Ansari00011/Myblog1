let isAuthenticated = false; // Simulating user authentication status
let userName = '';

const addBlogBtn = document.getElementById('addBlogBtn');
const modal = document.getElementById('blogModal');
const loginModal = document.getElementById('loginModal');
const closeModalBtn = document.querySelector('.close-btn');
const closeLoginModalBtn = document.querySelector('.login-modal .close-btn');
const blogForm = document.getElementById('blogForm');
const loginForm = document.getElementById('loginForm');
const blogPostsContainer = document.getElementById('blog-posts');
const authBtn = document.getElementById('authBtn');

// Initialize Quill.js rich text editor
var quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Write your blog content here...',
  modules: {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['image'],
    ]
  }
});

// Sample blog posts (pre-loaded content)
const exampleBlogs = [
  {
    title: "The Future of Technology",
    content: "In this post, we will explore the latest trends in technology, including AI, Machine Learning, and Quantum Computing...",
    category: "Tech"
  },
  {
    title: "How to Stay Fit While Traveling",
    content: "Traveling doesn't have to mean giving up your fitness routine. Here are some easy ways to stay active on the go...",
    category: "Lifestyle"
  },
  {
    title: "Top 10 Places to Visit in 2025",
    content: "If you're looking for the best travel destinations in 2025, look no further. These top 10 places offer breathtaking experiences...",
    category: "Travel"
  }
];

// Display example blog posts on page load
function displayExampleBlogs() {
  exampleBlogs.forEach(blog => {
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');
    blogPost.innerHTML = `
      <h3>${blog.title}</h3>
      <p><strong>Category:</strong> ${blog.category}</p>
      <p>${blog.content}</p>
      <button class="editBtn" disabled>Edit</button>
      <button class="deleteBtn" disabled>Delete</button>
    `;
    blogPostsContainer.appendChild(blogPost);
  });
}

// Call the function to display example blogs
displayExampleBlogs();

// Handle authentication
authBtn.addEventListener('click', () => {
  if (isAuthenticated) {
    isAuthenticated = false;
    authBtn.innerHTML = 'Login';
  } else {
    loginModal.style.display = 'flex';
  }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userName = document.getElementById('username').value;
  isAuthenticated = true;
  authBtn.innerHTML = `Hello, ${userName} (Logout)`;
  loginModal.style.display = 'none';
});

// Open the modal to create a new blog
addBlogBtn.addEventListener('click', () => {
  if (!isAuthenticated) {
    alert("You need to login first.");
    return;
  }
  modal.style.display = 'flex';
});

// Close the modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the login modal
closeLoginModalBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Handle form submission to add a new blog post
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('blogTitle').value;
  const content = quill.root.innerHTML; // Get content from the rich text editor
  const category = document.getElementById('categorySelect').value;

  const blogPost = document.createElement('div');
  blogPost.classList.add('blog-post');
  blogPost.innerHTML = `
    <h3>${title}</h3>
    <p><strong>Category:</strong> ${category}</p>
    <div>${content}</div>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
  `;

  // Attach event listeners for editing and deleting posts
  blogPost.querySelector('.editBtn').addEventListener('click', () => editPost(blogPost));
  blogPost.querySelector('.deleteBtn').addEventListener('click', () => deletePost(blogPost));

  blogPostsContainer.appendChild(blogPost);

  // Close the modal and reset form
  modal.style.display = 'none';
  blogForm.reset();
  quill.root.innerHTML = ''; // Reset the Quill editor content
});

// Edit a blog post
function editPost(post) {
  const title = post.querySelector('h3').innerText;
  const content = post.querySelector('div').innerHTML;
  document.getElementById('blogTitle').value = title;
  quill.root.innerHTML = content;

  post.remove(); // Remove the old post
  modal.style.display = 'flex'; // Open the modal to edit
}

// Delete a blog post
function deletePost(post) {
  post.remove();
}

