import HeadRes from "@/features/headRes/HeadRes";
import { Grid, Drawer, Divider, GridCol, Card } from "@mantine/core";
import Link from "next/link";
import ChanciHeader from "./ChanciHeader";
import Sidebar from "./Sidebar";
import { useDisclosure } from "@mantine/hooks";
import style from "./../../../(chanci)/style.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import useIsMobile from "@/shared/hooks";
const TestSidebar = ({
    children,
    resultPage
}: {
    children: React.ReactNode;
    resultPage?: boolean;
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useIsMobile();
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
                    {isMobile &&
                        <Drawer.Header style={{ marginBottom: ".6rem" }}>
                            <Drawer.Title style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Link href="/Home">
                                    <Image src={Title} alt="header" width={115} height={80} />
                                </Link>
                            </Drawer.Title>
                            <Drawer.CloseButton size={42} color="#585858" />
                        </Drawer.Header>}
                    <Drawer.Body>
                        <Divider />
                        <Sidebar drawer={Boolean(isMobile)} />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
            <GridCol span={{ base: 12, md: 3 }} className={style.sidebar}>

                <Sidebar drawer={false} />
            </GridCol>
            <GridCol span={{ base: 12, md: 9 }}>
                <div>
                    <HeadRes menuClick={open} />
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