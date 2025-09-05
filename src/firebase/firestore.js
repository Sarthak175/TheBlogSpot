import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Posts collection
const postsCollection = collection(db, 'posts');

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(postsCollection, {
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const postRef = doc(db, 'posts', String(postId));
    
    // Sanitize data to prevent indexOf errors
    const sanitizedData = {
      ...postData,
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(postRef, sanitizedData);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const deletePost = async (postId) => {
  try {
    if (!postId) {
      return { error: 'Post ID is required' };
    }
    
    const postRef = doc(db, 'posts', String(postId));
    await deleteDoc(postRef);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(query(postsCollection, orderBy('createdAt', 'desc')));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { posts, error: null };
  } catch (error) {
    return { posts: [], error: error.message };
  }
};

export const getUserPosts = async (userId) => {
  try {
    const q = query(postsCollection, where('authorId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { posts, error: null };
  } catch (error) {
    return { posts: [], error: error.message };
  }
};

export const getPostById = async (postId) => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { post: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      return { post: null, error: null };
    }
  } catch (error) {
    return { post: null, error: error.message };
  }
};

export const incrementViews = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const currentViews = postSnap.data().views || 0;
      await updateDoc(postRef, { views: currentViews + 1 });
      return { error: null };
    }
    return { error: 'Post not found' };
  } catch (error) {
    return { error: error.message };
  }
};

export const toggleLike = async (postId, userId) => {
  try {
    if (!userId) {
      return { error: 'User ID is required' };
    }
    
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const likedBy = Array.isArray(postData.likedBy) ? postData.likedBy : [];
      const userIdStr = String(userId);
      const hasLiked = likedBy.includes(userIdStr);
      
      const updatedLikedBy = hasLiked 
        ? likedBy.filter(id => id !== userIdStr)
        : [...likedBy, userIdStr];
      
      await updateDoc(postRef, {
        likedBy: updatedLikedBy,
        likes: updatedLikedBy.length
      });
      return { error: null };
    }
    return { error: 'Post not found' };
  } catch (error) {
    return { error: error.message };
  }
};

export const toggleBookmark = async (postId, userId) => {
  try {
    if (!userId) {
      return { error: 'User ID is required' };
    }
    
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const bookmarkedBy = Array.isArray(postData.bookmarkedBy) ? postData.bookmarkedBy : [];
      const userIdStr = String(userId);
      const isBookmarked = bookmarkedBy.includes(userIdStr);
      
      const updatedBookmarkedBy = isBookmarked 
        ? bookmarkedBy.filter(id => id !== userIdStr)
        : [...bookmarkedBy, userIdStr];
      
      await updateDoc(postRef, {
        bookmarkedBy: updatedBookmarkedBy
      });
      return { error: null };
    }
    return { error: 'Post not found' };
  } catch (error) {
    return { error: error.message };
  }
};