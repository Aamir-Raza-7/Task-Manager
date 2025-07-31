// Input.jsx
import React, { useState } from 'react';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = true,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasText = value && value.trim() !== '';

  return (
    <div className={`form-control ${isFocused || hasText ? 'filled' : ''}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={!onChange}
        required={required}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label>
        {label.split('').map((char, idx) => (
          <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
            {char}
          </span>
        ))}
      </label>
      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default Input;
