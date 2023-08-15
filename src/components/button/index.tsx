import React, { CSSProperties, PropsWithChildren } from "react";
import cx from "classnames";

import classes from "./button.module.css";
import { SoundFxId, soundUtils } from "../../utils/soundUtils";

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  frontStyle?: CSSProperties;
  customStyle?: CSSProperties;
  title: string;

  onClick?: () => void;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  disabled,
  frontStyle,
  customStyle,
  title,
  onClick,
}) => {
  const buttonStyle: CSSProperties = {
    backgroundColor: "transparent",
    pointerEvents: disabled ? "none" : "auto",
  };

  return (
    <button
      className={cx(classes["pushable"], className, {
        disabled,
      })}
      disabled={disabled}
      style={Object.assign(buttonStyle, customStyle || {})}
      tabIndex={-1}
      title={title}
      type="button"
      onClick={() => {
        if (disabled) {
          return;
        }

        onClick && onClick();
        soundUtils.play(SoundFxId.BUTTON);
      }}
    >
      <div className={classes["pushable-front"]} style={frontStyle}>
        {children}
      </div>
    </button>
  );
};
