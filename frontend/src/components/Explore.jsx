import React, { useState, useEffect } from "react";
import { Camera, Send, ThumbsUp, MessageCircle, Heart, TrendingUp } from "lucide-react";
import { useAuthStore } from "../../firebase";
import { db, storage } from "../../firebase";
import { 
  collection, addDoc, updateDoc, arrayUnion, doc, getDoc, setDoc, onSnapshot, serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "./Header";
import Footer from "./Footer";



const Explore = () => {
  const { user , auth} = useAuthStore();
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [post, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({}); // Track which post has expanded comments
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [user1, setUser] = useState({
    name: "John Doe",
    image: "default-profile.png",
  });
  const trendingTopics = ["Technology", "Legal Rights", "Need help", "Guidance" , "Achievements"];
  const bookmarks = ["Technology", "Legal Rights", "Need help", "Guidance" , "Achievements"];
  // Hardcoded suggested connections and trending topics
  const suggestedConnections = [
    { id: 1, name: "Alice Johnson", image: "default-profile.png" },
    { id: 2, name: "Bob Smith", image: "default-profile.png" },
    { id: 3, name: "Charlie Brown", image: "default-profile.png" },
  ];
  // Fetch posts from Firestore (Global Collection)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "post"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Handle Image Selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle Post Submission
  const handlePostSubmit = async () => {
    if (!postText.trim() && !image) return;

    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `post/${user.uid}/${Date.now()}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const postData = {
      text: postText,
      image: imageUrl,
      likes: 0,
      comments: [],
      time: serverTimestamp(),
      user: {
        name: user.name,
        uid: user.uid,
        profilePic: user.image || "default-profile.png",
      },
    };

    // Add to Global "posts" Collection
    const postRef = await addDoc(collection(db, "post"), postData);

    // Add to User's posts array
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      post: arrayUnion({ id: postRef.id, ...postData }),
    });

    setPostText("");
    setImage(null);
  };

  // Handle Like Button Click
  const handleLikePost = async (postId) => {
    // Ensure the user is logged in
    if (!user?.uid) {
      toast.error("User is not logged in");
      return; // Exit if no user is logged in
    }
  
    const postRef = doc(db, "post", postId);
    const postSnap = await getDoc(postRef);
  
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const userId = user.uid; // Get the user ID from useAuthStore
      let newLikes;
  
      // Ensure likes is an array
      let likesArray = Array.isArray(postData.likes) ? postData.likes : []; // Fallback to empty array if likes is not an array
  
      // Check if the user already liked the post
      if (likesArray.includes(userId)) {
        // If the user has already liked, remove their like (unlike)
        newLikes = likesArray.filter((uid) => uid !== userId);
      } else {
        // If the user has not liked, add their like
        newLikes = [...likesArray, userId];
      }
  
      // Update the post with new likes array
      await updateDoc(postRef, { likes: newLikes });
  
      // Update the user's posts
      const userRef = doc(db, "users", postData.user?.uid);
      if (userRef) {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userPosts = userSnap.data().post || [];
          const updatedPosts = userPosts.map((p) =>
            p.id === postId ? { ...p, likes: newLikes } : p
          );
          await updateDoc(userRef, { post: updatedPosts });
        }
      }
    }
  };
  
  
  
  
  

  // Handle Comment Submission
  const handleCommentSubmit = async (postId) => {
    if (!commentText[postId]?.trim()) return;

    const postRef = doc(db, "post", postId);
    await updateDoc(postRef, {
      comments: arrayUnion({ text: commentText[postId], user: user.name }),
    });

    setCommentText((prev) => ({ ...prev, [postId]: "" }));
  };
  const handleShowCommentsToggle = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>

  <Header />
  <div className="w-full h-screen flex bg-gray-100 shadow-lg">

    {/* Left Sidebar */}
    <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-4 mb-8">
        <img src={user.image || "default-profile.png"} alt="Profile" className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500">Software Engineer</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-normal flex items-center gap-1 text-md text-blue-700 bg-blue-500 bg-opacity-30 w-fit p-1 px-2 rounded-lg">Your Bookmarks <img src="bookmark.png" alt="" className="h-4 w-5"/></h3>
        <ul className="mt-4">
        {bookmarks.map((topic) => (
          <li key={topic} className="text-sm font-semibold text-black mb-2 mt-2 ml-2">
            {topic}
          </li>
        ))}
        </ul>
      </div>
    </div>

    {/* Main Feed */}
    <div className="flex-1 px-1 py-3 h-full overflow-hidden justify-center items-center">
      
      {/* Post Input */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 ml-2 w-full">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full border h-11 border-gray-300 rounded-l-lg px-4"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
          <label htmlFor="imageUpload" className="text-white font-thin bg-blue-400 hover:bg-blue-500 duration-300 p-2.5 cursor-pointer">
            <Camera />
          </label>
          <button onClick={handlePostSubmit} className="bg-gradient-to-r from-pink-600 to-red-500 hover:bg-gradient-to-l flex items-center text-white px-4 py-2.5 rounded-r-lg hover:bg-blue-600 ">
            Post <Send className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Display Posts */}
      <div className="overflow-y-auto space-y-4 max-h-[calc(100vh-140px)]">
        {post.map((post) => (
          <div key={post.id} className="bg-white shadow-lg ml-2 rounded-lg p-4 overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <img src={post.user.image} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold">{post.user.name}</h4>
              </div>
            </div>
            <p className="text-md mb-4">{post.text}</p>
            {post.image && <img src={post.image} alt="Post" className="w-full h-64 object-contain mx-auto rounded-lg mb-4" />}
            
            {/* Like & Comment Buttons */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button onClick={() => handleLikePost(post.id)} className="flex items-center gap-1">
                <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500'}`} />
                <span>{post.likes?.length || 0} Like{post.likes?.length > 1 ? 's' : ''}</span>
              </button>
              <button onClick={() => setCommentText((prev) => ({ ...prev, [post.id]: "" }))} className="flex items-center gap-1">
                <MessageCircle className="h-5 w-5" /> 
                <span>{post.comments?.length || 0} Comment{post.comments?.length > 1 ? 's' : ''}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="overflow-y-auto max-h-[200px] mt-2">
              {post.comments?.length > 0 ? (
                post.comments.slice(0, showComments[post.id] ? post.comments.length : 3).map((cmt, index) => (
                  <div key={index} className="text-sm text-gray-600 mt-2">
                    <strong>{cmt.user}:</strong> {cmt.text}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No comments yet</div>
              )}
            </div>

            {/* Show More Comments Button */}
            {post.comments?.length > 3 && (
              <button className="text-blue-500 text-sm mt-2" onClick={() => handleShowCommentsToggle(post.id)}>
                {showComments[post.id] ? "Show less comments" : "Show all comments"}
              </button>
            )}

            {/* Add Comment */}
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText[post.id] || ""}
                onChange={(e) => setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))}
                className="w-full text-sm border rounded-l-lg px-2 py-2"
              />
              <button onClick={() => handleCommentSubmit(post.id)} className="bg-blue-500 text-white px-3 rounded-r-lg hover:bg-blue-600 duration-300">
                <Send className="h-4 w-4"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Sidebar */}
    <div className="w-80 p-6 bg-white shadow-lg rounded-lg ml-2">
      <h3 className="font-normal text-md mb-6 p-1 px-2 rounded-lg text-blue-700 bg-blue-500 bg-opacity-30 w-fit">What's Trending ?</h3>
      <ul>
        {trendingTopics.map((topic) => (
          <li key={topic} className="text-sm font-semibold text-black mb-2">
            <TrendingUp className="h-5 w-5 inline-block mr-2" />
            #{topic}
          </li>
        ))}
      </ul>
      <h3 className="font-normal w-fit mb-5 text-md mt-10 p-1 px-2 rounded-lg text-blue-700 bg-blue-500 bg-opacity-30">Suggested Connections</h3>
        <ul >
          {suggestedConnections.map((connection) => (
            <li key={connection.id} className="flex items-center gap-2 my-2 ml-3">
              <p className="text-sm">{connection.name}</p>
            </li>
          ))}
        </ul>
      
    </div>
    

  </div>
  <Footer />
</>

  );
};

export default Explore;
