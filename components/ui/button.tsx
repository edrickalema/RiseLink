import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  children,
  onPress,
  disabled,
  style,
  textStyle,
}) => {
  const variantStyle = stylesByVariant[variant];
  const sizeStyle = stylesBySize[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variantStyle.button,
        sizeStyle,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variantStyle.text,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
    padding: 16,
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#999",
  },
});

const stylesByVariant: Record<Variant, { button: ViewStyle; text: TextStyle }> =
  {
    default: {
      button: {
        backgroundColor: "#007bff",
      },
      text: {
        color: "#ffffff",
      },
    },
    destructive: {
      button: {
        backgroundColor: "#dc3545",
      },
      text: {
        color: "#ffffff",
      },
    },
    outline: {
      button: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ccc",
      },
      text: {
        color: "#000000",
      },
    },
    secondary: {
      button: {
        backgroundColor: "#6c757d",
      },
      text: {
        color: "#ffffff",
      },
    },
    ghost: {
      button: {
        backgroundColor: "transparent",
      },
      text: {
        color: "#000000",
      },
    },
    link: {
      button: {
        backgroundColor: "transparent",
      },
      text: {
        color: "#007bff",
        textDecorationLine: "underline",
      },
    },
  };

const stylesBySize: Record<Size, ViewStyle> = {
  default: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 36,
    borderRadius: 4,
  },
  lg: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    height: 48,
    borderRadius: 6,
  },
  icon: {
    width: 40,
    height: 40,
    padding: 0,
  },
};

export default Button;
