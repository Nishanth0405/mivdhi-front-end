import { Alert, Button, Col, Form, Input, Row } from "antd"
import { Link, useNavigate } from "react-router"
import Mivdhi from "../../public/Mivdhi-home-page.png"
import { useState } from "react"
import { loginApi } from "../api/api"
import { TUserInfo } from "../common/insurance.type"

const LoginForm = () => {

  const [form] = Form.useForm()

  const [userInfo, setUserInfo] = useState<TUserInfo>()

  const [isError, setIsError] = useState<boolean>(false)

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }



  const emailValidator = (_: unknown, value: string | undefined) => {
    if (!value) return Promise.reject("Please enter email ID")
    if (!isValidEmail(value)) return Promise.reject("Please enter a valid email ID")
    return Promise.resolve()
  }

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    // const { email, password } = formValues;

    const userData: TUserInfo = {
      userName: formValues.email,
      password: formValues.password,
    };

    setUserInfo(userData)

    console.log(userData);
    try {
      const userLogin = await loginApi(userData);
      console.log("On submit ", userLogin?.data);

      if (userLogin?.data?.message == "Invalid credentials") {
        await setIsError(true);
      } else {
        setIsError(false);
        await navigate("/list");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setIsError(true);
    }
  };



  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row >
        <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "45vh", marginBottom: "10%" }} >

          <div style={{ height: "106%", width: "100%" }}>

            <img
              src={Mivdhi}
              style={{
                width: "100%",
                height: "200%",
                objectFit: "cover",
                marginTop: "25px",
                display: "block"
              }}
              alt="book-keep-img" id="book-keep" />
          </div>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", marginTop: "10%" }} >
          <div style={{ width: "70%" }}>
            <h3 className="text-slate-800">
              THE SMARTEST INSURANCE PLATFORM
            </h3>
            <div >
              <h2 className="text-slate-700 login-title text-center mt-4 font-medium ">
                Sign In to Mivdhi
              </h2>
              <Form.Item
                validateTrigger={["onSubmit"]}
                rules={[{ required: true, type: "email", validator: emailValidator }]}
                name="email"
              >
                <Input
                  autoFocus
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}

                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please enter your password" }]}
                name="password"
              >
                <Input.Password
                  autoFocus
                  placeholder="Password"
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Form.Item>
              <Button
                id="login-sign-in"
                htmlType="submit"
                type="primary"
                block
                className="mt-3"
              >
                Sign In
              </Button>
              <div style={{ marginTop:"5%"}} >
                {isError && (
                  <div id="alert-message" className="mb-3 mt-2">
                    <Alert message={"Invalid Credentials"} type="error" showIcon />
                  </div>
                )}
              </div>
            </div>
          </div>

        </Col>
      </Row>
    </Form>
  );

}

export default LoginForm;