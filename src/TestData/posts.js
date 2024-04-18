const postsData = [];
import image from "/src/assets/dog.svg"
function generateRandomPosts(){
  for (let i = 1; i <= 50; i++) {
  const postData = {
    postId: i,
    userData: {
      userId: `user_${i}`,
      username: `User ${i}`,
      email: `user${i}@example.com`
    },
    title: `Post Title ${i}`,
    description: `Description for Post ${i}`,
    image: image,
    document: `https://example.com/documents/document_${i}.pdf`,
    metaData: {
      likeCount: Math.floor(Math.random() * 100),
      commentCount: Math.floor(Math.random() * 50)
    }
  };
  
  postsData.push(postData);
}
}

export default generateRandomPosts;
