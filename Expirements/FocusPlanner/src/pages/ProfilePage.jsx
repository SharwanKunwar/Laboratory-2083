import React, { useState } from 'react';
import useAuthStore from '../data/authStore';
import { FiUser, FiLock, FiLogOut, FiDatabase, FiCheckCircle, FiAlertCircle, FiMail } from 'react-icons/fi';
import { Button, Input, Form, Spin, notification } from 'antd';

function ProfilePage() {
  const { token, user, login, register, logout, fetchWithAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [testData, setTestData] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    let result;
    
    if (isLogin) {
      result = await login(values.username, values.password);
    } else {
      result = await register(values.username, values.email, values.password);
    }
    
    setLoading(false);
    
    if (result.success) {
      notification.success({
        message: isLogin ? 'Login Successful' : 'Registration Successful',
        description: isLogin ? 'Welcome back to Focus Planner!' : 'Your account has been created successfully.',
      });
      if (!isLogin && !token) {
        setIsLogin(true); // switch to login if backend didn't auto-login
      }
    } else {
      notification.error({
        message: isLogin ? 'Login Failed' : 'Registration Failed',
        description: result.error || 'Please check your details and ensure the backend is running.',
      });
    }
  };

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      // Assuming a generic endpoint like /api/tasks or /api/users/me
      // You can change this to match your actual Spring Boot controller endpoint
      const response = await fetchWithAuth('/api/tasks'); 
      const data = await response.json();
      setTestData(data);
      notification.success({ message: 'Data fetched successfully!' });
    } catch (error) {
      notification.error({ message: 'Fetch failed', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full h-full flex justify-center items-center p-6">
        <div className="bg-white/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-10 w-full max-w-md border border-white/60">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center shadow-inner mb-4">
              <FiUser className="text-3xl text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-slate-500 mt-2 text-center text-sm">
              {isLogin ? 'Sign in to sync your tasks' : 'Register a new account'} with the FocusPlanner backend.
            </p>
          </div>

          <Form name="authForm" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<FiUser className="text-slate-400 mr-2" />} 
                placeholder="Username" 
                size="large"
                className="rounded-xl bg-white/50 border-white/60 shadow-sm backdrop-blur-md hover:bg-white/70 focus:bg-white/80"
              />
            </Form.Item>

            {!isLogin && (
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Enter a valid email!' }]}
              >
                <Input 
                  prefix={<FiMail className="text-slate-400 mr-2" />} 
                  placeholder="Email Address" 
                  size="large"
                  className="rounded-xl bg-white/50 border-white/60 shadow-sm backdrop-blur-md hover:bg-white/70 focus:bg-white/80"
                />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<FiLock className="text-slate-400 mr-2" />}
                placeholder="Password" 
                size="large"
                className="rounded-xl bg-white/50 border-white/60 shadow-sm backdrop-blur-md hover:bg-white/70 focus:bg-white/80"
              />
            </Form.Item>

            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              className="w-full mt-4 rounded-xl bg-slate-700 hover:bg-slate-800 shadow-lg border-none h-12 text-md font-medium"
              loading={loading}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            
            <div className="mt-6 text-center text-slate-500 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-indigo-500 font-semibold hover:underline"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 md:p-10 overflow-y-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Profile & Sync</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* User Details Card */}
        <div className="bg-white/50 backdrop-blur-2xl shadow-xl rounded-[2rem] border border-white/60 p-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-white/80 rounded-full shadow-inner flex items-center justify-center mb-4">
            <FiUser className="text-4xl text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{user?.username || 'Authenticated User'}</h2>
          
          <div className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
            <FiCheckCircle /> Connected to localhost:8080
          </div>

          <Button 
            onClick={logout} 
            className="mt-8 rounded-xl bg-white/60 border border-white/80 text-red-500 shadow-sm hover:text-red-600 hover:bg-white/80 flex items-center gap-2"
            size="large"
          >
            <FiLogOut /> Sign Out
          </Button>
        </div>

        {/* Backend Controller Action Card */}
        <div className="bg-white/50 backdrop-blur-2xl shadow-xl rounded-[2rem] border border-white/60 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <FiDatabase className="text-indigo-500" /> Backend Testing
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Use this section to test data fetching from your Spring Boot controllers. Ensure your backend has the proper CORS configuration and endpoints set up.
            </p>

            <Button 
              onClick={testBackendConnection} 
              loading={loading}
              className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-md border-none flex items-center gap-2"
              size="large"
            >
              Fetch Data from /api/tasks
            </Button>
          </div>

          {testData && (
            <div className="mt-6 bg-slate-800 rounded-xl p-4 overflow-auto max-h-48 text-green-400 text-xs font-mono shadow-inner">
              <pre>{JSON.stringify(testData, null, 2)}</pre>
            </div>
          )}
          {!testData && !loading && (
             <div className="mt-6 bg-white/40 rounded-xl p-4 flex items-center gap-3 text-slate-500 text-sm italic border border-white/60">
               <FiAlertCircle /> No data fetched yet. Click the button above to test your controller.
             </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
