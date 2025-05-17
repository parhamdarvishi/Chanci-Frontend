import HeadRes from "@/features/headRes/HeadRes";
import { Grid, Drawer, Divider, GridCol, Card } from "@mantine/core";
import Link from "next/link";
import ChanciHeader from "./ChanciHeader";
import { useDisclosure } from "@mantine/hooks";
import style from "./../../../(chanci)/style.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import useIsMobile from "@/shared/hooks";
import PanelCard from "./PanelCard";
const ChanciContainer = ({
    children,
    SideBar,
    resultPage
}: {
    children: React.ReactNode;
    SideBar: React.ReactNode;
    resultPage?: boolean;
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useIsMobile();
    return (
        <Grid
            gutter={{ md: 15 }}
            style={{
                padding: "1rem",
                backgroundColor: "#F8F8F8",
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
                        <><Drawer.Header style={{ marginBottom: ".6rem" }}>
                            <Drawer.Title style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Link href="/Home">
                                    <Image src={Title} alt="header" width={115} height={80} />
                                </Link>
                            </Drawer.Title>
                            <Drawer.CloseButton size={42} color="#585858" />
                        </Drawer.Header>
                        <PanelCard style={{height: '42px', justifyContent: 'start', gap: '2rem', marginBottom: "1rem"}} /></>}
                    <Drawer.Body>
                        <Divider />
                        {SideBar}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
            <GridCol span={{ base: 12, md: 3 }} className={style.sidebar}>
                {SideBar}
            </GridCol>
            <GridCol span={{ base: 12, md: 9 }}>
                {/* Header of the page including Hamburger menu visible in mobile view */}
                <HeadRes menuClick={open} />
                {/* Header of the page desktop view */}
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
export default ChanciContainer;