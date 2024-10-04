import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios"; 

interface CustomerDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
  }) => void;
  formData: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
  };
  setFormData: Dispatch<SetStateAction<{
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
  }>>;
}

const CustomerDetailsDialog: React.FC<CustomerDetailsDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailContent = `
      <h1>New Customer Details</h1>
      <p>Name: ${formData.firstName} ${formData.lastName}</p>
      <p>Contact: ${formData.contactNumber}</p>
      <p>Email: ${formData.email}</p>
    `;

    try {
      // Sending Email through API route
      const emailResponse = await axios.post('/api/send-email', {
        to: 'himanshudhoot0508@gmail.com',
        subject: "New Customer Details",
        html: emailContent,
      });

      if (emailResponse.status === 200) {
        setResponseMessage("Email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setResponseMessage("An error occurred while sending the email.");
    }

    onSubmit(formData);
  };

  return (
    <div className="dialog">
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleChange(e, "firstName")}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleChange(e, "lastName")}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          value={formData.contactNumber}
          onChange={(e) => handleChange(e, "contactNumber")}
          placeholder="Contact Number"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          placeholder="Email"
          required
        />

        <div className="button-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      <style jsx>{`
        .dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          z-index: 1000;
          width: 80%; /* Default width */
          max-width: 600px; /* Maximum width for larger screens */
        }

        @media (min-width: 768px) {
          .dialog {
            width: 60%; /* Increase width on larger screens */
            max-width: 700px; /* Set a larger max width */
          }
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input {
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
        }

        button {
          padding: 10px;
          background-color: blue;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 48%;
        }

        button[type="button"] {
          background-color: red;
        }
      `}</style>
    </div>
  );
};

export default CustomerDetailsDialog;
