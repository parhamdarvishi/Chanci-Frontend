import { getUserData } from "@/shared/helpers/util";
import { TUserLocal } from "@/shared/types/users/user";
import { Card } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./style/chanciHeader.module.scss";

const PanelCard = ({...props}) => {
  const router = useRouter();
  const [user, setUser] = useState<TUserLocal | undefined>(undefined);

  const redirectToPanel = () => {
    router.push('/panel/profile')
  }
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);
  return (
    <div
      onClick={redirectToPanel}
      style={{ cursor: "pointer" }}
      className={style.UserBadge}
      {...props}
    >
      <div className={style.UserBadgeL}>
        <span>{user?.userName}</span>
        <span style={{ fontWeight: 0, fontSize: 12 }}>panel</span>
      </div>
      <IconLogout width={21} height={21} />
    </div>
  )
}
export default PanelCard;