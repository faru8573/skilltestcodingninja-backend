import React, { useState } from "react";
import AuthForm from "../../components/forms/AuthForm";
import styles from "./home.module.css";

function Home() {
  const [showAuthForm, setShowAuthForm] = useState(true);
  return (
    <div className={styles.container}>
      {showAuthForm && (
        <div className={styles.box}>
          <AuthForm />
        </div>
      )}
    </div>
  );
}

export default Home;
