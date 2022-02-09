import React from "react";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";

function Post() {
  const navigate = useNavigate();

  const onClick = () => {
    console.log("Hello");
    navigate("/about");
  };

  const status = 200;

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }
  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path="/show" element={<h1>Hello World</h1>} />
      </Routes>
    </div>
  );
}

export default Post;

//////////////////////////////////////////////////////// below is an example of using params and pulling them out of the URL //

// // From App.js // //
// <Route path="/post/:id/:name" element={<Post />} />

// // From Component // //

// import { useParams } from "react-router-dom";

// function Post() {
//   const params = useParams();

//   return (
//     <div>
//       <h1>Post {params.id}</h1>
//       <p>Name: {params.name}</p>
//     </div>
//   );
// }

// export default Post;

/////////////////////////////////////////////////////////////  Below is an example of how to setup a redirect

// import { Navigate } from "react-router-dom";

// function Post() {
//   const status = 200;

//   if (status === 404) {
//     return <Navigate to="/notfound" />;
//   }
//   return (
//     <div>
//       <h1>Post</h1>
//     </div>
//   );
// }

// export default Post;

////////////////////////////////////////////////////////////
// How to do a redirect after executing other lines and doing something else prior to redirect

// for simplicity's sake, we've done a console logged a string then redirected

// function Post() {
//   const navigate = useNavigate();

//   const onClick = () => {
//     console.log("Hello");
//     navigate("/about");
//   };

//   const status = 200;

//   if (status === 404) {
//     return <Navigate to="/notfound" />;
//   }
//   return (
//     <div>
//       <h1>Post</h1>
//       <button onClick={onClick}>Click</button>
//     </div>
//   );
// }

// export default Post;

///////////////////////////////////////////////////////////
// How to split a path between two components
// In the example App.js has a path of "/post/*" and the Post component has its own routing and path of "/show"

// import { Navigate, useNavigate, Routes, Route } from "react-router-dom";

// function Post() {
//   const navigate = useNavigate();

//   const onClick = () => {
//     console.log("Hello");
//     navigate("/about");
//   };

//   const status = 200;

//   if (status === 404) {
//     return <Navigate to="/notfound" />;
//   }
//   return (
//     <div>
//       <h1>Post</h1>
//       <button onClick={onClick}>Click</button>
//       <Routes>
//         <Route path="/show" element={<h1>Hello World</h1>} />
//       </Routes>
//     </div>
//   );
// }

// export default Post;
