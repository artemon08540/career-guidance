import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess(true);
        onLoginSuccess(data.user.username || data.user.email);
      } else {
        setError(data.error?.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-form__title">Увійти як експерт</h2>
      <form onSubmit={handleLogin}>
        <div className="login-form__field">
          <input
            type="text"
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="login-form__field login-form__field--password">
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="login-form__toggle"
            onClick={() => setShowPwd(!showPwd)}
            aria-label={showPwd ? 'Сховати пароль' : 'Показати пароль'}
          >
            {showPwd ? '🙈' : '👁️'}
          </span>
        </div>
        <button type="submit" className="login-form__submit">
          Вхід
        </button>
      </form>
      {success && <div className="login-form__success">Вхід успішний!</div>}
      {error && <div className="login-form__error">{error}</div>}
    </div>
);
};

export default LoginForm;
