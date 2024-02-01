import React from 'react'
import {AuthProvider} from "./components/context/AuthContext";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import Signup from "./components/home/Signup";
import PrivateRoute from "./components/misc/PrivateRoute";
import UserPage from "./components/user/UserPage";
import AdminPage from "./components/admin/AdminPage";

const products = [
    {
        _id: "100001",
        img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Round Table Clock",
        price: "44.00",
        color: "Black",
    },
    {
        _id: "100002",
        img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Round Table Clock",
        price: "44.00",
        color: "Black",
    },
    {
        _id: "100003",
        img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Round Table Clock",
        price: "44.00",
        color: "Black",
    },
    {
        _id: "100004",
        img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Round Table Clock",
        price: "44.00",
        color: "Black",
    },
    {
        _id: "100005",
        img: "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Round Table Clock",
        price: "44.00",
        color: "Black",
    },
];


// function App() {
//     return (
//         <div className="container mx-auto my-96">
//             <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
//                 {products.map((product, index) => (
//                     <QuestionCard
//                         key={index}
//                         _id={product._id}
//                         img={product.img}
//                         productName={product.productName}
//                         price={product.price}
//                         color={product.color}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path="/adminpage" element={<PrivateRoute><AdminPage/></PrivateRoute>}/>
                    <Route path="/userpage" element={<PrivateRoute><UserPage/></PrivateRoute>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
