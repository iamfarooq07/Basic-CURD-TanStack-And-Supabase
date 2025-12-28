// import { createClient } from "@supabase/supabase-js";
// import { useEffect, useState } from "react";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
// );

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [text, setText] = useState("");
//   const [content, setContent] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getData = async () => {
//     setLoading(true);
//     const { data, error } = await supabase.from("post").select("*");
//     setLoading(false);
//     if (error) return console.error(error.message);
//     setPosts(data);
//   };

//   const addPost = async () => {
//     if (!text || !content) return;
//     setLoading(true);
//     const { error } = await supabase
//       .from("post")
//       .insert({ text, contect: content });
//     setLoading(false);
//     if (error) return console.error(error.message);
//     setText("");
//     setContent("");
//     getData();
//   };

//   const editPost = (post) => {
//     setText(post.text);
//     setContent(post.contect);
//     setEditingId(post.id);
//   };

//   const updatePost = async () => {
//     if (!text || !content || !editingId) return;
//     setLoading(true);
//     const { error } = await supabase
//       .from("post")
//       .update({ text, contect: content })
//       .eq("id", editingId);
//     setLoading(false);
//     if (error) return console.error(error.message);
//     setText("");
//     setContent("");
//     setEditingId(null);
//     getData();
//   };

//   const deleteData = async (id) => {
//     const { error } = await supabase.from("post").delete().eq("id", id);
//     if (error) return console.error(error.message);
//     getData();
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   if (loading) {
//     return <h1 className="text-center text-4xl font-extrabold">Loading...</h1>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
//       <input
//         className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <input
//         className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />

//       <button
//         className="w-full py-3 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
//         onClick={editingId ? updatePost : addPost}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : editingId ? "Update Post" : "Add Post"}
//       </button>

//       <div className="mt-6 space-y-4">
//         {posts.map((val) => (
//           <div
//             key={val.id}
//             className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50 flex justify-between items-center"
//           >
//             <div>
//               <h1 className="text-lg font-semibold mb-1">Text: {val.text}</h1>
//               <p className="text-gray-700">Content: {val.contect}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                 onClick={() => editPost(val)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 onClick={() => deleteData(val.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// ============== Tanstack ==================

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

function App() {
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("post").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  // Add post
  const addMutation = useMutation({
    mutationFn: async (newPost) => {
      const { error } = await supabase.from("post").insert(newPost);
      if (error) throw new Error(error.message);
      return newPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setText("");
      setContent("");
    },
  });

  // Update post
  const updateMutation = useMutation({
    mutationFn: async ({ id, text, contect }) => {
      const { error } = await supabase
        .from("post")
        .update({ text, contect })
        .eq("id", id);
      if (error) throw new Error(error.message);
      return { id, text, contect };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setText("");
      setContent("");
      setEditingId(null);
    },
  });

  // Delete post
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("post").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const handleSubmit = () => {
    if (!text || !content) return;
    if (editingId) {
      updateMutation.mutate({ id: editingId, text, contect: content });
    } else {
      addMutation.mutate({ text, contect: content });
    }
  };

  const handleEdit = (post) => {
    setText(post.text);
    setContent(post.contect);
    setEditingId(post.id);
  };

  if (isLoading)
    return <h1 className="text-center text-4xl font-extrabold">Loading...</h1>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="w-full py-3 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        onClick={handleSubmit}
        disabled={addMutation.isLoading || updateMutation.isLoading}
      >
        {addMutation.isLoading || updateMutation.isLoading
          ? "Processing..."
          : editingId
          ? "Update Post"
          : "Add Post"}
      </button>

      <div className="mt-6 space-y-4">
        {posts.map((val) => (
          <div
            key={val.id}
            className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50 flex justify-between items-center"
          >
            <div>
              <h1 className="text-lg font-semibold mb-1">Text: {val.text}</h1>
              <p className="text-gray-700">Content: {val.contect}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => handleEdit(val)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteMutation.mutate(val.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
