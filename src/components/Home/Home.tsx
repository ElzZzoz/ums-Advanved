import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./Home.module.css";
import {
  FaUserFriends,
  FaUsersCog,
  FaPlusCircle,
  FaChartBar,
} from "react-icons/fa";

export default function Home() {
  let { userData }: any = useContext(AuthContext);
  return (
    <>
      <div className={`${styles.wrapper}`} style={{ width: "83vw" }}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome, {userData.firstName} 👋</h1>
          <p className={styles.subtitle}>
            Here's a quick overview of your dashboard
          </p>
          <div className={styles.grid}>
            <div className={styles.statBox}>
              <FaUserFriends className={styles.icon} />
              <p>Users</p>
              <h2>128</h2>
            </div>
            <div className={styles.statBox}>
              <FaUsersCog className={styles.icon} />
              <p>Admins</p>
              <h2>8</h2>
            </div>
            <div className={styles.statBox}>
              <FaPlusCircle className={styles.icon} />
              <p>New Signups</p>
              <h2>23</h2>
            </div>
            <div className={styles.statBox}>
              <FaChartBar className={styles.icon} />
              <p>Reports</p>
              <h2>14</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
