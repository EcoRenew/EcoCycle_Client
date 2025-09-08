import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeroSectionComponent from "./components/HeroSectionComponent";
import HowItWorksComponent from "./components/HowItWorksComponent";
import NavbarComponent from "./components/NavbarComponent";
import CategoriesComponent from "./components/CategoriesComponent";
function App() {
  return (
    <>
      <NavbarComponent />
      <HeroSectionComponent />
      <HowItWorksComponent />
      <CategoriesComponent />
      <FooterComponent />
    </>
  );
}

export default App;
