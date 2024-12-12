import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
const LoginPage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setIsLoading(true);
    const res = await loginAPI(values.email, values.password);
    if (res.data) {
      message.success("Đăng nhập thành công");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Error Login",
        description: JSON.stringify(res.message),
      });
    }
    setIsLoading(false);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "100px" }}>
      <Col xs={24} md={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng nhập</legend>
          <Form name="basic" form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              sm={24}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
              ]}
            >
              <Input.Password
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    form.submit();
                  }
                }}
              />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item>
                <Button
                  loading={isLoading}
                  type="primary"
                  onClick={() => form.submit()}
                >
                  Login
                </Button>
              </Form.Item>
              <div style={{ marginTop: "4px" }}>
                <Link to="/">
                  Go to homepage <ArrowRightOutlined />
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Divider />
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p>
                  Chưa có tài khoản tại đây?
                  <Link to="/register"> Đăng ký ngay</Link>
                </p>
              </div>
            </div>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
