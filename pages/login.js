import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { submitLogin } from '../context/features/auth/loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.login.success);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitLogin(username, password));
  };

  useEffect(() => {                                
    if (isAuthenticated) {
      if (router.query && router.query.from) {
        router.push(router.query.from);
      } else {
        router.push("/panel/menu/");
      }
    }
  }, [isAuthenticated, router]);

  return (
    <div style={styles.container}>
      <div style={styles.login}>
        <h1 style={styles.title}>Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={handleUsernameChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Şifre"
              value={password}
              onChange={handlePasswordChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F4F7FA',
    padding: '20px',
  },
  login: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '20px',
    textAlign: 'center',
    padding: '50px',
    width: '100%',
    maxWidth: '400px',
    '@media (max-width: 600px)': {
      maxWidth: '100%',
      padding: '20px',
    },
  },
  title: {
    color: '#333333',
    fontSize: '24px',
    marginBottom: '30px',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '1px solid #E3E9EF',
    borderRadius: '10px',
    fontSize: '16px',
    '@media (max-width: 600px)': {
      fontSize: '14px',
    },
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    padding: '15px 30px',
    cursor: 'pointer',
    fontSize: '18px',
    width: '100%',
    '@media (max-width: 600px)': {
      fontSize: '16px',
    },
  },
};

export default Login;


