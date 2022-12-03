import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import ForgotPassword from './components/Auth/ForgotPassword';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Courses from './components/Courses/Courses';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import Request from './components/Request/Request';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/Layout/Notfound/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // })

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  // Toast, message, error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<Request />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                // if not authenticated then will redirect to login
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />

            {/* PAYMENT ROUTES */}
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe />
                </ProtectedRoute>
              }
            />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="*" element={<NotFound />} />

            {/* ADMIN ROUTES */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                  isAuthenticated={isAuthenticated}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createcourse"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                  isAuthenticated={isAuthenticated}
                >
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                  isAuthenticated={isAuthenticated}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                  isAuthenticated={isAuthenticated}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
