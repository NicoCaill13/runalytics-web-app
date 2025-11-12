"use client";


import * as React from "react";


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // event
  onValueChange?: (v: string) => void;
};


export default function PasswordInput({
  label = "Mot de passe",
  name, placeholder = "8 caractères minimum",
  onChange,
  onValueChange,
  ...rest
}: Props) {
  const [show, setShow] = React.useState(false);
  const type = show ? "text" : "password";

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);                 // propage l’event si fourni
    onValueChange?.(e.target.value); // propage la valeur si fourni
  };


  return (
    <label className="flex flex-col">
      <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal pb-2">
        {label}
      </p>
      <div className="flex w-full items-stretch rounded-lg">
        <input
          {...rest}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-accent/50 border border-border-light dark:border-border-dark bg-white  focus:border-accent h-14 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
        />

        <button
          type="button"
          aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          onClick={() => setShow((s) => !s)}
          className="text-text-secondary-light dark:text-text-secondary-dark flex border border-border-light dark:border-border-dark bg-white items-center justify-center pr-[15px] rounded-r-lg border-l-0"
        >
          {show ? (
            // œil barré
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
              <path d="M3.53 2.47 2.47 3.53 6.2 7.26C4.18 8.37 2.59 10.02 1.5 12c1.73 3.13 5.18 6 10.5 6 2.02 0 3.8-.42 5.34-1.15l3.63 3.63 1.06-1.06-18-18Zm7.2 8.26 2.48 2.48c-.33.5-.9.79-1.51.79a1.77 1.77 0 0 1-1.77-1.77c0-.61.3-1.18.8-1.5ZM12 6c5.32 0 8.77 2.87 10.5 6-.7 1.27-1.64 2.4-2.77 3.36l-1.45-1.45c.99-.72 1.85-1.62 2.57-2.64-1.45-2.13-4.34-4.27-8.85-4.27-1.04 0-2 .12-2.9.33L7.28 5.63C8.56 5.22 10.16 6 12 6Z" />
            </svg>
          ) : (
            // œil
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
              <path d="M12 4.5c-6.23 0-9.82 3.68-11.5 7.5 1.68 3.82 5.27 7.5 11.5 7.5s9.82-3.68 11.5-7.5c-1.68-3.82-5.27-7.5-11.5-7.5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
          )}
        </button>
      </div>
    </label>
  );
}