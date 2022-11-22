import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { async } from "@firebase/util";
import { addDoc, collection, onSnapshot, orderBy, serverTimestamp, query, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, userName, userImg, caption, img }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  const { data: session } = useSession();


  //Getting comments from database
  useEffect(() => 
  onSnapshot(
    query(
      collection(db, 'posts', id, 'comments'), orderBy('timestamp','desc')), 
    snapshot => setComments(snapshot.docs)), 
  [db, id])

  // Populating Likes from database
  useEffect(() => 
    onSnapshot(
      collection(db, 'posts', id, 'likes'), 
      snapshot => setLikes(snapshot.docs)), 
    [db, id])

  
  useEffect(() =>
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    ), 
    [likes]
  )


  //sending likes or unlike to firebase database
  const likePost = async () =>{
    if(hasLiked){
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    }else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
    
  }






  
  // sending comments to database
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border-4 rounded-sm shadow">
      {/* Header */}
      <div className="flex justify-start items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{userName}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Image */}
      <img src={img} alt="" className="object-cover w-full" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 py-4">
          <div className="flex space-x-4">
            {
              hasLiked ? 
              (  <HeartIcon onClick={likePost} className="btn text-red-500" />) : 
              ( <HeartIcon onClick={likePost} className="btn" />)
            }
           
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* captions */}
      <p className="p-5 truncate">
        {
          likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes </p>
          )
        }
        <span className="font-bold mr-1 ">{userName}</span>
        {caption}
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) =>(
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img className="h-7 rounded-full" src={comment.data().userImage} alt="" />
              <p>
                <span className="font-bold">{comment.data().username}</span>
                <span>{" "}</span> 
                <span>{comment.data().comment}</span>
              </p>
              <Moment fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* INput box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            className="border-none flex-1 focus:ring-0 outline-none "
            value={comment}
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
