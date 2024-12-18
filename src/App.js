import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login'; // Assuming Login is in the same folder
import Dashboard from './view/Dashboard'; // Assuming Dashboard is in the same folder
import ProtectedRoute from './ProtectedRoute';
import Register from './Auth/Register';
import AddBooks from './view/AddBooks';
import UpdatedBooks from './view/UpdatedBooks';
import About from './view/About';
import Asn from './view/Asn';
import Kendaraan from './view/Kendaraan';
import Instansi from './view/Instansi';
import AddAsns from './view/AddAsns';
import UpdatedAsns from './view/UpdateAsns';
import AddKendaraans from './view/AddKendaraans';
import UpdatedKendaraans from './view/updatekendaraans';
import AddInstansis from './view/AddInstansis';
import UpdatedInstansis from './view/UpdatedInstansis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route path="/asn"
          element={
            <ProtectedRoute>
              <Asn />
            </ProtectedRoute>
          } />

        <Route path="/kendaraan"
          element={
            <ProtectedRoute>
              <Kendaraan />
            </ProtectedRoute>
          } />

          <Route path="/instansi"
          element={
            <ProtectedRoute>
              <Instansi />
            </ProtectedRoute>
          } />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
        <Route path="/addbook" element={
          <ProtectedRoute>
            <AddBooks />
          </ProtectedRoute>
        } />

        <Route path="/addasn" element={
          <ProtectedRoute>
            <AddAsns />
          </ProtectedRoute>
        } />

        <Route path="/addkendaraan" element={
          <ProtectedRoute>
            <AddKendaraans />
          </ProtectedRoute>
        } />

        <Route path="/addinstansi" element={
          <ProtectedRoute>
            <AddInstansis />
          </ProtectedRoute>
        } />

        <Route path="/updatebooks/:id" element={
          <ProtectedRoute>
            <UpdatedBooks />
          </ProtectedRoute>
        } />

        <Route path="/updateasns/:id" element={
          <ProtectedRoute>
            <UpdatedAsns />
          </ProtectedRoute>
        } />

        <Route path="/updatekendaraans/:id" element={
          <ProtectedRoute>
            <UpdatedKendaraans />
          </ProtectedRoute>
        } /> 

      <Route path="/updateinstansi/:id" element={
          <ProtectedRoute>
            <UpdatedInstansis />
          </ProtectedRoute>
        } />

        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
