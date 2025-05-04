import EventDetails from "@/widget/Events/Slice/EventDetails/eventDetails";

export default async function Event({
    params,
  }: {
    params: Promise<{ id: number }>
  }) {
    const {id} = await params;
    return (
      <div>
        <EventDetails eventId={id}/>
      </div>
    );
  };