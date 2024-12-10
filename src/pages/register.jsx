import { Button, Checkbox, Form, Input, notification } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

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
    >
      <div
        style={{
          margin: "50px",
        }}
      >
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
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
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
        <div>
          <Button onClick={() => form.submit()} type="primary">
            Register
          </Button>

          <Button
            onClick={() => {
              form.setFieldsValue({
                email: "hoidanit@gmail.com",
                fullName: "eric",
              });
              console.log("check form " + form.getFieldsValue());
            }}
          >
            Test
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default RegisterPage;
