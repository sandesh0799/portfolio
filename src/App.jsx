import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Gallary from "./components/Gallary";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Home />
        <About />
        <Gallary />
        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
