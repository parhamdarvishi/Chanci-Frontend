import HeadRes from "@/features/headRes/HeadRes";
import { Grid, Drawer, Divider, GridCol, Card } from "@mantine/core";
import Link from "next/link";
import ChanciHeader from "./ChanciHeader";
import Sidebar from "./Sidebar";
import { useDisclosure } from "@mantine/hooks";
import style from "./../../../(chanci)/style.module.scss";
import Title from "@public/image/widget/Frame.svg";
import HomeIcon from "@public/image/chanciAI/icon/home.svg";
import Image from "next/image";
const TestSidebar = ({
    children,
    resultPage
}: {
    children: React.ReactNode;
    resultPage?: boolean;
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <Grid
            gutter={{ md: 15 }}
            style={{
                padding: "1rem",
                backgroundColor: "#F7F7F7",
                height: "100vh",
            }}
        >
            <Drawer.Root
                opened={opened}
                onClose={close}
                radius={8}
                size={"310px"}
            >
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Body>
                        <Divider />
                        <Sidebar drawer={false} />
                        {/* {links.map((item, index) => (
                  <Box
                    style={{ position: "relative" }}
                    key={index}
                    onClick={() => handleActiveNav(index)}
                  >
                    {loc === index && <div className={style.liActive}></div>}

                    <Link
                      href={index === 4 ? "/ComingSoon" : `/${item}`}
                      className={
                        loc === index ? style.liSidebarActive : style.liSidebar
                      }
                    >
                      <p>{item}</p>
                    </Link>
                    <Divider />
                  </Box>
                ))} */}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
            <GridCol span={{ base: 12, md: 3 }} className={style.sidebar}>
                
                <Sidebar drawer={false} />
            </GridCol>
            <GridCol span={{ base: 12, md: 9 }}>
                <div onClick={open}>
                    <HeadRes />
                </div>

                <ChanciHeader />
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    className="chanciSection"
                    style={{ overflowY: "auto" }}
                >
                    {children}
                </Card>
            </GridCol>
        </Grid>
    )
};
export default TestSidebar;