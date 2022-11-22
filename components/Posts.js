import React, { useEffect, useState } from "react";
import Post from "./Post";
// import { faker } from "@faker-js/faker";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

const Posts = () => {
  //   const [DummyData, setDummyData] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  //   console.log(posts);

  //   useEffect(() => {
  //     const DummyData = [...Array(5)].map((_, i) => ({
  //       userName: faker.internet.userName(),
  //       userImg: faker.image.avatar(),
  //       img: faker.image.avatar(),
  //       caption: "Sub and dest the like button",
  //       id: i,
  //     }));
  //     console.log(DummyData);
  //     setDummyData(DummyData);
  //   }, []);

  return (
    <div>
      {/* {DummyData.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))} */}
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};

export default Posts;
