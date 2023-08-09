import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.custom);
  const navigate = useNavigate();

  return (
    <div className="bg-[#e5e7eb] h-screen">
      <div className="bg-white text-blue-600 border-b-4 h-12">
        <h1 className="p-2">MyForum</h1>
      </div>
      <main className="flex">
        <nav className="flex-col w-1/4 justify-items-center items-center p-5 h-screen">
          <div>
            <i class="bi bi-house"></i> Home
          </div>
          <div>
            <i class="bi bi-compass"></i> Explore
          </div>
          <div>
            {" "}
            <i class="bi bi-bookmark"></i> Bookmark
          </div>
          <div>
            {" "}
            <i class="bi bi-person-circle"></i> Profile
          </div>
        </nav>
        <div className="w-2/4">
          <h3>Latest Post</h3>
          <div>
            {data.posts.map((item) => {
              const {
                postId,
                username,
                name,
                post,
                picUrl,
                postDescription,
                upvotes,
                downvotes,
                createdAt,
                isBookmarked,
                tags,
              } = item;
              return (
                <div className="flex bg-white m-4">
                  <div className="">
                    <div
                      onClick={() =>
                        dispatch({ type: "upvote", payload: postId })
                      }
                    >
                      <i class="bi bi-caret-up-fill"></i>
                    </div>
                    {upvotes - downvotes}
                    <div
                      onClick={() =>
                        dispatch({ type: "downvote", payload: postId })
                      }
                    >
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
                      <div onClick={() => navigate(`/posts/${postId}`)}>
                        <i class="bi bi-chat-left"></i>
                      </div>
                      <div
                        onClick={() =>
                          dispatch({ type: "bookmark", payload: postId })
                        }
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="aside w-1/4 ">
          <h2>Sort Posts</h2>
          <select
            name="sort"
            onChange={(e) => dispatch({ type: e.target.value })}
          >
            <option disabled selected>
              Select
            </option>
            <option value="latest">Latest Post</option>
            <option value="popular">Popular Post</option>
          </select>
        </div>
      </main>
    </div>
  );
};
