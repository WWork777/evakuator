import Hero from "./components/mainPage/Hero/Hero";
import Services from "./components/mainPage/Services/Services";
import Price from "./components/mainPage/Price/Price";
import Form from "./components/mainPage/Form/Form";
import Gallery from "./components/mainPage/Gallery/Gallery";
import Contacts from "./components/mainPage/Contacts/Contacts";


export default function Home() {
  return (
    <>
      <Hero/>
      <Services/>
      <Price/>
      <Form/>
      <Gallery/>
      <Contacts/>
    </>
    
  );
}
