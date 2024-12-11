import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    console.log("value", value);

    const res = await registerUserAPI(
      value.fullName,
      value.email,
      value.password,
      value.phone
    );
    if (res.data) {
      notification.success({
        message: "Register user",
        description: "Đăng ký user thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user error",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      style={{ margin: "auto", marginTop: "30px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title level={2}>Đăng ký</Title>
      </div>
      <div>
        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/\d+/g),
                  message: "Wrong format!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <div>
              <Button onClick={() => form.submit()} type="primary">
                Register
              </Button>
            </div>
          </Col>
        </Row>

        <Row justify={"center"}>
          <Col xs={24} md={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <Divider />
              <div style={{ marginTop: "20px" }}>
                <p>
                  Đã có tài khoản?
                  <Link to="/login"> Đăng nhập tại đây</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default RegisterPage;
