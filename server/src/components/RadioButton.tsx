import React from 'react';

const styles = {
  radio: {
    WebkitAppearance: 'none' as const,
    MozAppearance: 'none' as const,
    appearance: 'none' as const,
    width: '18px',
    height: '18px',
    border: '2px solid #ccc',
    borderRadius: '50%',
    outline: 'none',
    cursor: 'pointer',
  },
  radioChecked: {
    backgroundColor: 'green',
    border: '3px solid white',
    boxShadow: '0 0 0 1.6px green',
  },
  radioHovered: {
    backgroundColor: 'green',
    border: '3px solid white',
    boxShadow: '0 0 0 1.6px green',
  },
  box: {
    display: 'flex' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
    width: '460px',
    height: '44px',
    position: 'absolute' as const,
    left: '0px',
    top: '10px',
    gap: '14px',
    padding: '10px 14px',
    borderRadius: '8px',
    backgroundColor: '#111',
    borderWidth: '1.5px',
    borderStyle: 'solid' as const,
    cursor: 'pointer',
  },
  boxChecked: {
    borderColor: 'green',
  },
  boxHovered: {
    borderColor: 'green',
  },
  boxDefault: {
    borderColor: '#e6fbed',
  },
  container: {
    width: '460px',
    height: '64px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
};

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  hovered?: boolean;
  onToggle?: () => void;
  onResetHover?: () => void;
  onMouseEnter?: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  hovered,
  onToggle,
  onResetHover,
  onMouseEnter,
  ...props
}) => {
  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.box,
          ...(checked ? styles.boxChecked : hovered ? styles.boxHovered : styles.boxDefault),
        }}
        onClick={onToggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onResetHover}
      >
        <input
          type="radio"
          style={checked ? { ...styles.radio, ...styles.radioChecked } : hovered ? { ...styles.radio, ...styles.radioHovered } : styles.radio}
          checked={checked}
          onChange={() => {}} // No need to handle onChange for input
          {...props}
        />
      </div>
    </div>
  );
};

export default RadioButton;