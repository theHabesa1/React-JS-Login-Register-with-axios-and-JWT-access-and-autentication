import Register from "./components/Register";
import Login from "./components/login";
import Editor from "./components/Editor";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
import Linkpage from "./components/Linkpage";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";

import {Routes, Route} from 'react-router-dom'
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  'User' : 2001,
  'Editor': 1984,
  'Admin': 2001
}
function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
              {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="linkpage" element={<Linkpage />} />
            <Route path="unauthorized" element={<Unauthorized />} />

           {/*These are the the protected Routes*/}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route path="admin" element={<Admin />} />s
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor,ROLES.Admin]}/>}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
           

           {/* catch all */}
           <Route path="*" element={<Missing />} />
        </Route>
    </Routes>
  );
}

export default App;
