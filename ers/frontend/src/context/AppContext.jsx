import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
const AppContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL_EMPLOYEE = `${BACKEND_URL}/api/employee`;
const BACKEND_URL_REVIEW = `${BACKEND_URL}/api/review`;

export const useValue = () => {
  return useContext(AppContext);
};

export function ContextProvider({ children }) {
  const [allReviews, setAllReviews] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // const navigate = useNavigate();

  // --------- authenticate user --------

  async function registrationUser(userData) {
    try {
      const response = await fetch(`${BACKEND_URL_EMPLOYEE}/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        toast.success("Registration is successful! please login now!!");
        setIsSignUp(false);
        setUserRole(user.userRole);
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.log("error while registering user", error);
      toast.error("An error occurred during registration.");
    }
  }

  async function loginUser(userData) {
    try {
      const response = await fetch(`${BACKEND_URL_EMPLOYEE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("Login successful!");
        setIsAuthenticated(true);
        const findUserRole = data.find(
          (emp) => emp.email == userData.email
        ).role;

        setUserRole(findUserRole);
      }
    } catch (error) {
      console.log("error while registering user", error);
      toast.error("An error occurred during registration.");
      return null;
    }
  }

  async function logOut() {
    try {
      const response = await fetch(`${BACKEND_URL_EMPLOYEE}/logout`, {
        method: "POST",
      });

      if (response.ok) {
        Navigate("/");
      }
    } catch (error) {
      console.log("error while log out ", error);
      toast.error("An error occurred during log out.");
    }
  }

  // ---fetching all employees ----
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch(BACKEND_URL_EMPLOYEE);
        if (response.ok) {
          const employees = await response.json();
          setData(employees);
        }
      } catch (error) {
        console.log("error while fetching data", error);
      }
    }
    fetchEmployees();
  }, []);

  // --- add employee ---
  async function addEmployee(userData) {
    try {
      const response = await fetch(`${BACKEND_URL_EMPLOYEE}/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setData((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  }

  // ---update employee ----

  async function updateEmployee(userData) {
    try {
      const res = await fetch(BACKEND_URL_EMPLOYEE, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const updatedData = await res.json();

        const updatedEmployees = data.map((employee) =>
          employee._id == userData._id ? userData : employee
        );

        setData(updatedEmployees);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  }

  // ---- delete employee -----

  async function deleteEmployee(empId) {
    try {
      const result = await fetch(BACKEND_URL_EMPLOYEE, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empId: empId }),
      });

      if (result.ok) {
        const filtered = data.filter((emp) => emp._id !== empId);
        setData(filtered);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }
  // ------ admin add update view reviews ------

  // ---- add review -----
  async function createReview(reviewData) {
    console.log("reviewData before try", reviewData);
    try {
      const response = await fetch(BACKEND_URL_REVIEW, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      console.log("reviewData", reviewData);

      if (response.ok) {
        const structuredReview = {
          reviewFor: reviewData.reviewFor,
          reviewBy: [
            { employee: reviewData.reviewBy, feedback: reviewData.feedback },
          ],
        };
        setAllReviews((prev) => [...prev, structuredReview]);
        toast.success("review added!");
      }
      console.log(allReviews);
    } catch (error) {
      console.log("error while creating review", error);
    }
  }

  // ---- update review ------

  async function updateReview(reviewData) {
    try {
      const response = await fetch(BACKEND_URL_REVIEW, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setAllReviews((prev) => {
          return prev.map((review) =>
            review._id == reviewData.reviewId
              ? {
                  ...review,
                  reviewBy: [
                    {
                      employee: reviewData.reviewBy,
                      feedback: reviewData.feedback,
                    },
                  ],
                }
              : review
          );
        });

        toast.success("review updated!");
      }
    } catch (error) {
      console.log("error while creating review", error);
    }
  }

  // ---- assign review -------
  async function assignReview(reviewData) {
    try {
      const response = await fetch(BACKEND_URL_REVIEW, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
      }
    } catch (error) {
      console.log("error while assigned reviews", error.message);
    }
  }

  // getting all reviews

  useEffect(() => {
    async function getAssignedReviews() {
      try {
        const response = await fetch(BACKEND_URL_REVIEW);
        if (response.ok) {
          const reviews = await response.json();
          setAllReviews(reviews);
        }
      } catch (error) {
        console.log("error while assigned reviews", error.message);
      }
    }

    getAssignedReviews();
  }, []);

  // feedback submit

  return (
    <AppContext.Provider
      value={{
        useValue,
        data,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        assignReview,
        allReviews,
        createReview,
        updateReview,
        registrationUser,
        isSignUp,
        loginUser,
        setIsSignUp,
        logOut,
        isAuthenticated,
        userRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
