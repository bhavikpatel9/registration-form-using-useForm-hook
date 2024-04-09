import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful,isSubmitted },
  } = useForm();


    const delay = async (d)=>{
      return new Promise  ((resolve,reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }
  

  const onSubmit = async (data) => {
    await delay(4)
    console.log(data);

    if(data.username === 'shubham'){
      setError("blocked",{message : "your form is not submitted because you are blocked"})
    }

    try {
      let response = await fetch(
        "http://localhost:5000/api/user/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // if(response.ok){
       
      // }
    } catch (error) {
      console.log("register front-end", error);
    }
  };

  return (
    <>
      <div className="container">
        
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("username", {
              required: { value: true, message: "This field is required" },
            })}
            placeholder="username"
          />
          <br />
          {errors.username && (
            <span className="red">{errors.email.message}</span>
          )}
          <br />

          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "This field is required" },
            })}
            placeholder="email"
          />
          <br />
          {errors.email && <span className="red">{errors.email.message}</span>}
          <br />

          <input
            type="number"
            {...register("number", {
              required: { value: true, message: "This field is required" },
            })}
            placeholder="number"
          />
          <br />
          {errors.number && (
            <span className="red">{errors.number.message}</span>
          )}
          <br />

          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "This field is required" },
              minLength : { value: 8, message: "Min length should be 8"}
            })}
            placeholder="password"
          />
          <br />
          {errors.password && (
            <span className="red">{errors.password.message}</span>
          )}
          <br />
          <br />
          <input disabled={isSubmitting} type="submit" value="Submit" />

        {errors.blocked && <p>{errors.blocked.message}</p> }
        {isSubmitting && <p>Form is submitting</p>}
        {/* {isSubmitSuccessful && alert('Form submitted successfully')} */}
        {isSubmitSuccessful && <p>Form submitted successfully</p>}
        {/* {isSubmitted && <p>Form submitted successfully</p>} */}
        </form>

      </div>
    </>
  );
}

export default App;
