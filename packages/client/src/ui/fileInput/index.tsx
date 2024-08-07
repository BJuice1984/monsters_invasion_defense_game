import { useId, useRef, useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

import ZombieError from "../zombieError";
import style from "./style.module.scss";

type TProps = {
  name: string;
  isInvalid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ name, isInvalid, onChange }: TProps) => {
  const id = useId();
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const { t } = useTranslation();

  const [isSelected, setIsSelected] = useState(false);
  const [labelText, setLabelText] = useState(t(TRANSLATIONS.CHOOSE_FILE));

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setIsSelected(false);
      return;
    }

    setIsSelected(true);
    setLabelText(event.target.files![0].name);
    onChange(event);
  };

  return (
    <div className={cn(style.wrapper, { [style.uploaded]: isSelected })}>
      <label
        className={style.label}
        htmlFor={`input-${id}`}
        onClick={inputRef.current?.click}
      >
        {labelText}
      </label>

      <input
        ref={inputRef}
        className={style.input}
        id={`input-${id}`}
        name={name}
        type="file"
        accept=".jpeg, .jpg, .png, .gif, .webp"
        onChange={changeHandler}
      ></input>

      {isInvalid && <ZombieError />}
    </div>
  );
};

export default FileInput;
