import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  phone: string;
  birthDate: string;
}

export default function AddOrEditUser() {
  const { id } = useParams(); // if there's an ID, we're in "edit" mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  // Fetch user details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`https://dummyjson.com/users/${id}`)
        .then((res) => {
          const user = res.data;
          reset({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age.toString(),
            phone: user.phone,
            birthDate: user.birthDate?.split("T")[0] || "",
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          alert("User not found or error loading user data.");
        });
    }
  }, [id, isEditMode, reset]);

  // Submit logic
  const onSubmit = async (data: UserFormData) => {
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`https://dummyjson.com/users/${id}`, data);
        alert("User updated successfully!");
      } else {
        response = await axios.post("https://dummyjson.com/users/add", data);
        alert("User added successfully!");
      }

      console.log("Response:", response.data);
      navigate("/dashboard/users");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        alert(
          `Submission failed: ${error.response?.data?.message || error.message}`
        );
      } else {
        alert("Unexpected error. Please try again.");
      }
    }
  };

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
      style={{ width: "1280px", height: "100vh" }}
    >
      <div className="text-center mb-4">
        <h1>{isEditMode ? "Edit User" : "Add User"}</h1>
      </div>

      <Container className="w-100" style={{ maxWidth: "900px" }}>
        <Form
          className="border p-4 rounded bg-white shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="mb-4">Two-Column Form</h4>
          <Row>
            <Col md={6}>
              {/* First Name */}
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("firstName", {
                    required: "First name is required!",
                  })}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              {/* Phone */}
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  {...register("phone", { required: "Phone is required!" })}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-danger">{errors.phone.message}</p>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* Last Name */}
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required!",
                  })}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}
              </Form.Group>

              {/* Age */}
              <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  {...register("age", {
                    required: "Age is required!",
                    max: { value: 55, message: "Age must be ≤ 55" },
                  })}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="text-danger">{errors.age.message}</p>
                )}
              </Form.Group>

              {/* Birthdate */}
              <Form.Group className="mb-3" controlId="birthDate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  {...register("birthDate", {
                    required: "Birthdate is required!",
                  })}
                />
                {errors.birthDate && (
                  <p className="text-danger">{errors.birthDate.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
