
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";

function DinamicForm() {
  const { register, handleSubmit, watch, formState: { errors, isValid }, trigger, setError, clearErrors } = useForm({
    mode: "onSubmit", // Валидация будет срабатывать при отправке формы
  });

  // Функция обработки отправки формы
  function onSubmit(data) {
    console.log("Данные формы:", data);
  }

  const loginValue = watch("Login");

  useEffect(() => {
    const subscription = watch((data) => {
      // Если длина логина больше 20 символов, устанавливаем ошибку
      if (loginValue?.length > 20) {
        setError("Login", {
          type: "maxLength",
          message: "Длина логина не должна быть больше 20 символов",
        });
      } else if (loginValue?.length > 0 && loginValue?.length < 3) {
        setError("Login", {
          type: "minLength",
          message: "Логин не должен быть меньше 3 символов",
        });
      } else {
        clearErrors("Login");
      }
    });

    return () => subscription.unsubscribe();
  }, [loginValue, setError, clearErrors, watch]);

  return (
    <div className={styles.div_dinamic_form}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.dinamic_Form}>
        {/* Поле для логина */}
        <label htmlFor="Login" className={styles.lable_login} >
          <span >Login: </span>
          <input className={styles.input_login}
            {...register("Login", {
              required: {
                value: true,
                message: "Это поле обязательно для заполнения",
              },
              minLength: {
                value: 3,
                message: "Логин не должен быть меньше 3 символов",
              },
              maxLength: {
                value: 20,
                message: "Длина логина не должна быть больше 20 символов",
              },
            })}
            type="text"
            id="Login"
            onBlur={() => trigger("Login")} // Проверка валидации при потере фокуса
          />
        </label>

        {/* Сообщения об ошибках для поля "Login" */}
        {errors.Login && <p className={styles.error_message}>{errors.Login.message}</p>}

        {/* Поле для пароля отображается только после успешной валидации логина */}
        {loginValue?.length >= 3 && loginValue?.length <= 20 && !errors.Login && (
          <label htmlFor="Password" className={styles.label_pas}>
            <span>Password: </span>
            <input
              {...register("Password", {
                required: {
                  value: true,
                  message: "Это поле обязательно для заполнения",
                },
                minLength: {
                  value: 8,
                  message: "Пароль должен быть не менее 8 символов",
                },
              })}
              type="password"
              id="Password"
              className={styles.input_pas}
            />
          </label>
        )}

        {errors.Password && <p className={styles.error_message_pas}>{errors.Password.message}</p>}

        <button type="submit" className={styles.btn_dinamic_form}>Submit</button>
      </form>
    </div>
  );
}

export default DinamicForm;



// function DinamicForm() {
//  const [name, setName] = useState("");
//  const [email, setEmail] = useState("");

//  const[validationMessege, setValidationMessege] = useState('');
//  return (
//     <form>
//         <input
//         type="text"
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//         />
//         <input
//         type="text"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//         />

//     </form>
//  )

// }

// export default DinamicForm;