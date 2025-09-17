import React, { useState } from "react";
import HeaderBar from "../components/Community/HeaderBar";
import SearchBar from "../components/Community/SearchBar";
import TagFilterBar from "../components/Community/TagFilterBar";
import SearchInfoBox from "../components/Community/SearchInfoBox";
import PostCard from "../components/Community/PostCard";
import PostFormModal from "../components/Community/PostFormModal";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]); // بيانات البوستات
  const [newComment, setNewComment] = useState({});
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    images: [],
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const popularTags = [
    "upcycling",
    "garden",
    "fabric",
    "wood",
    "glass",
    "sustainable",
  ];

  // التفاعل مع البوست
  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setNewComment({ ...newComment, [postId]: value });
  };

  const addComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: "You",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
      text: commentText,
      timeAgo: "now",
      likes: 0,
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newCommentObj],
              showComments: true,
            }
          : post
      )
    );

    setNewComment({ ...newComment, [postId]: "" });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPost((prev) => ({
          ...prev,
          images: [...prev.images, e.target.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setNewPost((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !newPost.tags.includes(newTag.trim())) {
      setNewPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSharePost = () => {
    if (
      !newPost.title.trim() ||
      !newPost.description.trim() ||
      newPost.images.length === 0
    ) {
      alert(
        "Please fill in all required fields and upload at least one image."
      );
      return;
    }

    const postToAdd = {
      id: Date.now(),
      author: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        username: "@you",
      },
      timeAgo: "now",
      title: newPost.title,
      description: newPost.description,
      images: newPost.images,
      tags: newPost.tags,
      likes: 0,
      isLiked: false,
      comments: [],
      showComments: false,
    };

    setPosts((prev) => [postToAdd, ...prev]);
    setNewPost({ title: "", description: "", images: [], tags: [] });
    setNewTag("");
    setShowShareModal(false);
  };

  const filteredPosts =
    filter === "all"
      ? posts.filter(
          (post) =>
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : posts.filter(
          (post) =>
            post.tags.includes(filter) &&
            (searchQuery === "" ||
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              post.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              ) ||
              post.author.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );

  return (
    <div className="min-h-screen ">
      <HeaderBar setShowShareModal={setShowShareModal} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <TagFilterBar
          filter={filter}
          setFilter={setFilter}
          popularTags={popularTags}
        />
        {searchQuery && (
          <SearchInfoBox
            searchQuery={searchQuery}
            resultCount={filteredPosts.length}
            setSearchQuery={setSearchQuery}
          />
        )}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              toggleLike={toggleLike}
              toggleComments={toggleComments}
              addComment={addComment}
              handleCommentChange={handleCommentChange}
              newComment={newComment}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg border border-gray-200 transition-colors">
            Load More Projects
          </button>
        </div>
      </div>
      {showShareModal && (
        <PostFormModal
          newPost={newPost}
          setNewPost={setNewPost}
          newTag={newTag}
          setNewTag={setNewTag}
          addTag={addTag}
          removeTag={removeTag}
          popularTags={popularTags}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          handleSharePost={handleSharePost}
          setShowShareModal={setShowShareModal}
        />
      )}
    </div>
  );
};

export default CommunityPage;
