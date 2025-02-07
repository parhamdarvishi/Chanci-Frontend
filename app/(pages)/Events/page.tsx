import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import EventList from "@/widget/Events/EventList";

const Events = () => {
  return (
    <div>
      <Header />
      <NavbarMain />
      <EventList />
      <Footer />
    </div>
  );
};

export default Events;
