import React, { useEffect, useState } from "react";
import styles from "./ProfileModel.module.css";
import Input from "../input";
import { labelAlignValues } from "../../common";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getUser, setUser } from "../../redux/appSlice";
import UserService from "../../services/UserServices";
import toast from "react-hot-toast";

interface ProfileModeProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileModel({ isOpen, onClose }: ProfileModeProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const [isEdit, setIsEdit] = useState(false);

  const handleChangeValue = (property: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [property]: value }));

    // Clear errors as user types
    setErrors((prev) => ({ ...prev, [property]: "" }));
  };

  const handleClickEditBtn = async () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      // Update user details
      const result = await UserService.updateUser({
        userID: user.id,
        ...registerData,
      });
      if (result.user) {
        dispatch(setUser({ user: result.user }));
        toast.success("User Details Updated");
      } else {
        toast.error("Some error occurred!");
      }
      setIsEdit(false);
    }
  };

  useEffect(() => {
    const { id, email, first_name, last_name } = user;
    setRegisterData({ email, firstName: first_name, lastName: last_name });
  }, [user]);

  return (
    <div
      className={`${isOpen ? styles.open : styles.closed} ${
        styles.mainContainer
      }`}
    >
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.whiteBoard} />
      <div
        className={`${styles.absoluteElement} ${styles.floatingInput}`}
        style={{
          bottom: "350px",
          left: "35%",
        }}
      >
        <Input
          label="First Name"
          labelAlign={labelAlignValues.LEFT}
          value={registerData.firstName}
          disabled={!isEdit}
          onChange={(value) => handleChangeValue("firstName", value)}
          expandWidth={true}
        />
        {errors["firstName"] && (
          <p className={styles.errorText}>{errors["firstName"]}</p>
        )}
      </div>
      <div
        className={`${styles.absoluteElement} ${styles.floatingInput}`}
        style={{
          bottom: "250px",
          left: "55%",
          animationDelay: "2s",
        }}
      >
        <Input
          label="Last Name"
          labelAlign={labelAlignValues.RIGHT}
          value={registerData.lastName}
          disabled={!isEdit}
          onChange={(value) => handleChangeValue("lastName", value)}
          expandWidth={true}
        />
        {errors["lastName"] && (
          <p className={styles.errorText}>{errors["lastName"]}</p>
        )}
      </div>
      <div
        className={`${styles.absoluteElement} ${styles.floatingInput}`}
        style={{
          bottom: "150px",
          left: "35%",
          animationDelay: "1s",
        }}
      >
        <Input
          label="Email"
          labelAlign={labelAlignValues.CENTER}
          value={registerData.email}
          disabled={!isEdit}
          onChange={(value) => handleChangeValue("email", value)}
          expandWidth={true}
        />
        {errors["email"] && (
          <p className={styles.errorText}>{errors["email"]}</p>
        )}
      </div>
      <div className={`${styles.editBtnContainer} ${styles.absoluteElement}`}>
        <button onClick={handleClickEditBtn} className={styles.editBtn}>
          {isEdit ? "Update" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default ProfileModel;
