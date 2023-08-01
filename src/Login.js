import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [otp, setOTP] = useState("");

  const baseUrl = "http://localhost:8000";

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    generateOTP();
  }, []);

  const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    setOTP(OTP);
  };

  const checkMailer = () => {
    // let dataSend = {
    //   otp: otp,
    // }
    // const res = await fetch(`${baseUrl}/email/sendEmail`, {
    //   method: "POST",
    //   body: JSON.stringify(dataSend),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status > 199 && res.status < 300) {
    //       alert("Send Successfully !");
    //     }
    //   });
    //   console.log(res);

      try {
          return axios
            .post(`${baseUrl}/email/sendEmail`, otp)
            .then((res) => alert(res.data.message));
      } catch (error) {
        console.log(`Error while calling Register API`, error);
      }
  }

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      //   console.log("proceed");
      const formData = {
        userName: username,
        password: "123",
        remoteIp: "192.168.222.10",
        latitude: "69.20",
        longitude: "67.50",
      };
      console.log(otp);
      fetch("https://demo.isoping.com:7292/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp, "DATA");
          if (resp.username === username) {
            toast.error("Please enter Valid Email");
          } else {
            if (formData.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", username);
              usenavigate("/");
            } else {
              toast.error("Please enter Valid Credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to " + err.message);
        });
    }
  };

  // const ProceedLoginusingAPI = (e) => {
  //     e.preventDefault();
  //     if (validate()) {
  //         ///implentation
  //         // console.log('proceed');
  //         let inputobj={"username": username,
  //         "password": password};
  //         fetch("https://localhost:44308/User/Authenticate",{
  //             method:'POST',
  //             headers:{'content-type':'application/json'},
  //             body:JSON.stringify(inputobj)
  //         }).then((res) => {
  //             return res.json();
  //         }).then((resp) => {
  //             console.log(resp)
  //             if (Object.keys(resp).length === 0) {
  //                 toast.error('Login failed, invalid credentials');
  //             }else{
  //                  toast.success('Success');
  //                  sessionStorage.setItem('username',username);
  //                  sessionStorage.setItem('jwttoken',resp.jwtToken);
  //                usenavigate('/')
  //             }
  //             // if (Object.keys(resp).length === 0) {
  //             //     toast.error('Please Enter valid username');
  //             // } else {
  //             //     if (resp.password === password) {
  //             //         toast.success('Success');
  //             //         sessionStorage.setItem('username',username);
  //             //         usenavigate('/')
  //             //     }else{
  //             //         toast.error('Please Enter valid credentials');
  //             //     }
  //             // }
  //         }).catch((err) => {
  //             toast.error('Login Failed due to :' + err.message);
  //         });
  //     }
  // }
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>{" "}
              |
              <button onClick={checkMailer}>Send Mail</button>
              <Link className="btn btn-success" to={"/register"}>
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
