import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

export const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.custom);
  const filterPost = data.posts.find((item) => item.postId === postId);
  console.log(filterPost);
  const {
    username,
    name,
    comments,
    post,
    picUrl,
    postDescription,
    upvotes,
    downvotes,
    createdAt,
    isBookmarked,
    tags,
  } = filterPost;
  return (
    <div className="bg-[#e5e7eb] h-screen m-0">
      <div className="flex bg-white m-4">
        <div className="">
          <div onClick={() => dispatch({ type: "upvote", payload: postId })}>
            <i class="bi bi-caret-up-fill"></i>
          </div>
          {upvotes - downvotes}
          <div onClick={() => dispatch({ type: "downvote", payload: postId })}>
            <i class="bi bi-caret-down-fill"></i>
          </div>
        </div>
        <div className="">
          <div className="flex">
            <img src={picUrl} className="w-10 h-10" />
            <p> posted by @{username}</p>
            <p>{Date(createdAt)}</p>
          </div>
          <div>
            <h2 className="font-bold">{post}</h2>
            <div className="flex">
              {tags.map((item) => (
                <p className="p-2">{item}</p>
              ))}
            </div>
            <p>{postDescription}</p>
            <hr className="h-px my-8 border-0" />
          </div>
          <div className="flex flex-grow w-full">
            <div>
              <i class="bi bi-chat-left"></i>
            </div>
            <div
              onClick={() => dispatch({ type: "bookmark", payload: postId })}
            >
              {isBookmarked ? (
                <i class="bi bi-bookmark-fill"></i>
              ) : (
                <i class="bi bi-bookmark"></i>
              )}
            </div>
            <div>
              <i class="bi bi-share"></i>
            </div>
          </div>
          <div className="comments">
            {comments.map(
              ({ commentId, username, picUrl, likes, comment, createdAt }) => (
                <div className="each-comment flex" key={commentId}>
                  <div>
                    <img src={picUrl} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3>
                      @{username} {Date(createdAt)}
                    </h3>
                    <p>{comment}</p>
                  </div>
                  <hr />
                  <div>
                    <i class="bi bi-heart">{likes}</i>
                    <i class="bi bi-bookmark"></i>
                    <i class="bi bi-share"></i>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
