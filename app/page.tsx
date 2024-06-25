import Contacts from "@/components/ContactList";
import Chatbox from "@/components/chatbox";

async function Home() {

  return (
    <div className="flex flex-row">
      <Contacts></Contacts>
      <Chatbox></Chatbox>
    </div>
  );
}
export default Home;
