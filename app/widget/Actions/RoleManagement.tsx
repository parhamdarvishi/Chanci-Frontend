import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { getRequest, postRequest } from "@/shared/api";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { Button, Divider, Select, Skeleton } from "@mantine/core";
import toastAlert from "@/shared/helpers/toast";

type props = {
  userId?: string;
};

interface RoleData {
  id: string;
  name: string;
}

const RoleManagement = ({ userId }: props) => {
  const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
  const [usersRole, setUsersRole] = useState<string[]>([]);
  const [newRole, setNewRole] = useState<{ label: string; value: string }>();
  const [isLoading, setIsLoading] = useState(true);

  // Get available roles by filtering out existing user roles
  const getAvailableRoles = () => {
    return roles.filter((role) => !usersRole.includes(role.label));
  };

  const getUsersRole = async () => {
    const query = {
      userId: userId,
    };
    const res = await getRequest(userAddresses.usersRole, query, true);
    if (res?.isSuccess) {
      setUsersRole(res?.data as string[]);
    }
  };

  const getAllRoles = async () => {
    try {
      const res = await getRequest(userAddresses.getAllRole, null, true);
      if (res?.isSuccess) {
        const data: { value: string; label: string }[] = [];
        (res?.data as RoleData[]).forEach((element) => {
          const item = {
            value: element.id,
            label: element.name,
          };
          data.push(item);
        });
        setRoles(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addNewRole = async () => {
    const reqbody = {
      userId: userId,
      roleId: newRole?.label === "USER" ? 1 : 2,
    };
    const res = await postRequest(userAddresses.addNewRole, reqbody, true);
    if (res?.isSuccess) {
      toastAlert("successful", "success");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUsersRole();
    getAllRoles();
  }, []);

  return (
    <div className={styles.roleManagementContainer}>
      <div className={styles.roleShow}>
        <div className={styles.roleShowBox}>
          {isLoading ? (
            <>
              <Skeleton height={20} width="40%" mb={8} />
              <Skeleton height={20} width="30%" />
            </>
          ) : (
            usersRole?.map((item, index) => <p key={index}>{item}</p>)
          )}
        </div>
        <Divider />
        {isLoading ? (
          <Skeleton height={36} width="100%" />
        ) : (
          <Select
            placeholder="Add new role"
            classNames={{ input: styles.roleShowInput }}
            data={getAvailableRoles()}
            value={newRole ? newRole.value : null}
            onChange={(_value, option) => setNewRole(option)}
          />
        )}
        {!isLoading && newRole?.value && (
          <Button variant="filled" onClick={addNewRole}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
