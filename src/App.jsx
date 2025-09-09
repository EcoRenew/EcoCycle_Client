import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeroSectionComponent from "./components/HeroSectionComponent";
import HowItWorksComponent from "./components/HowItWorksComponent";
import NavbarComponent from "./components/NavbarComponent";
import CategoriesComponent from "./components/CategoriesComponent";
import CollabSectionComponent from "./components/CollabSectionComponent";
function App() {
  return (
    <>
      <NavbarComponent />
      <HeroSectionComponent />
      <HowItWorksComponent />
      <CategoriesComponent />
      <CollabSectionComponent />
      <FooterComponent />
    </>
  );
}

export default App;
