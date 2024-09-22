import ContactsList from "./components/ContactsList/ContactsList";
import ContactsProvider from "./contexts/ContactsContext";

function App() {
	return (
		<ContactsProvider>
			<ContactsList />
		</ContactsProvider>
	);
}

export default App;
